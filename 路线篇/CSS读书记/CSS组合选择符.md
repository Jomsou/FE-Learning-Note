>组合选择符说明了两个选择器直接的关系。

### 目录：
 *  后代选取器(以空格分隔)
 * 子元素选择器(以大于号分隔）
 * 相邻兄弟选择器（以加号分隔）
 * 普通兄弟选择器（以破折号分隔）

### 后代选取器
后代选取器匹配所有值得元素的后代元素。
以下实例选取所有``` <p> ```元素插入到 ```<div>``` 元素中 

实例
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"> 
		<title>后代选取器</title> 
		<style>
			div p
			{
				background-color:yellow;
			}
		</style>
	</head>
	<body>
		<div>
			<p>段落 1。 在 div 中。</p>
			<p>段落 2。 在 div 中。</p>
		</div>
		<p>段落 3。不在 div 中。</p>
		<p>段落 4。不在 div 中。</p>
	</body>
</html>
```

![效果图](http://upload-images.jianshu.io/upload_images/1599190-204021b0cffd8532.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 子元素选择器
与后代选择器相比，子元素选择器（Child selectors）只能选择作为某元素子元素的元素。
以下实例选择了```<div>```元素中所有直接子元素 ```<p>```

实例
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"> 
		<title>子元素选择器</title> 
		<style>
			div>p
			{
				background-color:yellow;
			}
			</style>
	</head>
	<body>
		<h1>Welcome to My Homepage</h1>
		<div>
			<h2>My name is Donald</h2>
			<p>I live in Duckburg.</p>
		</div>
		<div>
			<span><p>I will not be styled.</p></span>
		</div>
		<p>My best friend is Mickey.</p>
	</body>
</html>
```

![效果图](http://upload-images.jianshu.io/upload_images/1599190-adf53ac63ef79550.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 相邻兄弟选择器
相邻兄弟选择器（Adjacent sibling selector）可选择紧接在另一元素后的元素，且二者有相同父元素。
如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器（Adjacent sibling selector）。
以下实例选取了所有位于``` <div>``` 元素后的第一个```<p> ```元素

实例
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"> 
		<title>相邻兄弟选择器</title> 
		<style>
			div+p
			{
				background-color:yellow;
			}
		</style>
	</head>
	<body>
		<h1>Welcome to My Homepage</h1>
		<div>
			<h2>My name is Donald</h2>
			<p>I live in Duckburg.</p>
		</div>
		<p>My best friend is Mickey.</p>
		<p>I will not be styled.</p>
	</body>
</html>
```

![效果图](http://upload-images.jianshu.io/upload_images/1599190-d4f195e022fa9620.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




### 后续兄弟选择器
后续兄弟选择器选取所有指定元素之后的相邻兄弟元素。
以下实例选取了所有 ```<div>```元素之后的所有相邻兄弟元素 ```<p>``` 

实例
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"> 
		<title>后续兄弟选择器</title> 
		<style>
			div~p
			{
				background-color:yellow;
			}
		</style>
	</head>
	<body>	
		<p>之前段落，不会添加背景颜色。</p>
		<div>
			<p>段落 1。 在 div 中。</p>
			<p>段落 2。 在 div 中。</p>
		</div>
		<p>段落 3。不在 div 中。</p>
		<p>段落 4。不在 div 中。</p>
	</body>
</html>
```
![效果图](http://upload-images.jianshu.io/upload_images/1599190-0524e6b0577316d7.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    
