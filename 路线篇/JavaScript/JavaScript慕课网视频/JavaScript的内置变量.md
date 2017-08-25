# JavaScript的内置变量
## arry
方法一：var nums=new Arry(项数)；nums[0]=..;或var nums=new Arry(3,6,6,...);

方法二： var nums=[1.,3,2,...];

注意：与其他语言相比，JavaScript中的数组各项可以是不同的数据类型

```
/* var colors=new Array(3);
       colors[0]="#f00";
       colors[1]="#0f0";
       colors[2]="#00f";
       console.log(colors);
       var nums=new Array(1,3,6,9);
       //console.log(nums);
       var cols=["red","yellow","green"];
       //console.log(cols);
       var infos=[6,"marry",true];
       //console.log(infos);
       console.log(cols[5]);  // 读取cols这个数组中索引为1的值*/
       var arr=["a","b","c","d"];
       //console.log(arr.length);  // 4
       //arr.length=2;
       //arr[99]="z";
       //console.log(arr.length); // 100
```
### 数组元素的读取
读取和设置值时，使用[]并提供相应的索引

说明：索引从0开始的正整数

### arry.length用来获取数组arry的长度

说明：

1.可以通过设置length来从数组末尾移除项或增加项。

2.var nums=[1,2,3];nums[99]=99;console.log(nums.length);//100  长度值等于最后一项索引加一
### 数组的遍历
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
	   // 创建一个保存颜色的数组
       // 数组的遍历
       for(var i=0;i<arr.length;i++){
          console.log(arr[i]);
       }
 	</script>
</body>
</html>
```
### 数组的栈方法：
栈方法|语法|功能|返回值
-|-|-
push()|arrayObject.push(newele1,newele2,....,neweX)|把它的参数顺序添加到arrayObject 的尾部。|把指定的值添加到数组后的新长度。
unshift()|arrayObject.unshift(newele1,newele2,....,neweX)|把它的参数顺序添加到 arrayObject 的开头。|把指定的值添加到数组后的新长度。
pop()|arrayObject.pop()|删除 arrayObject 的最后一个元素|被删除的那个元素
shift()|arrayObject.shift()|删除 arrayObject中的第一个元素|被删除的那个元素
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
	   // push
       var colors=new Array("red","green");
       var len=colors.push("blue","yellow","blank");
       console.log(len);
       // unshift
       var nums=[2,7,8,6];
       var size=nums.unshift(99,66);
       // pop
       var n=nums.pop();
       console.log(nums);
       // unshift
       var m=colors.shift();
       console.log(m);
	</script>
</body>
</html>
```
## 数组的转换方法和重排序方法
方法|语法|功能|返回值
-|-|-
join()|arrayObject.join(separator)|用于把数组中的所有元素放入一个字符串。|字符串。
reverse()|stringObject.reverse()|用于颠倒数组中元素的顺序。|数组。
sort()|arrayObject.sort(sortby)|用于对数组的元素进行排序。|数组。
说明：
1、即使数组中的每一项都是数值，sort()方法比较的也是字符串。
2、sort()方法可以接收一个比较函数作为参数。
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
      // 写一个函数，返回某个值在这个数组中出现了多少次
      var nums=[8,2,5,6,8,6,7,9];
      function getTimes(arr,num){
         // 次数
         var times=0,i;
         // 遍历数组
         for(i=0;i<arr.length;i++){
            // 比较数组中的每一值是否和num相等
            if(arr[i]==num){
               // 次数+1
               times+=1;
            }
         }
         return times;
      }
      var times1=getTimes(nums,99);
      var times2=getTimes(["a","c","a","d"],"a");
      console.log(times1);
      console.log(times2);
      // 封装一个方法，实现reverse()的功能
      // 数组翻转
      function reverseArr(arr){
         // 新数组
         var newArr=[];
         // 遍历数组，从最后一个值开始取
        /* for(var i=arr.length-1;i>=0;i--){
            // 将每一个值追加到新数组的最后
            newArr.push(arr[i]);
         }*/
         for(var i=0;i<arr.length;i++){
            newArr.unshift(arr[i])
         }
         return newArr;
      }
      var newArr1=reverseArr([1,2,4,9,6]);
      var newArr2=reverseArr(["o","l","l","e","h"]);
      console.log(newArr1);
      console.log(newArr2.join(""));
	</script>
