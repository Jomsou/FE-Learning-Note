# JavaScript基础
### 什么是JavaScript？
>JavaScript是一种基于对象和事件驱动的客户端脚本语言，最初的设计是为了检验HTML表单输入的正确性。

### JavaScript的发展历史
#### JavaScript

>要了解JavaScript，我们首先要回顾一下JavaScript的诞生。
在上个世纪的1995年，当时的网景公司正凭借其Navigator浏览器成为Web时代开启时最著名的第一代互联网公司。
由于网景公司希望能在静态HTML页面上添加一些动态效果，于是叫Brendan Eich这哥们在两周之内设计出了JavaScript语言。你没看错，这哥们只用了10天时间。
为什么起名叫JavaScript？原因是当时Java语言非常红火，所以网景公司希望借Java的名气来推广，但事实上JavaScript除了语法上有点像Java，其他部分基本上没啥关系。

#### ECMAScript

>因为网景开发了JavaScript，一年后微软又模仿JavaScript开发了JScript，为了让JavaScript成为全球标准，几个公司联合ECMA（European Computer Manufacturers Association）组织定制了JavaScript语言的标准，被称为ECMAScript标准。
所以简单说来就是，ECMAScript是一种语言标准，而JavaScript是网景公司对ECMAScript标准的一种实现。
那为什么不直接把JavaScript定为标准呢？因为JavaScript是网景的注册商标。
不过大多数时候，我们还是用JavaScript这个词。如果你遇到ECMAScript这个词，简单把它替换为JavaScript就行了。

#### JavaScript版本

>JavaScript语言是在10天时间内设计出来的，虽然语言的设计者水平非常NB，但谁也架不住“时间紧，任务重”，所以，JavaScript有很多设计缺陷，我们后面会慢慢讲到。
此外，由于JavaScript的标准——ECMAScript在不断发展，最新版ECMAScript 6标准（简称ES6）已经在2015年6月正式发布了，所以，讲到JavaScript的版本，实际上就是说它实现了ECMAScript标准的哪个版本。
由于浏览器在发布时就确定了JavaScript的版本，加上很多用户还在使用IE6这种古老的浏览器，这就导致你在写JavaScript的时候，要照顾一下老用户，不能一上来就用最新的ES6标准写，否则，老用户的浏览器是无法运行新版本的JavaScript代码的。

### JavaScript的组成

完整的JavaScript是由ECMAScript（语法）、Browser Objects（DOM、BOM）（特性）组成的。

![](../images/01.png)

### 在HTML中使用JavaScript
可以在head或body中使用`<script>`嵌入javaScript脚本

```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
    <script src=""></script>
</head>
<body>
	<script>
      
    </script>
</body>
</html>
```


### JavaScript语法
- JavaScript的注释与分号

```
// 单行注释
/**/ 多行注释
语句结束使用分号，如果省略，则由解析器确定语句的结尾。
```
- ECMAScript中的一切（变量、函数名和操作符）都**区分大小写**。
- JavaScript的标识符
```
1、什么是标识符？
变量、函数、属性的名字，或者函数的参数。
2、标识符的命名规则：
（1）、由字母、数字、下划线（_）或美元符号（$）组
成
（2）、不能以数字开头
（3）、不能使用关键字、保留字等作为标识符。
```

- 什么是变量

>ECMAScript的变量是松散类型
松散类型：可以用来保存任何类型的数据
换句话说，每个变量仅仅是一个用于保存值的占位符而已。

```
变量的声明与赋值
1、变量声明：
变量的声明要使用var操作符，
语法：var 变量名
2、变量赋值：
声明的同时赋值：var 变量名=值
先声明后赋值： 变量名=值
说明：
1、省略var声明的变量是全局变量
2、不推荐省略var操作符来定义全局变量
一次声明多个变量，用逗号隔开，如：
var id,sex,age,name=“marry”;
```
### JavaScript数据类型

>ECMAScript中有5种简单数据类型（也称为基本数据类
型）：Undefined、Null、Boolean、Number和
String。
还有1种复杂数据类型：Object。

