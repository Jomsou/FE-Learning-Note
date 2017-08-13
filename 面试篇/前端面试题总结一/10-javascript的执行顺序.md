## javascript的执行顺序

JavaScript是一种描述型脚本语言，它不同于java或C#等编译性语言,它不需要进行编译成中间语言,而是由`浏览器进行动态地解析与执行`
那么JavaScript是怎么来进行解析的吗？它的执行顺序又是如何的呢？在了解这些之前，我们先来认识几个重要的术语：
 
### 1、代码块
`JavaScript中的代码块是指由<script>标签分割的代码段`。例如：
 
```
<script type="text/javascript">
      alert("这是代码块一");
</script>
<script type="text/javascript">
      alert("这是代码块二");
</script>
```
 
 
JS是按照代码块来进行编译和执行的，`代码块间相互独立，但变量和方法共享。`什么意思呢? 举个例子，你就明白了：
 
```
<script type="text/javascript">
      alert(str);//因为没有定义str，所以浏览器会出错，下面的不能运行
      alert("我是代码块一");//没有运行到这里
      var test = "我是代码块一变量";
</script>
<script type="text/javascript">
      alert("我是代码块二"); //这里有运行到
      alert(test); //弹出"我是代码块一变量"
</script>
```
上面的代码中代码块一中运行报错，但不影响代码块二的执行，这就是代码块间的独立性，
而代码块二中能调用到代码一中的变量，则是块间共享性。
 
### 2、声明式函数与赋值式函数

JS中的函数定义分为两种：`声明式函数`与`赋值式函数`。
 
```
<script type="text/javascript">
     function Fn(){ //声明式函数
 
     }
 
     var Fn = function{  //赋值式函数
 
     }
</script>
```

声明式函数与赋值式函数的区别在于：在JS的`预编译`期，声明式函数将会先被提取出来，然后才按顺序执行js代码。
 
### 3、预编译期与执行期
 
事实上，JS的解析过程分为两个阶段：`预编译期(预处理)`与`执行期`。
```
预编译期JS会对本代码块中的所有声明的变量和函数进行处理（类似与C语言的编译），
但需要注意的是此时处理函数的只是声明式函数，而且变量也只是进行了声明但未进行初始化以及赋值。
```
 
```
<script type="text/javascript">
     Fn();  //执行结果："执行了函数2",同名函数后者会覆盖前者
     function Fn(){ //函数1
        alert("执行了函数1");
     }
 
     function Fn(){  //函数2
        alert("执行了函数2");
     }
</script>  
<script type="text/javascript">
      Fn();  //执行结果："执行了声明式函数",在预编译期声明函数及被处理了，所以即使Fn()调用函数放在声明函数前也能执行。
      function Fn(){ //声明式函数
         alert("执行了声明式函数");
      }
 
      var Fn = function(){  //赋值式函数
         alert("执行了赋值式函数");
      }
</script>
 
//代码块一
<script type="text/javascript">
      alert(str);//浏览器报错,但并没有弹出信息窗
</script>
//代码块二
<script type="text/javascript">
      alert(str); //弹窗"undefined"
      var str = "aaa";
</script>
//js在预处理期对变量进行了声明处理,但是并没有进行初始化与赋值，所以导致代码块二中的变量是unfiened的，
而代码一中的变量是完全不存在的，所以浏览器报错。
```
 
理解了上面的几个术语，相信大家对JS的运行机制已经有了个大概的印象了，现在我们来看个例子：
 
```
<script type="text/javascript">
      Fn();  //浏览器报错:"undefined"
</script>

<script type="text/javascript">
      function Fn(){ //函数1
          alert("执行了函数1");
      }
</script>
```
为什么运行上面的代码浏览器会报错呢？声明函数不是会在预处理期就会被处理了吗，怎么还会找不到Fn()函数呢？
其实这是一个理解误点，我们上面说了JS引擎是按照代码块来顺序执行的，
其实`完整的说应该是按照代码块来进行预处理和执行的`，也就是说
`预处理的只是执行到的代码块的声明函数和变量，而对于还未加载的代码块，是没法进行预处理的`，这也是边编译边处理的核心所在。
 
### 总结整理下：
代码如下:
```
　　step 1.  读入第一个代码块。
　　step 2.  做语法分析，有错则报语法错误（比如括号不匹配等），并跳转到step5。
　　step 3.  对var变量和function定义做“预编译处理”（永远不会报错的，因为只解析正确的声明）。
　　step 4.  执行代码段，有错则报错（比如变量未定义）。
　　step 5.  如果还有下一个代码段，则读入下一个代码段，重复step2。
　　step6. 结束。
```
 
而根据HTML文档流的执行顺序，需要在页面元素渲染前执行的js代码应该放在<body>前面的<script>代码块中，
而需要在页面元素加载完后的js放在</body>元素后面，body标签的onload事件是在最后执行的。
```
<script type="text/javascript">
    alert("first");
    function Fn(){
     alert("third");
    }
</script>
<body onload="Fn()">
 
</body>
<script type="text/javascript">
    alert("second");
</script>
```