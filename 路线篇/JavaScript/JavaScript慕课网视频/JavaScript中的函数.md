# JavaScript中的函数

## 函数的作用
通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。
## 函数的定义
函数使用function声明，后跟一组参数一级函数体，语法如下：
function functionName([arg0,arg1,…argn]){
statements
}
说明：
1、functionName是要定义的函数名，属于标识符
2、 []中的arg0,arg1,…argn为函数的参数，不是必需的
3、[]只说明里面的内容不是必须的，它不是语法
## 函数的调用
语法：
函数名([arg1,arg2,…argn])
## 函数的返回值
任何函数在任何时候都可以通过return语句后跟要返回的值来实现返回值。
说明：
1、函数会在执行完return语句之后停止并立即退出。
2、return语句也可以不带有任何返回值，一般用于需要提前停止函数执行而又不需要返回值的情况下。
实例：
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
       // 声明一个函数
       function myFun(){
       	  alert("我是一个函数");
       }
       // 函数的调用
       //myFun();

       // 声明一个带有参数的函数
       function add(num1,num2){
          var sum=num1+num2;
          return sum;
       }
       
       /*console.log(add(3,5));

       alert(add(99,789));

       var s=add(-1,-9);

       document.write('-1+-9='+s)*/

       function myFunction(arg){
          // 如果arg是非数字，不做任何操作，否则返回arg的2倍
          if(isNaN(arg)) return;
          return arg*2;
       }

       console.log(myFunction(40));
	</script>
</body>
</html>
```
## JavaScript中的参数

arguments
ECMAScript中的参数在内部用一个数组来表示，
在函数体内通过arguments对象来访问这个数组参数。
说明：
1、arguments对象只是与数组类似，并不是Array的实例。
2、[] 语法访问它的每一个元素。
3、length属性确定传递参数的个数。
实例
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
       /*function inner(){
          // arguments 
          console.log(arguments.length);
          console.log(arguments[1]); // 索引是从0开始的正整数
       }
       //inner(10,5);
       function add(num1,num2){    
          arguments[0]=99;
          console.log(num1);
       }
       add(55,88)*/
       // 求任意一组数的平均值
       function getAvg(){
          // 多所有参数进行求和
          var sum=0,len=arguments.length,i;
          for(i=0;i<len;i++){
             //sum=sum+arguments[i];
             sum+=arguments[i];
             // sum=0+5
             // sum=0+5+66
             // sum=0+5+66+45
          }
          return sum/len;
       }
       var avg=getAvg(5,66,45,32,88,24,40,199,3900);
       console.log(avg);
	</script>
</body>
</html>
```
