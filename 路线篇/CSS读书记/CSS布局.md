# CSS布局

## CSS布局的命名规范
>各部分div命名参考

头部：header
内容：content/containe
尾部：footer
导航：nav
侧栏：sidebar
栏目：column
左、中、右：xx_left、xx_center、xx_right
登录条：loginbar
登录：login
注册：register
标志：logo
广告：banner
页面主体：main
热点：hot
新闻：news
下载：download
子导航：subnav
菜单：menu
搜索：search
标签页：tab
文章列表：list
指南：guild
状态：status
合作伙伴：partner
摘要：summary
标题：title
提示信息：msg
图标：icon
注释：note
![](http://upload-images.jianshu.io/upload_images/1291361-46c0fd3a2e7aa0f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## CSS网页布局

- 行布局
- 多列布局
- 圣杯布局
- 双飞翼布局

### 任务
学习本门课程需要掌握的知识
- 会使用DIV+CSS进行排版
- HTML和CSS基础
- 熟悉Float属性，Position属性



### 经典的行布局
**task01**
- 基础的行布局
- 行布局自适应
- 行布局自适应限制最大宽
- 行布局垂直水平居中

**task02**
- 行布局固定宽
- 行布局某部位自适应
- 行布局导航随屏幕滚动

### 经典的列布局
- 两列布局固定
- 两列布局自适应
- 三列布局固定
- 三列布局自适应

### 混合布局
- 混合布局固定
- 混合布局自适应

### 圣杯布局
认识圣杯布局
- 圣杯布局是由国外的Kevin Cornell提出的一个布局模型概念
- 在国内由淘宝UED的工程师传播开来
- 经改良后也被称为双飞翼布局

举个栗子
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
	*{margin: 0;padding:0;}
	body{
		min-height: 700px;
		font-size: 20px;
		font-family: "宋体"；
	}	
	.header,.footer{
		width: 100%;
		height: 70px;
		background-color: #333;
		line-height: 70px;
		text-align: center;
		color: #fff;
	}
	
	.middle,.left,.right{
		text-align: center; 
		position: relative;
		float: left;
		min-height: 700px;
		

	}
	.container{
		margin: 0 220px 0 200px;
		display: table;
	}
	.middle{
		background-color: gray;
		width: 100%;
		word-break: break-all;
	}
	.left{
		width: 200px;
		margin-left: -100%;
		left: -200px;
		background-color: red;
		line-height: 700px;
	}
	.right{
		width: 220px;
		margin-left: -220px;
		right: -220px;
		background-color: blue;
		line-height: 700px;
	}
	.footer{clear: both;}
	</style>
</head>
<body>
	<!--头部-->
	<div class="header">
		<h4>header</h4>
	</div>
	<!--主体-->
	<div class="container">
		<div class="middle">
			middlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
		</div>
		<div class="left">
			<h4>left</h4>
		</div>
		<div class="right">
			<h4>right</h4>
		</div>
	</div>
	<!--底部-->
	<div class="footer">
		<h4>footer</h4>
	</div>
</body>
</html>
```
### 双飞翼布局
布局要求
- 三列布局，中间宽度自适应，两边定宽
- 中间栏要在浏览器中优先展示渲染
- 允许任意列的高度最高
- 只用一个额外的DIV标签
- 用最简单的CSS、最少的HACK语句

举个栗子
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		*{margin: 0;padding: 0;}
		body{min-height: 700px;font-size: 20px;font-family: "宋体";}
		.header,.footer{
			width: 100%;
			background-color: #333;
			height: 70px;
			line-height: 70px;
			text-align: center;
			color: #fff;

		}
		.main,.sub,.extra{
			float: left;
			min-height: 700px;
			text-align: center;
		}
		.main{
			width: 100%;
			
		}
		.sub{
			margin-left: -100%;
			width: 220px;
			background-color: red;
		}
		.extra{
			margin-left: -200px;
			width: 200px;
			background-color: blue;
		}
		.main-inner{
			margin-left: 220px;
			margin-right: 200px;
			background-color: gray;
			min-height: 700px;
			word-break: break-all;
		}
		.footer{clear: both;}
	</style>
</head>
<body>
	<!--头部-->
	<div class="header">
		<h4>header</h4>
	</div>
	<!--主体-->
	<div class="main">
		<div class="main-inner">
		mainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmain
		</div>
	</div>
	<!--左侧-->
	<div class="sub">
		<h4>sub</h4>
	</div>
	<!--右侧部-->
	<div class="extra">
		<h4>extra</h4>
	</div>
	<!--底部-->
	<div class="footer">
		<h4>footer</h4>
	</div>
</body>
</html>
```

>双飞翼布局特色
- 兼容所有浏览器（IE6+,现代浏览器）的终极布局方案
- 目的都是左右两栏固定宽度，中间部分自适应

### 总结对比

#### 圣杯布局的流程方式
- 然后是Left,right
- Middle部分首先要放在container的最前部分

#### 双飞翼布局的流程方式
- main要放最前边，其次是sub extra

*在实践中，应当能够灵活使用布局方式，最后梳理成自己的套路*
