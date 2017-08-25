# JavaScript条件语句

## if语句
		
语法一：
```
if( condition ){
statement1;
}
```

语法二：
```
if( condition ){
statement1;
}else{
statement2;
}
```

语法三：
```
if( condition ){
statement1;
}else if(condition){
statement2;
}…else{
statement3;
}
```
笔试题
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
      var str="abc123";
      var num=parseInt(str);
      if(num==NaN){   // NaN和任何内容都不相等，包括它本身
         alert(NaN);
      }else if(num==123){
      	 alert(123);
      }else if(typeof num=="number"){
         alert("num");
      }else{
      	 alert("str");
      }
      // num
	</script>
</body>
</html>
```
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
       /*var age=35;
       if(age<18){
          alert("您还没有成年");
       }*/
       var age=prompt("请输入您的年龄");
       /*if(age<18){
          alert("您还没有成年");
       }else{
          alert("您已成年，请提供您的身份证号");
       }*/
       if(age<18){
          alert("您还没有成年");
       }else if(age>=18 && age<=59){   // 18岁到59岁之间
          alert("您可以进入");
       }else{
          alert("您已超出年龄限制");
       }
	</script>
</body>
</html>
```
##if...else的嵌套
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
       var password=prompt("请设置您的密码");
       // 判断密码的长度，如果不是6位，否则
       if(password.length!=6){
          alert("请输入6位的数字密码");
       }else{
       	  // 如果密码是非数字，否则是数字
          if(isNaN(password)){
             alert("密码必须要是数字");
          }else{
             alert("密码设置正确");
          }
       }
	</script>
</body>
</html>
```
## prompt()
语法：`prompt()`

功能：弹出输入框

返回值：
1、点击确定，返回输入内容

2、点击取消，返回null

## alert()
语法：`alert()`

功能：弹出警告对话框

## length
语法：`string.length`

功能：获取string字符串的长度

返回值：number

## 获取星期
语法：`new Date().getDay()`

功能：获取星期

返回值：number (0-6)

## 输出
语法：`document.write(“内容”)`

功能：向浏览器输出内容

## switch语句

语法：
```
switch( expression ){
case value:statement
break;
case value:statement
break;
……
default:statement
}
```
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
       /*var age=35;
       if(age<18){
          alert("您还没有成年");
       }
       var age=prompt("请设置您的密码");
       /*if(age<18){
          alert("您还没有成年");
       }else{
          alert("您已成年，请提供您的身份证号");
       }
       if(age.length!=6){
          alert("请输入6位数字密码");
       }else{
          if(isNaN(age)){
            alert("密码必须是6位数字");
          }else{
            alert("密码设置正确");
          }
       }*/
       var score=prompt("请输入成绩");
       var result="";
       if(isNaN(score)){
          alert("成绩必须是数字");
       }else{
          if(score<0 || score>100){
             alert("您输入的成绩有误");
          }else{
             switch(parseInt(score/10)){
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                result="不及格";
                break;
                case 6:
                result="及格";
                break;
                case 7:
                result="一般";
                break;
                case 8:
                result="良";
                break;
                case 9:
                result="优";
                break;
                default:
                result="满分"
             }
             alert("您的成绩为："+result);
          }
       }
	</script>
</body>
</html>
```
星期几实例
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>switch输出星期</title>
</head>
<body>
	<script>
       var week=new Date().getDay();
       var weekstr="";
       console.log(week);  // 0-6
       // 多条件的判断 switch
       switch(week){
          case 0:
          weekstr="日";
          break;  // 退出
          case 1:
          weekstr="一";
          break;
          case 2:
          weekstr="二";
          break;
          case 3:
          weekstr="三";
          break;
          case 4:
          weekstr="四";
          break;
          case 5:
          weekstr="五";
          break;
          default:
          weekstr="六";
       }
       document.write("今天是星期"+weekstr);
	</script>
</body>
</html>
```
# JavaScript循环语句

## for语句

语法：
```
for(语句1；语句2；语句3){
被执行的代码块；
}
```
语句 1 ：在循环（代码块）开始前执行
语句 2： 定义运行循环（代码块）的条件
语句 3 ：在循环（代码块）已被执行之后执行

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
       for(var i=0,col="";i<=100;i++){
          switch(i%4){
             case 0:
             col="red";
             break;
             case 1:
             col="green";
             break;
             case 2:
             col="blue";
             break;
             default:
             col="orange";
          }
          document.write('<font color="'+col+'">'+i+'</font><br>');
       }
	</script>
</body>
</html>
```

## 嵌套
当循环与循环发生嵌套时遵循下列规则：

1、外层为假时内层不执行；

2、先执行外层再执行内层，直至内层的条件为假时再返回外层去执行。

## while语句
语法：
```
while(条件){
需要执行的代码；
}
```
实例
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>while</title>
</head>
<body>
	<script>
       var i=1;
       while(i<=100){
          document.write(i+'<br />');   // 1 2 100
          i+=1;  // i++
       }

       //1 - 10
      /* var j=18;
       do{
          if(j%2==0){
             console.log(j);
          }
          j++;
       }while(j<=10);
*/
       // 1+2+3+4+...100=?

       // sum=0+1=1
       // sum=0+1+2
       // sum=0+1+2+3
       // sum=0+1+2+3+4
       var sum=0;   // sum和
       var n=1;
       while(n<=100){
          sum+=n;   // sum=sum+n;  // sum=0+1; sum=0+1+2+3+100
          n++;
       }
       console.log(sum);
	</script>
</body>
</html>
```
```
do-while 语句
语法：
do{
需要执行的代码；
}while(条件)

说明：这种语法的循环至少要被执行一次。
```

## for与while的区别
for：适合已知循环次数的循环体

while：适合未知循环次数的循环体
## break与continue的区别
break：立即退出循环

continue：结束本次循环，继续开始下一次。
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>break与continue</title>
</head>
<body>
	<script>
       var num=0;
       for(var i=1;i<10;i++){
          // 如果i是5的倍数，退出
          if(i%5==0){
             break;
          }
          num++;   // i=1,num=1;i=2,num=2;i=3,num=3,i=4,num=4,i=6,num=5
       }
       //console.log(num);
       for(var s=0,j=1;j<=10;j++){
          if(j%5==0){
             continue;
          } 
          s+=j;
          // j=1,s=1;j=2,s=3;j=3,s=6;j=4,s=10,j=5,s=10;j=6,s=16,j=7,s=23;j=8,s=31;j=9,s=40,j=10
       }
       //console.log(s);
       // 打印所有0-50之间除20和30之外的5的倍数
       for(var n=0;n<=50;n+=5){
          if(n==20 || n==30){
             continue;
          }
          console.log(n);
       }
	</script>
</body>
</html>
```