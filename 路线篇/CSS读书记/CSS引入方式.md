# CSS引入方式

>插入样式表的方法有四种:

* 外部样式表(External style sheet)
 ```
	<head>
	<link rel="stylesheet" type="text/css" href="mystyle.css">
	</head>
```
* 内部样式表(Internal style sheet)
```
	<head>
	<style>
	hr {color:sienna;}
	p {margin-left:20px;}
	body {background-image:url("images/back40.gif");}
	</style>
	</head>
```
* 内联样式(Inline style)	
```	
	<p style="color:sienna;margin-left:20px">这是一个段落。</p>
```
* 导入式
```
@import “外部CSS样式”
说明：@import写在<style>标签内最开始
```
![](http://i.imgur.com/d8MfYsY.png)

* 多重样式优先级
>  (内联样式）Inline style > （内部样式）Internal style sheet >导入式>（外部样式）External style sheet > 浏览器默认样式

*说明：*
1. 链入外部样式表与内部样式表之间的优先级取决于所处位置的先后。即如果外部样式放在内部样式的后面，则外部样式将覆盖内部样式。
2. 最后定义的优先级最高（就近原则）

**css引入方式优先级**
 
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>验证css样式优先级</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
   
     <link href="css2.css" rel="stylesheet">
    <style type="text/css">
    /**
     * 导入式，写在style里
     */
    
    /**
     * 内部样式优先于导入式
     * @type {[type]}
     */
    p {color: gray;} 
    @import url(css1.css);/*color: green*/
    </style>
    <!--就近原则
    <link href="css2.css" rel="stylesheet">-->
</head>

<body>
    <!-- 内联样式优先于内部样式<p style="color: green;">css层叠样式表</p> -->
    <p>css层叠样式表</p>
</body>

</html>
```
css1.css
`p{color: green;}`
css2.css
`p{color: orange;}`