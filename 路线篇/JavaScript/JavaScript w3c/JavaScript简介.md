# JavaScript简介

## JavaScript简介
>JavaScript 是互联网上最流行的脚本语言，这门语言可用于 HTML 和 web，更可广泛用于服务器、PC、笔记本电脑、平板电脑和智能手机等设备。

## JavaScript是脚本语言
JavaScript 是一种轻量级的编程语言。
JavaScript 是可插入 HTML 页面的编程代码。
JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行。
JavaScript 很容易学习。

## JavaScript：直接写入 HTML 输出流

实例
```
document.write("<h1>这是一个标题</h1>");
document.write("<p>这是一个段落。</p>");
```
注意：[您只能在 HTML 输出中使用 document.write。如果您在文档加载完成后使用该方法，会覆盖整个文档。](https://www.w3cschool.cn/tryrun/showhtml/tryjs_intro_document_write)

>刚刚接触JS，看到这句话时一时没搞懂，想了终于有了一些眉目，意思就是在文档加载过后，如果我们用比方说按钮的方式重新加载文档，就会把文档都覆盖；

列如：
```
<!DOCTYPE html>
<html>
<body>

<h1>My First Web Page</h1>

<p>My First Paragraph.</p>

<button onclick="myFunction()">点击这里</button>

<script>
function myFunction()
{
document.write("糟糕！文档消失了。");
}
</script>

</body>
</html>
```
前后效果图：
![](../images/005.png)

![](../images/006.png)
## JavaScript：对事件的反应

实例
```
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title></title> 
</head>
<body>
	
<h1>我的第一个 JavaScript</h1>
<p>
JavaScript 能够对事件作出反应。比如对按钮的点击：
</p>
<button type="button" onclick="alert('欢迎!')">点我!</button>
	
</body>
</html>
```

alert() 函数在 JavaScript 中并不常用，但它对于代码测试非常方便。
onclick 事件只是您即将在本教程中学到的众多事件之一。
## JavaScript：改变 HTML 内容

使用 JavaScript 来处理 HTML 内容是非常强大的功能.

实例
```
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title></title> 
</head>
<body>
	
<h1>我的第一段 JavaScript</h1>
<p id="demo">
JavaScript 能改变 HTML 元素的内容。
</p>
<script>
function myFunction()
{
	x=document.getElementById("demo");  // 找到元素
	x.innerHTML="Hello JavaScript!";    // 改变内容
}
</script>
<button type="button" onclick="myFunction()">点击这里</button>
	
</body>
</html>
```
您会经常看到 document.getElementById("some id")。这个方法是 HTML DOM 中定义的。
DOM (Document Object Model)（文档对象模型）是用于访问 HTML 元素的正式 W3C 标准。
您将在本教程的多个章节中学到有关 HTML DOM 的知识。
## JavaScript 能够改变任意 HTML 元素的大多数属性，而不仅仅是图片。
## JavaScript：改变 HTML 样式

改变 HTML 元素的样式，属于改变 HTML 属性的变种。
实例
```
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title></title> 
</head>
<body>
	
<h1>我的第一段 JavaScript</h1>
<p id="demo">
JavaScript 能改变 HTML 元素的样式。
</p>
<script>
function myFunction()
{
	x=document.getElementById("demo") // 找到元素
	x.style.color="#ff0000";          // 改变样式
}
</script>
<button type="button" onclick="myFunction()">点击这里</button>
	
</body>
</html>
```

## JavaScript：验证输入

JavaScript 常用于验证用户的输入。
实例
```
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title></title> 
</head>
<body>
	
<h1>我的第一段 JavaScript</h1>
<p>请输入数字。如果输入值不是数字，浏览器会弹出提示框。</p>
<input id="demo" type="text">
<script>
function myFunction()
{
	var x=document.getElementById("demo").value;
	if(x==""||isNaN(x))
	{
		alert("不是数字");
	}
}
</script>
<button type="button" onclick="myFunction()">点击这里</button>
	
</body>
</html>
```

>**注意**：JavaScript 与 Java 是两种完全不同的语言，无论在概念上还是设计上。Java（由 Sun 发明）是更复杂的编程语言。ECMA-262 是 JavaScript 标准的官方名称。JavaScript 由 Brendan Eich 发明。它于 1995 年出现在 Netscape 中（该浏览器已停止更新），并于 1997 年被 ECMA（一个标准协会）采纳。
## JavaScript的用法

- 脚本可位于 HTML 的 <body> 或 <head> 部分中，或者同时存在于两个部分中。通常的做法是把函数放入 <head> 部分中，或者放在页面底部。这样就可以把它们安置到同一处位置，不会干扰页面的内容。
- 也可以把脚本保存到外部文件中。`<script src="xxx.js"></script>`
