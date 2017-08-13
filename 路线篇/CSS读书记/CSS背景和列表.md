#CSS背景和列表
## CSS背景样式
|背景样式|说明|
|-|-|
|background-color| 设置元素的背景颜色。|
|background-image |把图像设置为背景。|
|background-position |设置背景图像的起始位置。|
|background-attachment 背景图像是否固定或者随着页面的其余部分滚动。| 
|background-repeat |设置背景图像是否重复及如何重复。|
|background |简写属性，作用是将背景属性设置在一个声明中|
### 背景颜色
background-color: 颜色｜ transparent

说明
• transparent是全透明黑色(black)的速记法，类似rgba(0,0,0,0)这样的值。
• 颜色值（颜色名｜RGB｜十六进制｜）
• 背景区包括内容、内边距（padding）和边框、不包含外边距（margin）

### 背景图片
background-image : URL｜ none

说明
• url地址可以是相对地址也可以是绝对地址
• 元素的背景占据了元素的全部尺寸，包括内边距和边框，但不包括外边距。
• 默认地，背景图像位于元素的左上角，并在水平和垂直方向上重复。

### 背景图片重复
background-repeat: repeat ｜ no-repeat | repeat-x ｜repeat-y

repeat ：默认值，背景图片水平方向和垂直方向重复

repeat-x：背景图片水平方向重复

repeat-y : 背景图片垂直方向重复

no-repeat : 背景图片不重复

### 背景图片显示方式
background-attachment: scroll ｜fixed

说明：
scroll ：默认值，背景图片随滚动条滚动
fixed ：当页面的其余部分滚动时，背景图片不会移动
### 背景图片定位
background-position : 百分比 ｜值 
top ｜right ｜ bottom ｜ left ｜ center
![](http://i.imgur.com/LwegjxU.png)

![](http://i.imgur.com/oWFUfcb.png)


### 背景缩写
background：[background-color] [background-image]
[background-repeat]
[background-attachment]
[background-position] []
说明
• 各值之间用空格分割 ，不分先后顺序

## CSS列表样式
|列表样式|说明|
|-|-|
|list-style-type |设置列表项标志的类型。|
|list-style-image| 将图像设置为列表项标志。|
|list-style-position |设置列表中列表项标志的位置。|
|list-style |简写属性,用于把所有列表的属性设置于一个声明中。|

### 列表项标记
list-style-type : 关键字 ｜none
![](http://i.imgur.com/5sjZ8H8.png)

### 列表项标记图像
list-style-image : URL ｜none
使用图片设置列表项的标记
### 列表项标记位置
list-style-position : inside ｜outside
设置列表项标记的位置
inside :列表项目标记放置在文本以内，且环绕文本根据标记对齐
outside :默认值，列表项目标记放置在文本以外，且环绕文本不根据标记对齐
### 列表样式缩写
list-style : list-style-type
list-style-position
list-style-image
说明
• 值之间用空格分隔割
• 顺序不固定
• list-style-image 会覆盖 list-style-type的设置