</body>
</html>
```
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
	   // join
	   var nums=[2,4,5];
	   var str=nums.join();  //2,4,5 
	   var words=["border","left","color"];
	   // border-left-color
	   var wordstr=words.join("-");
	   console.log(wordstr);
	   // reverse
	   nums.reverse();
	   console.log(nums);
	   var strs=["a","b","c","d"];
	   // 返回dcba这个字符串
       var newstr=strs.reverse().join("")
	   console.log(newstr);
	   // 29,5,24,17,32
	   var arr=[9,23,15,-99,88,12,-2];
	   // 降序 return 参数1<参数2
	   //arr.sort(function(a,b){return a<b});
	   // 升序 return 参数1>参数2
	   arr.sort(function(a,b){return a>b});
	   console.log(arr);
	</script>
</body>
</html>
```
## 数组的操作方法
方法|语法|功能|返回值
-|-|-
concat()|arrayObject.concat(arrayX,arrayX,......,arrayX)|用于连接两个或多个数组。|数组。
slice()|arrayObject.slice(start,end)|从已有的数组中返回选定的元素。|数组
注意：slice()参数：

start （必需）规定从何处开始选取，如果是负数，那么它规定从数组尾部开始算起的位置。

end（可选）规定从何处结束选取，该参数是数组片断结束处的数组下标。

说明：

1、如果没有指定end，那么切分的数组包含从 start 到数组结束的所有元素。

2、如果slice()方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置。
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
      var arr1=["a","b","c"],
          arr2=["d","e",1,3],
          arr3;
      // concat
      arr3=arr1.concat(arr2,["m",99,8]);
      console.log(arr3);
      // slice(start,end) end下标
      var colors=["red","green","blue","yellow","orange"];
      //var newColors=colors.slice(1,3);
      //var newColors2=colors.slice(2,4);
      var newColors3=colors.slice(-4,3); // 1,3
      console.log(newColors3);
      // 完成以下代码段，实现b数组对a数组的拷贝，方法越多越好
      var a=[1,"yes",3],
          b;
      // 1、数组遍历,push
      /*b=new Array();
      for(var i=0;i<a.length;i++){
         b.push(a[i]);
      }*/
      // 2、concat()
      b=[].concat(a);
      // 3、slice();
      b=a.slice(0);
      console.log(b);
	</script>
</body>
</html>
```
### splice()删除数组项、插入数组项、替换数组项
#### 删除
语法：
arrayObject.splice(index,count)
功能：
删除从 index 处开始的零个或多个元素。
返回值：
含有被删除的元素的数组。
说明：
count是要删除的项目数量，如果设置为 0，则不会删除项目。
如果不设置，则删除从index开始的所有值。
#### 插入
语法：
arrayObject.splice(index,0,item1,.....,itemX)
功能：
在指定位置插入值
参数：
Index：起始位置
0：要删除的项数
item1…itemX：要插入的项
返回值：数组
#### 替换
语法：
arrayObject.splice(index,count,item1,.....,itemX)
功能：
在指定位置插入值，且同时删除任意数量的项
参数：
Index：起始位置
count：要删除的项数
item1…itemX：要插入的项
返回值：从原始数组中删除的项（如果没有删除任何项，则返回空数组）
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
       var arr=["a","b","c","d","e","f"];
       // 删除
       //var delArr=arr.splice(2,3);
       // 插入
       //var insertArr=arr.splice(3,0,"m","n",88);
       // 替换
       var replaceArr=arr.splice(1,2,"x","y","z");
       console.log(arr);
       console.log(replaceArr);
	</script>
</body>
</html>
```
### ECMAScript为数组实例添加的两个位置方法：

#### indexOf()
语法：
arrayObject.indexOf(searchvalue，startIndex)
功能：
从数组的开头（位置0）开始向后查找。
参数：
searchvalue：必需，要查找的项；
startIndex：可选，起点位置的索引。
返回值：
number，查找的项在数组中的位置，没有找到的情况下返回-1。
#### lastIndexOf()
语法：
arrayObject.lastIndexOf(searchvalue，startIndex)
功能：
从数组的末尾开始向前查找。
参数：
searchvalue：必需，要查找的项；
startIndex：可选，起点位置的索引。
返回值：
number，查找的项在数组中的位置，没有找到的情况下返回-1。
说明
1、在比较第一个参数与数组中的每一项时，会使用全等操作符，
即要求查找的项必须严格相等。
2、数组的位置方法是ECMAScript5为数组实例新增的，所以支
持的浏览器只有：
IE9+、Firefox2+、Safari3+、Opera9.5和Chrome。
自己封装
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
       var nums=[1,7,5,7,8,1,6,9];
       //var pos=nums.indexOf(7,2);
       //var pos=nums.lastIndexOf(1);
       var pos=nums.indexOf("7");
       console.log(pos);
       // 封装一个方法实现indexOf的功能
       function ArrayIndexOf(arr,value){
          // 检测value在arr中出现的位置
          for(var i=0;i<arr.length;i++){
             if(arr[i]===value){
                return i;
             }
          }
          return -1;
       }
       var pos2=ArrayIndexOf(nums,7);
       console.log(pos2);
	</script>
