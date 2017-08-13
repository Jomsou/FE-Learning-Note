## 深入理解javascript函数

```
函数是javascript中最重要的内容，也是其相对其他语言来说在设计上比较有意思的地方。
javascript许多高级特性也或多或少和函数相关。
```

## 函数是对象
理解函数是对象，是准确理解函数的第一步。下面的代码就创建了一个函数对象。
```
var sum = new Function("num1", "num2", "return num1 + num2;");
```
每个函数都是Function类型的实例。Function构造函数可以接受多个参数，最后一个参数是函数体，其他参数均为函数的形参。
由于其书写的不优雅和两次解析导致的性能问题，这种方式不经常被采用，但是这种写法对于理解函数就是对象是非常有帮助的。
一般地，我们都用字面的方式来创建函数。
```
var sum = function(num1, num2){
    return num1 + num2;
}
//或者
function sum(num1, num2){
    return num1 + num2;
}
```
以上两种定义函数的方法分别叫做函数表达式和函数声明，两者的效果是等价的，
`区别在于解析器向执行环境加载数据时对两者的处理不一样`。
`解析器会率先读取函数声明来创建函数对象，保证其在任何代码执行之前可用；
对于函数表达式，则必须等到解析器执行到对应的代码行，函数对象才被创建。`

在javascript中，函数对象和其他对象一样，均被视为一等公民。
所以函数可以被引用、可以作为参数被传递或作为返回值返回，这使得函数的使用非常的灵活。

## 函数的执行
函数对象代表了一个过程，和大多数语言一样通过函数调用表达式可以调用这个过程。
但是javascript的函数对象还提供了另外两种调用方式，call和apply方法。
call和apply方法的第一个参数用于指定执行环境中this的绑定，后面的参数用于指定函数的实际参数。
call和apply的唯一区别是实参的形式不一样，call是用逗号分割，apply则是以数组传递。例如：
```
//函数调用表达式
sum(1, 2);
//call方法
sum.call(this, 1, 2);
//apply方法
sum.apply(this, [1, 2]);
```
不管用哪种调用方式，最终都是通过函数对象的`[[Call]]`方法实际调用这个过程。
`[[Call]]`方法是javascript引擎内部使用的一个方法，程序不能直接访问它。
`[[Call]]`方法接受两个参数，第一个参数指定this的绑定值，第二个参数指定函数的参数列表。
为了表达方便，后面我们将`[[Call]]`方法的第一个参数称作thisArg。
函数对象的call方法和apply方法可以显示指定thisArg，函数表达式则是隐式指定这个参数的。例如：
```
var foo = function(){
    console.log(this);
};
var obj = {name:'object'};
foo();
obj.foo = foo;
obj.foo();
```
代码在浏览器的执行结果如下：
```
Window {top: Window, window: Window, location: Location...}
Object {name: "object", foo: function}
```

从执行结果可以看出，`obj.foo()这种调用方法，隐式将调用它的对象obj作为了thisArg`。
但是为什么foo()这种调用方式this的绑定值是window这个全局对象?
难道foo()这种调用方式将全局对象默认指定为thisArg？其实不是这样的。
`thisArg并不是和this关键字的绑定一一对应的，其中有一个转换过程。`如下：
```
1.如果thisArg为undefined或者null，则this的绑定为全局对象。
2.如果thisArg不是Object类型，则将thisArg强制转型为Object类型并绑定到this。
3.否则this的绑定就为thisArg。
```
其实foo()这种调用方式thisArg的值为undefined，通过以上的转换过程将this绑定为全局对象。

## 执行环境与闭包
前面提到过执行环境(Execution Context)这个概念，简单来说`执行环境就是函数在执行时所依赖的一个数据环境`，
它决定了函数的行为。程序执行流每次进入函数代码时都会创建一个新的执行环境。
活动的执行环境在逻辑上形成了一个栈的结构。当函数执行完毕，其执行环境从栈中弹出并销毁。