- typeof
```
语法：typeof 变量 或 typeof(变量)
功能：检测变量类型
返回值：string类型，有可能是：string、number、boolean、object、undefined、function
```
- undefined
```
undefined类型只有一个值，即特殊的undefined。
说明：一般而言，不存在需要显式地把一个变量设置为undefined值的情况。
```
- null
```
1、null值表示一个空对象指针
2、如果定义的变量准备在将来用于保存对象，那么最好将改变
始化为null而不是其他值。
说明：undefined值是派生自null值的，所以undefined==null返回结果是true。
```
- Number
```
Number：表示整数和浮点数
NaN：即非数值（Not a Number）是一个特殊的数值
说明：
1、任何涉及NaN的操作（例如NaN/10）都会返回NaN。
2、NaN与任何值都不相等，包括NaN本身。
```
- isNaN()
```
语法：isNaN(n)
功能：检测n是否是“非数值”
返回值：boolean
参数：参数n可以是任何类型
说明：isNaN()在接收到一个值之后，会尝试将这个值转换为数值。
某些不是数值的值会直接转换为数值。
```
#### 数值转换

>有3个函数可以把非数值转换为数值：Number()、parseInt()和
parseFloat()。其中Number()可以用于任何数据类型，而parse
Int()和parseFloat()则专门用于把字符串转换成数值。

- parseInt()
```
parseInt() ：会忽略字符串前面的空格，直至找到第一个非空格字符。
说明：
1、parseInt()：转换空字符串返回NaN。
2、parseInt()这个函数提供第二个参数：转换时使用的基数
（即多少进制
```
- parseFloat()
```
parseFloat：从第一个字符开始解析每个字符，直至遇见一个无效的浮点数字符为止
说明：
除了第一个小数点有效外，parseFloat()与parseInt()的第二个区别在于它始终都会忽略前导的零。
```
- String

>String类型用于表示由零或多个16位Unicode字符组成
的字符序列，即字符串。字符串可以由双引号（”）或
单引号（’）表示。

toString()与String()
```
语法：str.toString()
功能：将str转换为字符串
返回值：str的一个副本
参数：str是要转换的内容，可以是数值、布尔值、对象和字符串。
说明： 在不知道要转换的值是不是null或undefined的情况下，还可以使用String()函数，它能够将任何类型的值转换为字符串。
```
- Boolean
>用于表示真假的类型，即true表示真，false表示假


```
类型转换
1、除0之外的所有数字，转换为布尔型都为true
2、除””之外的所有字符，转换为布尔型都为true
3、null和undefined转换为布尔型为false
```

### JavaScript操作符
- 算数操作符 + : 加 - ： 减 * ： 乘 / ： 除 %：取余
- 递增和递减
1、递增
++a与a++都是对a进行递增的操作
区别：
++a先返回递增之后的a的值
a++先返回a的原值，再返回递增之后的值
实例：
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>算数操作符</title>
</head>
<body>
	<script>
       var num1=10,
           num2=5,
           num3=num1++-num2,    // ++num1  num1=num1+1
           x1=20,
           x2=30,
           x3=--x1+x2--;

       console.log(num1);  //  11   // 11
       console.log(num3);  // 16    // 5

       console.log(x1);    // 19
       console.log(x2);    // 29
       console.log(x3);    // 19+30=49
	</script>
