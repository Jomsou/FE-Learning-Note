## bind 简介

bind() 方法会创建一个新函数，当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数, 
它的参数是 bind() 的其他参数和其原本的参数。

语法是这样样子的：

    fun.bind(thisArg[, arg1[, arg2[, ...]]])
    
thisArg 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 操作符调用绑定函数时，该参数无效。
arg1, arg2, ... （可选）当绑定函数被调用时，这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数。

bind 的第一个参数会作为原函数运行时的 this 指向，不多说；
而第二个开始的参数是可选的，当绑定函数被调用时，这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数。
怎么理解？

    function fn(a, b, c) {
      return a + b + c;
    }
    
    var _fn = fn.bind(null, 10);
    var ans = _fn(20, 30); // 60
    
fn 函数需要三个参数，_fn 函数将 10 作为默认的第一个参数，所以只需要传入两个参数即可，
如果你不小心传入了三个参数，放心，也只会取前两个。

    function fn(a, b, c) {
      return a + b + c;
    }
    
    var _fn = fn.bind(null, 10);
    var ans = _fn(20, 30, 40); // 60
    
这有啥用呢？如果某些函数，前几个参数已经 “内定” 了，我们便可以用 bind 返回一个新的函数。
也就是说，bind() 能使一个函数拥有预设的初始参数。
这些参数（如果有的话）作为 bind() 的第二个参数跟在 this 后面，之后它们会被插入到目标函数的参数列表的开始位置，
传递给绑定函数的参数会跟在它们的后面。

    function list() {
      return Array.prototype.slice.call(arguments);
    }
    
    var list1 = list(1, 2, 3); // [1, 2, 3]
    
    // Create a function with a preset leading argument
    var leadingThirtysevenList = list.bind(undefined, 37);
    
    var list2 = leadingThirtysevenList(); // [37]
    var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]

使用 bind 返回的结果还是个 function，是个 function 就可以被 new 运算符调用，那么结果呢？
规范中说的很清楚了，当使用 new 操作符调用绑定函数时，bind 的第一个参数无效。

    function Person(name, age) {
      this.name = name;
      this.age = age;
    }
    
    var _Person = Person.bind({});
    var p = new _Person('hanzichi', 30); // Person {name: "hanzichi", age: 30}
    
一般我们不会去这么用，但是如果要写个 bind 的 polyfill（http://caniuse.com/#search=bind），
还是需要考虑用 new 调用的情况。

我们也可以设置默认值（参考上一小节），原先提供的那些参数仍然会被前置到构造函数调用的前面。

    function Person(name, age) {
      this.name = name;
      this.age = age;
    }
    
    var _Person = Person.bind(null, 'hanzichi');
    var p = new _Person(30); // Person {name: "hanzichi", age: 30}


## 配合 setTimeout

什么时候容易丢失 this 指向？
恩，setTimeout 是一个场景，很容易把 this 指向 window，当然，setInterval 也是一样。
当使用对象的方法时，需要 this 引用对象，你可能需要显式地把 this 绑定到回调函数以便继续使用对象。

    var canvas = {
      render: function() {
        this.update();
        this.draw();
      },
    
      update: function() {
        // ...
      },
    
      draw: function() {
        // ...
      }
    };
    
    window.setInterval(canvas.render, 1000 / 60);
    
用 canvas 写特效或者做游戏时经常会碰到类似的问题。
上面的代码是有问题的，render 方法中的 this 其实被指向了 window！
我们可以用 bind，显式地把 this 绑定到回调函数以便继续使用该对象。

    window.setInterval(canvas.render.bind(canvas), 1000);
    
类似的情况还有 dom 的事件监听，一不小心可能 this 就被指向了 dom 元素。
可以参考下以前做 bigrender 时写的这部分代码 
https://github.com/hanzichi/hanzichi.github.io/blob/master/2016/bigrender/js/bigrender.js#L179-L184。

## bind 还能做一些有意思的事情。

通常来说，将一个类数组转为数组，我们会用 slice（ie9- 不支持）。参考 #14

    var slice = Array.prototype.slice;
    
    // slice.apply(arguments);
    // slice(arguments, 1);
    
    bind 能让调用变的更加简单。
    
    // same as "slice" in the previous example
    var unboundSlice = Array.prototype.slice;
    var slice = Function.prototype.call.bind(unboundSlice);
    
    // ...
    
    slice(arguments);
    // slice(arguments, 1);
    
再举个类似的例子，比如说我们要添加事件到多个节点，for 循环当然没有任何问题，我们还可以 “剽窃” forEach 方法：

    Array.prototype.forEach.call(document.querySelectorAll('input[type="button"]'), function(el){
      el.addEventListener('click', fn);
    });
    
更进一步，我们可以用 bind 将函数封装的更好：

    var unboundForEach = Array.prototype.forEach
      , forEach = Function.prototype.call.bind(unboundForEach);
    
    forEach(document.querySelectorAll('input[type="button"]'), function (el) {
      el.addEventListener('click', fn);
    });

同样类似的，我们可以将 x.y(z) 变成 y(x,z) 的形式：

    var obj = {
      num: 10,
      getCount: function() {
        return this.num;
      }
    };
    
    var unboundBind = Function.prototype.bind
      , bind = Function.prototype.call.bind(unboundBind);
    
    var getCount = bind(obj.getCount, obj);
    console.log(getCount());  // 10

再举个栗子。每隔一秒在控制台打印 1-5，看起来是道考察闭包的经典题目。

    for(var i = 1; i <= 5; i++) {
      !function(i) {
        setTimeout(function() {
          console.log(i);
        }, i * 1000);
      }(i);
    }

ES6 下能用 let：

    for(let i = 1; i <= 5; i++) {
      setTimeout(function() {
        console.log(i);
      }, i * 1000);
    }
    
也可以用 bind，瞬间逼格提升：

    for(var i = 1; i <= 5; i++) {
      setTimeout(console.log.bind(console, i), i * 1000);
    }