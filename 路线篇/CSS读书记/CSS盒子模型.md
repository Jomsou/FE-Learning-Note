### 目录：
* CSS 盒子模型（Box Model）
* CSS 边框
* CSS 轮廓
* CSS Margin(外边距)
* CSS Padding（填充）

### CSS 盒子模型(Box Model)
>所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。
盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。
下面的图片说明了盒子模型(Box Model)：
![](http://upload-images.jianshu.io/upload_images/1599190-02fad1cef876ab73.gif?imageMogr2/auto-orient/strip)
不同部分的说明：

    Margin(外边距) - 清除边框外的区域，外边距是透明的。
    Border(边框) - 围绕在内边距和内容外的边框。
    Padding(内边距) - 清除内容周围的区域，内边距是透明的。
    Content(内容) - 盒子的内容，显示文本和图像。

为了在所有浏览器中的元素的宽度和高度设置正确的话，你需要知道的盒模型是如何工作的。
##### 元素的宽度和高度
**重要:** 当您指定一个CSS元素的宽度和高度属性时，你只是设置内容区域的宽度和高度。要知道，完全大小的元素，你还必须添加填充，边框和边距。
下面的例子中的元素的总宽度为300px：
<pre>div {
    width: 300px;
    border: 25px solid green;
    padding: 25px;
    margin: 25px;
}</pre>
让我们自己算算：
<pre>300px (宽)
+ 50px (左 + 右填充)
+ 50px (左 + 右边框)
+ 50px (左 + 右边距)
= 450px</pre>

最终元素的总宽度计算公式是这样的：
总元素的宽度=宽度+左填充+右填充+左边框+右边框+左边距+右边距
元素的总高度最终计算公式是这样的：
总元素的高度=高度+顶部填充+底部填充+上边框+下边框+上边距+下边距

##### 浏览器的兼容性问题
>一旦为页面设置了恰当的 DTD，大多数浏览器都会按照上面的图示来呈现内容。然而 IE 5 和 6 的呈现却是不正确的。根据 W3C 的规范，元素内容占据的空间是由 width 属性设置的，而内容周围的 padding 和 border 值是另外计算的。不幸的是，IE5.X 和 6 在怪异模式中使用自己的非标准模型。这些浏览器的 width 属性不是内容的宽度，而是内容、内边距和边框的宽度的总和。

<em><strong>虽然有方法解决这个问题。但是目前最好的解决方案是回避这个问题。也就是，不要给元素添加具有指定宽度的内边距，而是尝试将内边距或外边距添加到元素的父元素和子元素。</strong></em>
>IE8 及更早IE版本不支持 填充的宽度和边框的宽度属性设。
解决IE8及更早版本不兼容问题可以在HTML页面声明 <!DOCTYPE html>即可。

### CSS 边框
#### border-style
border-style|值
-|-
none| 默认无边框
dotted|定义一个点线边框
dashed|定义一个虚线边框
solid|定义实线边框
double| 定义两个边框。 两个边框的宽度和 border-width 的值相同
groove|定义3D沟槽边框。效果取决于边框的颜色值
ridge|定义3D脊边框。效果取决于边框的颜色值
inset:|定义一个3D的嵌入边框。效果取决于边框的颜色值
outset| 定义一个3D突出边框。 效果取决于边框的颜色值

属性|描述 
-|-|-
border | 简写属性，用于把针对四个边的属性设置在一个声明。
border-style|用于设置元素所有边框的样式，或者单独地为各边设置边框样式。 
border-width|简写属性，用于为元素的所有边框设置宽度，或者单独地为各边边框设置宽度。
border-color|简写属性，设置元素的所有边框中可见部分的颜色，或为 4 个边分别设置颜色。
border-bottom|简写属性，用于把下边框的所有属性设置到一个声明中。
border-bottom-color|设置元素的下边框的颜色。
border-bottom-style|设置元素的下边框的样式。
border-bottom-width|设置元素的下边框的宽度。
border-left|简写属性，用于把左边框的所有属性设置到一个声明中。
border-left-color|设置元素的左边框的颜色。
border-left-style|设置元素的左边框的样式。
border-left-width|设置元素的左边框的宽度。
border-right|简写属性，用于把右边框的所有属性设置到一个声明中。
border-right-color|设置元素的右边框的颜色。
border-right-style|设置元素的右边框的样式。
border-right-width|设置元素的右边框的宽度。
border-top|简写属性，用于把上边框的所有属性设置到一个声明中。
border-top-color|设置元素的上边框的颜色。
border-top-style|设置元素的上边框的样式。
border-top-width|设置元素的上边框的宽度。

### CSS 轮廓（outline）
>轮廓（outline）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。
CSS outline 属性规定元素轮廓的样式、颜色和宽度。

![](http://upload-images.jianshu.io/upload_images/1599190-6ba58abc275daa5a.gif?imageMogr2/auto-orient/strip)
所有CSS 轮廓（outline）属性
"CSS" 列中的数字表示哪个CSS版本定义了该属性(CSS1 或者CSS2)。

属性|说明|值|CSS
- |- |- |-
outline |在一个声明中设置所有的轮廓属性|*outline-color outline-style outline-width *inherit|2
outline-color|设置轮廓的颜色|*color-name hex-number rgb-number invert*inherit|2
outline-style| 设置轮廓的样式|*none dotted dashed soliddouble groove ridge inset outset *inherit|2
outline-width |设置轮廓的宽度|thin medium thick *length *inherit|2

### CSS Margin(外边距)
>CSS Margin(外边距)属性定义元素周围的空间。

<em><b>Margin</b></em>  清除周围的元素（外边框）的区域。margin没有背景颜色，是完全透明的。可以单独改变元素的上，下，左，右边距。也可以一次改变所有的属性。
##### <em>可能的值</em>
值|说明
-|-
auto|设置浏览器边距。这样做的结果会依赖于浏览器
length|定义一个固定的margin（使用像素，pt，em等）
%|定义一个使用百分比的边距

##### <em>所有的CSS边距属性</em>

属性|描述
-|-
margin|简写属性。在一个声明中设置所有外边距属性。（顺序：上右下左）
margin-bottom|设置元素的下外边距。
margin-left|设置元素的左外边距。
margin-right|设置元素的右外边距。
margin-top|设置元素的上外边距。

### CSS Padding（填充）
<em><b>Padding（填充）</b></em>   当元素的 Padding（填充）（内边距）被清除时，所"释放"的区域将会受到元素背景颜色的填充。
>单独使用填充属性可以改变上下左右的填充。缩写填充属性也可以使用，一旦改变一切都改变。

<em><b>可能的值</b></em>

值|说明
-|-
length |定义一个固定的填充(像素, pt, em,等)
% |使用百分比值定义一个填充
<em><b>所有的CSS填充属性</b></em>

属性|说明
-|-
padding|使用缩写属性设置在一个声明中的所有填充属性（顺序：上右下左）
padding-bottom|设置元素的底部填充
padding-left|设置元素的左部填充
padding-right|设置元素的右部填充
padding-top|设置元素的顶部填充


content高度和宽度的设置
width：长度/%/auto
max-width mim-width在ie5以下版本不兼容，
max-height、min-height也是