</body>
</html>
```
2、递减同理
- 比较操作符
	`>`、<、>=、<=、==、===、!=、！==
	
	==：相等，只比较值是否相等
	
	===：相等，比较值的同时比较数据类型是否相等
	
	！=：不相等，比较值是否不相等
	
	！==：不相等，比较值的同时比较数据类型是否不相等
	
	返回值：boolean型

- 三元操作符
语法：条件 ? 执行代码1：执行代码2

说明：
可代替简单的if语句，如果条件成立，执行代码1，否则执行代码2

```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
       // 声明保存用户名的变量
       /*var name_01;  
       name_01="marry";*/
       // 声明保存年龄的变量
       //var age=18;  // 声明的同时赋值
       // 声明保存邮箱的变量
       //var email="marry@sina.com.cn";
       // 一次声明多个变量
       
       var name_01="marry",age=18,email="marry@sohu.com",address,settings=null;

       var distance=12.67980;

       var id="16";

       console.log(typeof(distance))  // 在控制台中打印

       console.log(typeof(age-"abc"));

       console.log(isNaN(email));

       console.log(isNaN(id));

       id=Number(id);

       name_01=Number(name_01);

       console.log(typeof id);

       console.log(name_01);   // NaN

       var topval=parseInt("28px");  

       var c="abc58"

       console.log(topval);

       console.log(parseInt(c));

       console.log(parseInt("0xf",16));

       var d=parseFloat("12.34.56px");

       var e=parseFloat("0.123abc");

       console.log(e);

       var msg='hello world';

       var ids=78965;
      
       var idstr=ids.toString();

       var m;

       var isStudent=true;

       var isChild=false;

       console.log(typeof idstr);

       console.log(String(m));

       console.log(isChild.toString());

       var x=0;

       var strings=" ";

       var y;

       var timer=null;

       console.log(Boolean(timer));

	</script>
</body>
</html>
```


- 逻辑操作符
	- 逻辑与
	&& 与 （只要有一个条件不成立，返回false）
	说明：在有一个操作数不是布尔值的情况，逻辑与操作就不一定返回值，
	此时它遵循下列规则：
	1、如果第一个操作数隐式类型转换后为true，则返回第二个操作数
	2、如果第一个操作数隐式类型转换后为false，则返回第一个操作数
	3、如果有一个操作数是null，则返回null
	4、如果有一个操作数是NaN，则返回NaN
	5、如果有一个操作数是undefined，则返回undefined



```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
       var num1=10,
           num2=20,
           num3=30,
           str="welcome",
           bool=true,
           n=null,
           m;

      /* console.log(num1<num2 && num2<num3);  // true

       console.log(num1<num2 && num2==num3);  // 所有条件都为true才返回true

       console.log(num2<num3 && num3>num1 && false);*/

      /* console.log(str && num3);  // 30 "" false  true  0 false true

       console.log(80 && 55);

       console.log("hello" && 65 && "abc");  // abc

       console.log(0 && 88);

       console.log("" && 0 && 30>20);*/
       console.log(n && num3);  
       console.log(55 && true && 33*"abc");
       console.log(m && true);
	</script>
</body>
</html>
```


- 逻辑或
|| 或 （只要有一个条件成立，返回true）
说明：在有一个操作数不是布尔值的情况，逻辑与操作就不一定返回
值，此时它遵循下列规则：
1、如果第一个操作数隐式类型转换后为true，则返回第一个操作数
2、如果第一个操作数隐式类型转换后为false，则返回第二个操作数
3、如果两个操作数是null，则返回null
4、如果两个操作数是NaN，则返回NaN
5、如果两个操作数是undefined，则返回undefined
- 逻辑非
! 非
说明：
1、无论操作数是什么数据类型，逻辑非都会返回一个布尔值
2、 ! ! 同时使用两个逻辑非操作符时：
第一个逻辑非操作会基于无论什么操作数返回一个布尔值，
第二个逻辑非则对该布尔值求反。


```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
	   var m;
       /*console.log(55>88 || 33<66);
       console.log(55!="55" || 88==="88");

       console.log("hello" || 0);     // hello
       console.log(99 || 0 || "abc"); // 99
       console.log("" || 88 || true); // 88
       console.log("" || 0 || "abc");  // abc
       console.log(0 || "" || null); // null  
       console.log(0 || "" || null || "hello");  // hello
       console.log(m || NaN || 99);  // 99
       console.log("" || m);  // undefined
       console.log(30*"abc" || 55-"def");  // NaN*/

       // 非
       console.log(!false);  // true
       console.log(!88);  // false
       console.log(!0);   // true
       console.log(!"red");  //false
       console.log(!NaN);
       console.log(!null);

       console.log(!!"");  // false
       console.log(!!"blue");  //true
	</script>
</body>
</html>
```
