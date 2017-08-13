# CSS选择器
## 目录：
* 标签选择器（元素选择器）
* 全局选择器（通配符选择器）
* Id 和 Class选择器
* 群组选择器
* 后代选择器
* 派生选择器
* 属性选择器

## 标签选择器（元素选择器）
>元素选择器，就是“选中”相同的元素，然后对相同的元素设置同一个CSS样式。

语法：
![CSS元素选择器](http://upload-images.jianshu.io/upload_images/1599190-56097446be09eebf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 全局选择器
又称通配符选择器，形式*{}，作用于清除浏览器默认设置，常用于margin，padding。
## Id 和 Class选择器
两者的区别：[传送门](http://www.jianshu.com/p/30c5bbd10115)
	
	* HTML元素以id属性来设置id选择器,CSS 中 id 选择器以 "#" 来定义。
	* class 选择器在HTML中以class属性表示, 在 CSS 中，类选择器以一个点"."号显示：
	* 类名的第一个字符不能使用数字！它无法在 Mozilla 或 Firefox 中起作用。
* class 和 id 有什么区别
    1、class是设置标签的类， class属性用于指定元素属于何种样式的类；
    2、id是设置标签的标识。id属性用于定义一个元素的独特的样式。
    3、class是一个样式，先定义好， 然后可以套给多个结构/内容, 便于复用。也就是说class名称可以相同。
    4、id是一个标签，用于区分不同的结构和内容，就象你的名字， 如果一个屋子有2个人同名，就会出现混淆；id是先找到结构/内容，再给它定义样式；
    5、id的优先级要高于class

* 那么什么时候用 class 什么时候用 id呢

    * 单一的元素，或需要程序、JS控制的东西，需要用id定义；重复使用的元素、类别，用class定义。
    * 如果在页面中要对某个对象进行脚本操作（js），那么可以给他定义一个id，否则只能利用遍历页面元素加上指定特定属性来找到它，这是相对浪费时间资源，远远不如一个id来得简单.
    
## 群组选择器
![](http://i.imgur.com/J9ZVguZ.png)

## 后代选择器
![](http://i.imgur.com/UkcqyTp.png)
![](http://i.imgur.com/kbsJx37.png)
## 派生选择器
>通过依据元素在其位置的上下文关系来定义样式，你可以使标记更加简洁。

<em>在 CSS1 中，通过这种方式来应用规则的选择器被称为上下文选择器 (contextual selectors)，这是由于它们依赖于上下文关系来应用或者避免某项规则。在 CSS2 中，它们称为派生选择器，但是无论你如何称呼它们，它们的作用都是相同的。</em>

派生选择器允许你根据文档的上下文关系来确定某个标签的样式。通过合理地使用派生选择器，我们可以使 HTML 代码变得更加整洁。

比方说，你希望列表中的 strong 元素变为斜体字，而不是通常的粗体字，可以这样定义一个派生选择器：
```
li strong {
font-style: italic;
font-weight: normal;
}
```
请注意标记为``` <strong> ```的蓝色代码的上下文关系：
```
<p><strong>我是粗体字，不是斜体字，因为我不在列表当中，所以这个规则对我不起作用  </strong></p>
<ol>
<li><strong> 我是斜体字。这是因为 strong 元素位于 li 元素内。 </strong></li>
<li>我是正常的字体。</li>
</ol>
```
在上面的例子中，只有 li 元素中的 strong 元素的样式为斜体字，无需为 strong 元素定义特别的 class
或 id，代码更加简洁。
再看看下面的 CSS 规则：
```
strong {
color: red;
}
h2 {
color: red;
}
h2 strong {
color: blue;
}
```
下面是它施加影响的 HTML：
```
<p>The strongly emphasized word in this paragraph is<strong>red</strong>.</p>
<h2>This subhead is also red.</h2>
<h2> The strongly emphasized word in this subhead is <strong> blue </strong> . </h2>
```
[相关内容](CSS组合选择符.md)
CSS 后代选择器
CSS 子元素选择器
CSS 相邻兄弟选择器




## CSS 属性选择器
>对带有指定属性的 HTML 元素设置样式。可以为拥有指定属性的 HTML 元素设置样式，而不仅限于 class 和 id 属性。
<em><small>注释：只有在规定了 !DOCTYPE 时，IE7 和 IE8 才支持属性选择器。在 IE6 及更低的版本中，不支持属性选择。</small></em>

属性选择器
下面的例子为带有 title 属性的所有元素设置样式：
```
[title]
{
color:red;
}
```
属性和值选择器
下面的例子为 title="robot" 的所有元素设置样式：
```
[title=robot]
{
border:5px solid blue;
}
```
属性和值选择器 - 多个值
下面的例子为包含指定值的 title 属性的所有元素设置样式。适用于由空格分隔的属性值：
```
[title~=hello] { color:red; }
```
下面的例子为带有包含指定值的 lang 属性的所有元素设置样式。适用于由连字符分隔的属性值：
```
[lang|=en] { color:red; }
```
设置表单的样式
属性选择器在为不带有 class 或 id 的表单设置样式时特别有用：
```
input[type="text"]
{
width:150px;
display:block;
margin-bottom:10px;
background-color:yellow;
font-family: Verdana, Arial;
}
input[type="button"]
{
width:120px;
margin-left:35px;
display:block;
font-family: Verdana, Arial;
}
```  
