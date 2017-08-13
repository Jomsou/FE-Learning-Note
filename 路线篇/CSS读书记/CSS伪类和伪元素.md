# CSS伪类和伪元素

>CSS伪类和伪元素是用来添加一些选择器的特殊效果。

**伪类:hover和:active兼容**
• IE6及更早版本，支持`<a>`元素的4种状态
• IE6浏览器不支持其他元素的:hover和:active


* 文本修饰：text-decoration 属性主要用于删除链接中的下划线
* 背景颜色：背景颜色属性指定链接背景色
* 字体颜色：字体颜色属性color

## 伪类的语法：

selector:pseudo-class {property:value;}

#### CSS类也可以使用伪类：

selector.class:pseudo-class {property:value;}
#### anchor伪类
```
a:link {color:#FF0000;} /* 未访问的链接 */
a:visited {color:#00FF00;} /* 已访问的链接 */
a:hover {color:#FF00FF;} /* 鼠标划过链接 */
a:active {color:#0000FF;} /* 已选中的链接 */
```

#####注意： 在CSS定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。

#####注意： 在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。

#####注意：伪类的名称不区分大小写。

## 伪元素的语法：

selector:pseudo-element {property:value;}

#### CSS类也可以使用伪元素：

selector.class:pseudo-element {property:value;}

--------------------------------------------------------------------------------

![](http://i.imgur.com/fiDNB2F.png)