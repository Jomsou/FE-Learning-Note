# CSS简介

>CSS，即“Cascading Style Sheet（层叠样式表）”，是用来控制网页的外观的一门技术。HTML是网页的结构，CSS是网页的外观，而JavaScript是页面的行为。在网页初期，是没有CSS这回事的。那个时候的网页仅仅是用HTML标签来制作，这样可想而知是怎样的了？或者你可以这样理解，CSS的出现就是为了改造HTML标签在浏览器展示的外观，使其变得更加好看。如果没有CSS的出现，就不可能有现在“色彩缤纷”的页面。CSS的出现可以说就是为了改变表现单调、色彩惨淡的网页。

## CSS发展历史
### CSS
![](http://i.imgur.com/8V6iefb.png)

     CSS 指层叠样式表 (Cascading Style Sheets)
     样式定义如何显示 HTML 元素
     样式通常存储在样式表中
     把样式添加到 HTML 4.0 中，是为了解决内容与表现分离的问题
     外部样式表可以极大提高工作效率
     外部样式表通常存储在 CSS 文件中
     多个样式定义可层叠为一

### CSS3
![CSS和CSS3](http://upload-images.jianshu.io/upload_images/1599190-fb8cda4af251047d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>CSS3是CSS的升级版本。CSS是从CSS1.0、CSS2.0、CSS2.1和CSS3.0这几个版本一直升级而来，其中CSS2.1是CSS2.0的修订版，CSS3.0是CSS的最新版本。
CSS3.0相对于CSS2.0来说，新增了很多属性和方法，最典型的就是你可以直接为文字设置阴影和为标签设置圆角。在CSS2.0中，为标签设置圆角是一件很头疼的事情。

## 为什么要学CSS？

     CSS简化HTML相关标签，网页体积小，下载快
     解决内容与表现分离的问题
     更好的维护网页，提高工作效率

## 在HTML中引入CSS共有3种方式：

    （1）外部样式表；
    （2）内部样式表；
    （3）内联样式表；
	（4）导入式import；

#### CSS的3种引用方式
(1)外部样式表
>外部样式表是最理想的CSS引用方式，在实际开发当中，为了提升网站的性能和维护性，一般都是使用外部样式表。所谓的“外部样式表”，就是把CSS代码和HTML代码都单独放在不同文件中，然后在HTML文档中使用link标签来引用CSS样式表。
当样式需要被应用到多个页面时，外部样式表是最理想的选择。使用样式表，你就可以通过更改一个CSS文件来改变整个网站的外观。
外部样式表在单独文件中定义，并且在<head></head>标签对中使用link标签来引用。

举例：
```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
		<title></title>
		<!--在HTML页面中引用文件名为index的css文件-->
		<link href="index.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<div></div>
	</body>
<html>
```

(2)内部样式表

>内部样式，指的就是把CSS代码和HTML代码放在同一个文件中，其中CSS代码放在<style></style>标签对内，并且<style></style>标签对是放在<head></head>标签对内的。

举例:
```
<!DOCTYPE html> 
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title></title>
		<!--这是内部样式表，CSS样式在style标签中定义-->
		<style type="text/css">
			#div{color:Green;}
		</style>
	</head>
	<body>
		<div></div>
	</body>
</html>
```
(3)内联样式表

>内联样式表，也是把CSS代码和HTML代码放在同一个文件中，但是跟内部样式表不同，CSS样式不是在<style></style>标签对中定义，而是在标签的style属性中定义。

举例：
```
<!DOCTYPE html> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta charset="utf-8">
</head>
<body>
    <p style="color:Green; ">内联样式表</p>
    <p style="color:Green; ">内联样式表</p>
    <p style="color:Green; ">内联样式表</p>
</body>
</html>
```

>内联样式表和内部样式表中的例子，其实这两段代码实现的是同一个效果。三个p元素都定义了color属性，那么如果采用以下内部样式表，样式只需要写一遍；如果采用内联样式表，则三个p元素都要单独写一遍。对于网站来说，冗余代码很多，而且由于冗余代码多，每次改动CSS样式都要到具体的标签内修改，这样使得网站的维护性也非常差。

(4)CSS引用方式用途
>在实际开发中，我们一般使用外部样式表，而在在线代码测试工具和CSS入门的过程中，我们使用的是内部样式表，因为代码量不是很多，HTML代码和CSS代码放在同一个文件，这样也方便我们修改和测试。不管是在测试或者实际开发中，我们都不建议使用内联样式表。不过呢，我们可以使用内联样式表进行细节的微调。
                  