每个执行环境都包含一个重要的组件：`词法环境(Lexical Environment)`。
词法环境定义了javascript程序标识符到变量或函数的关联关系。
`词法环境包含了环境记录(Environment Record)和一个到外层词法环境的引用(如果有的话，否则为null)。`
环境记录记录了当前作用域下的变量或函数的绑定情况。
有两种类型的环境记录，声明式环境记录(Declarative Environment Records)和对象环境记录(Object Environment Records)。
`声明式环境`记录包含了当前作用域下标识符到`变量声明`和`函数声明`的绑定。
`对象环境`记录是一个和特定对象绑定的环境记录，用于临时改变标识符的解析情况，比如在with子句中。

函数对象都有一个`[[Scope]]`属性，`函数对象在创建时`会将当前执行环境的词法环境的值赋予给`[[Scope]]`属性。
这个属性是引擎的内部属性，程序无法访问到它。
`当程序流进入到函数时，javascript引擎会创建新的执行环境，同时也创建对应的词法环境。`
引擎会将当前作用域声明的变量和函数绑定到词法环境，同时将`[[Scope]]`属性的引用也添加到词法环境。
程序在进行标识符解析的时候，会优先从当前的词法环境中搜索，搜索失败则向外层词法环境搜索，
如果到最外层的全局环境还没搜索到则会抛出异常。

嵌套定义的函数会形成javascript中一个有趣的特性：闭包。
闭包的形成是由于内层函数引用了外层函数在创建它时的词法环境。
即使外层函数已经返回，执行环境已经销毁，但是内层函数依然能够通过词法环境的引用访问外层函数中定义的变量或函数。

## with和catch子句
with子句和catch子句都能临时改变当前的词法环境。他们的方式是有些区别的。先看with子句。
```
function foo(){
    var background = '#ccc';
    with(document){
        body.style.background = background;
    }
}
```
当执行流进入foo时，这时会创建一个声明式词法环境。执行流进入with子句的时候，引擎会创建一个对象环境记录。
此时with子句中的标识符解析都会先从document这个对象中查找。当with子句执行完之后，对象环境记录销毁。

```
try{
//do something
}catch(e){
//handel error
}
```
catch子句也能临时改变当前的词法环境。
和with子句不一样的是，它会创建一个声明式词法环境，将catch子句中的参数绑定到这个词法环境。

## 构造器与原型继承
函数对象还有个非常重要的内部方法`[[Construct]]`，当我们将new操作符应用到函数对象时就调用了`[[Construct]]`方法。
此时的函数充当构造器的角色。下面的代码就通过`[[Construct]]`创建了一个对象。
```
var Dog = function(){
}
var dog = new Dog();
```

```
[[Construct]]方法的执行过程如下。
1.创建一个空对象obj。
2.设置obj的内部属性[[Class]]为Object。
3.设置obj的内部属性[[Extensible]]为true。
4.设置obj的[[Prototype]]属性：如果函数对象prototype的值为对象则直接赋给obj，否则赋予Object的prototype值。
5.调用函数对象的[[Call]]方法并将结果赋给result。
6.如果result为对象则返回result,否则返回obj。
```

每个javascript对象都有一个`[[Prototype]]`的内部属性，`[[Prototype]]`的值为一个对象，叫做原型对象。
当程序在访问javascript对象的某个属性时，首先会在当前对象中搜索，搜索失败则到原型链中搜索，
直到搜索到相应值，否则就为undefined。javascript的这种特性叫做原型继承。
`[[Construct]]`方法的第四步是实现原型继承的关键，它指定了javascript对象的`[[Prototype]]`属性。

```
var Dog = function(){
}
var animal ＝ {};
Dog.prototype = animal;
var dog = new Dog();
```
上面代码创建出来的dog对象的原型就为animal，它“继承”了animal对象的属性。
原型继承是另外一种面向对象的模型，相对于“类”的继承模型来说，原型继承更加符合我们的现实世界的模型。
原型继承在javascript也是有非常广的用途。