</body>
</html>
```

## 字符串对象的方法：

## charAt()
语法：stringObject.charAt(index)

功能：返回stringObject中index位置的字符。

说明：
ECMAScript5中可使用“方括号加字符索引”来访问字符串中特定的字符，但是
IE7及更早的浏览器会返回undefined。
## charCodeAt()
语法：stringObject.charCodeAt(index)

功能：返回stringObject中index位置字符的字符编码。

## indexOf()
语法：stringObject.indexOf ("o")

功能：从一个字符串中搜索给定的子字符串，返回子字符串的位置。

返回值：数值

说明：如果没有找到该子字符串，则返回-1。

## lastIndexOf()
语法：stringObject.lastIndexOf ("o")

功能：从一个字符串中搜索给定的子字符串，返回子字符串的位置

返回值：数值

说明：如果没有找到该子字符串，则返回-1

## 字符串对象的截取方法：
### slice()
语法：stringValue.slice(start,end)

功能：截取子字符串。

参数说明：
1、start：必需，指定子字符串的开始位置。
2、end：可选，表示子字符串到哪里结束，end本身不在截取
范围之内，省略时截取至字符串的末尾。
3、当参数为负数时，会将传入的负值与字符串的长度相加。

### substring()
说明：语法及功能同slice()完全一样。

区别在于：
1、当参数为负数时，自动将参数转换为0。

2、substring()会将较小的数作为开始位置，将较大的数作为结束位置。

### substr()
语法：stringValue.substr(start,len)

功能：截取子字符串。

参数说明：
1、start：必需，指定子字符串的开始位置。

2、len：可选，表示截取的字符总数，省略时截取至字符串的末尾。

3、当start为负数时，会将传入的负值与字符串的长度相加。

4、当len为负数时，返回空字符串。

## 掌握字符串方法的综合应用：
学习目标
编写js函数，用于获得输入参数的后缀名，如输入abc.txt，返回.txt。
### 掌握字符串对象的方法：

#### split()
语法：stringObject.split(separator)

功能：把一个字符串分割成字符串数组。

返回值：Array。

说明：
separator：必需，分隔符。

#### replace()
语法：stringObject.replace(regexp/substr,replacement)

功能：在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

返回值：String

参数：
regexp：必需。规定子字符串或要替换的模式的 RegExp 对象。

replacement:：必需。一个字符串值。

### 掌握字符串方法的其他方法：

#### toUpperCase()
语法：stringValue.toUpperCase()

功能：把字符串转换为大写。
### toLowerCase()

语法：stringValue.toLowerCase()

功能：把字符串转换为小写。

案例流程图

## JavaScript中的Math
1、掌握Math对象的方法：
学习目标
min()
max()
ceil()
floor()
round()
abs()
Math.min()
语法：
Math.min(num1,num2…numN)
功能：
求一组数中的最小值。
返回值：Number。
Math.max()
语法：
Math.max(num1,num2…numN)
功能：
求一组数中的最大值。
返回值：Number。
Math.ceil()
语法：
Math.ceil(num)
功能：
向上取整，即返回大于num的最小整数。
返回值：Number。
Math.floor()
语法：
Math.floor(num)
功能：
向下取整，返回num的整数部分。
返回值：Number。
Math.round()
语法：
Math.round (num)
功能：
将数值四舍五入为最接近的整数。
返回值：Number。
Math.abs()
语法：
Math.abs (num)
功能：
返回num的绝对值。
返回值：Number。
1、掌握Math对象的random()方法
学习目标
2、封装一个求n到m之间的随机整数的函数。
Math.random()
语法：
Math.random()
功能：
返回大于等于0小于1的一个随机数。
返回值：Number。
说明：
求n到m之间的随机整数的公式：
random=Math.floor(Math.random()*(m-n+1)+n);
JavaScript中的date对象
1、掌握创建日期对象的方法
学习目标
2、掌握date对象中获取日期时间的方法
3、掌握date对象中设置日期时间的方法
如何创建一个日期对象
语法：new Date();
功能：创建一个日期时间对象
返回值：不传参的情况下，返回当前的日期时间对象。
说明：
如果想根据特定的日期和时间创建日期对象，必须传入表示该
日期
的毫秒数或者是一组用逗号隔开的表示年月日时分秒的参数。
获取年月日时分秒及星期的方法
1、getFullYear()：返回4位数的年份
2、getMonth()：返回日期中的月份，返回值为0-11
3、getDate()：返回月份中的天数
4、getDay()：返回星期，返回值为0-6
5、getHours()：返回小时
6、getMinutes()：返回分
7、getSeconds()：返回秒
8、getTime()：返回表示日期的毫秒数
设置年月日时分秒及星期的方法
1、setFullYear(year)：设置4位数的年份
2、setMonth(mon)：设置日期中的月份，从0开始，0表示1月
3、setDate()：设置日期
4、setDay()：设置星期，从0开始，0表示星期日
5、setHours()：设置小时
6、setMinutes()：设置分
7、setSeconds()：设置秒
8、setTime()：以毫秒数设置日期，会改变整个日期