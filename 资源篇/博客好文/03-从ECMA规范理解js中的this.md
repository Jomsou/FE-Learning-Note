## 从ECMA规范理解this

this是面向对象编程中的一个概念，它一般指向当前方法调用所在的对象，
这一点在java、c++这类比较严格的面向对象编程语言里是非常明确的。
但是在javascript中，this的定义要灵活许多，如果未准确掌握，非常容易混淆。
本文总结了this的各种情况，并从Ecma规范的角度探讨了this的具体实现，希望对大家理解this有所帮助。

## this指向的四中情况
在javascript里面，this的指向可以归纳为以下四种情况。只要能牢记这四种情况，大部分情况下就已经够用了。

#### 1.在全局代码或者普通的函数调用中，this指向全局对象，在浏览器里面既为window对象。
```
    console.log(this);//输出window
    function foo(){
        console.log(this);
    }
    foo();//输出window
```
在浏览器环境里运行上述代码，两处输出结果均为window对象。

#### 2.通过call或apply方法调用函数，this指向方法调用的第一个参数。
```
    var obj = {name:'test'};
    
    function foo(){
        console.log(this);
    }
    
    foo.call(obj);//输出obj
    foo.apply(obj);//输出obj
```
在浏览器环境里执行以上代码，输出结果均为对象obj。
call和apply除了参数形式不一样外其他都一样，call采用逗号分割，apply采用数组。
说到这里，顺便介绍一个小技巧。如何在不生成新数组的情况下实现两个数组的连接？请看下面的代码。
```
    var arr1 = [1, 2 , 3],
        arr2 = [4, 5, 6];
    Array.prototype.push.apply(arr1, arr2);
    console.log(arr1);//输出[1, 2, 3, 4, 5, 6]
```
执行上述代码后，输出结果为`[1, 2, 3, 4, 5, 6]`。这是一个非常实用的小技巧，由于apply第二个参数为数组形式，
所以我们可以把push方法“借”过来，从而实现两个数组的连接。

#### 3.调用对象的方法，this指向该对象。
```
    var obj = {name:'test'};
    
    function foo(){
        console.log(this);
    }
    obj.foo = foo;
    
    obj.foo();//输出obj
```
执行以上代码后，控制台输出为obj对象。这就是我们常说的“谁调用，指向谁”。

#### 4.构造方法中的this，指向新构造的对象。
```
    function C(){
        this.name = 'test';
        this.age = 18;
        console.log(this);
    }
    var c = new C();//输出 c
    console.log(c);//输出 c
```
执行以上代码后，控制台输出均为c所指向的对象。当new操作符用于函数时，会创建一个新对象，并用this指向它。

## Ecma规范
Ecma规范里面详细介绍了this的实现细节，通过阅读规范，我们可以更准确的理解上述四种情况到底是怎么回事。
函数对象有一个叫`[[Call]]`内部方法，函数的执行其实是通过`[[Call]]`方法来执行的。
`[[Call]]`方法接收两个参数thisArg和argumentList，thisArg和this的指向有直接关系，argumentList为函数的实参列表。
thisArg又是怎么来的呢？我们可以和前面讨论的四种情况对应起来：
```
    1. 普通方法调用thisArg为undefined。
    2. 通过call或apply调用，thisArg既为第一个参数。
    3. 通过对象调用，thisArg指向该对象。
    4. 在构造方法中，thisArg为新构造的对象。
```
thisArg和this是什么关系？规范里的描述是这样的：
```
If the function code is strict code, set the ThisBinding to thisArg.
Else if thisArg is null or undefined, set the ThisBinding to the global object.
Else if Type(thisArg) is not Object, set the ThisBinding to ToObject(thisArg).
Else set the ThisBinding to thisArg.
```

在严格模式下，thisArg和this是一一对应的。
```
function foo(){
    'use strict';
    console.log(this);
}
foo();//输出undefined
```
该示例输出的结果为undefined。

第二点是说如果thisArg为null或者undefined则this指向全局对象。
```
function foo(){
    console.log(this);
}
foo.call(null);//输出window
```
该示例的输出结果为window。

第三点说如果thisArg为非对象类型，则会强制转型成对象类型。
```
function foo(){
    console.log(this);
}
var aa = 2;
console.log(aa);//输出2
foo.call(aa);//输出 Number
```
这里的输出结果分别为2和Number，它将基本类型转型成了对象包装类型。

第四点说明剩下的情况thisArg和this为一一对应的关系。

规范里面对this指向的描述还是比较明确的。
只要你搞清楚thisArg怎么确定，thisArg和this的对应关系，那么你就能搞定所有this的情况了。

## 确保this的指向
在实际使用this的过程中，遇到得最多得一个问题可能就是上下文丢失的问题了。
因为javascript中的函数是可以作为参数传递的，那么其他对象在执行回调函数时就可能造成回调函数原来的上下文丢失，
也就是this的指向改变了。
```
var C = function(){
    this.name = 'test';
    this.greet = function(){
        console.log('Hello,I am '+this.name+'!');
    };
}
var obj = new C();

obj.greet();//输出 Hello,I am test!

setTimeout(obj.greet, 1000);//输出 Hello,I am !
```
可见第二条输出中this的值改变了，其实我们是希望this能够指向obj的。解决该问题的方法有两种。

#### 1.bind方法。
bind方法通过闭包巧妙地实现了上下文的绑定，它实际上是将原方法包装成了一个新方法。一般的实现如下：
```
Function.prototype.bind = function(){
    var args = arguments,
        thisArg = arguments[0],
        func = this;
    return function(){
        var arg = Array.prototype.slice.call(args, 1);
        Array.prototype.push.apply(args, arguments);
        return func.apply(thisArg, arg);
    }
}
```
前面的示例代码我们只需要加上bind，就能够得到我们希望的结果了。

```
setTimeout(obj.greet.bind(obj), 1000);//输出 Hello,I am test!
```

#### 2.es6箭头函数。
es6里面提供了一个新的语法糖，箭头函数。箭头函数的this不再变幻莫测，它永远指向函数定义时的this值。
```
var C = function(){
    this.name = 'test';
    this.greet = ()=>{
        console.log('Hello,I am '+this.name+'!');
    };
}
var obj = new C();

obj.greet();//输出 Hello,I am test!

setTimeout(obj.greet, 1000);//输出 Hello,I am test!
```
我们将前面的示例该成箭头函数后，两处的输出结果一样了。this的值不再改变了，这是我们想要的。

## 小结
this看起来是个非常小的知识点，其实挖起来还是有很多细节的，特别是规范里面的一些定义，对于一个js程序员来说是非常重要的。