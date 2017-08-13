# CSS高效编写方法
>相信几乎所有的程序员对HTML和CSS并不陌生，但是你真的了解它的编写方法和规范吗？本文将和大家一起探讨CSS出色编写方法。


## 1.层级书写

位置属性：position、top、left、bottom、right、display、float等。

盒子模型相关属性：width、height、padding、margin、border等。

字体颜色排版属性：font、text-align、line-height等。

视觉背景边框等属性：background、transition、animation、transform等。

这里说一下这样写的原因，把位置属性写在最前是为了让我们更好的去发现css中出现的repaint（重绘）和reflow（回流），因为重绘和回流会影响页面的加载，也就是影响网站性能。我们这样写可以及时发现不必要的位置属性，并将其剔除，从而减少页面的重绘和回流。盒模型排第2位，因为他决定了组件的尺寸和位置，其他属性只会影响内部不会影响组件外部样式，故放在最后。
![](http://upload-images.jianshu.io/upload_images/1291361-30ec87a745e704e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 2.代码缩写(shorthand)

如margin、padding、border、background、animate、transition等，可提高阅读体验，并且也提高了编码速度。

a.去掉0.8em前的“0”。

b.去掉0px后的“px”。

c.16进制颜色尽可能使用3个字符，譬如#dddddd，改为#ddd。

d.16进制值应该全部小写，如#fff；在扫描文档时，小写字符易于分辨。
![](http://upload-images.jianshu.io/upload_images/1291361-0e0a231916e093f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 3.根据项目需求使用相应的reset

相信现在已经很少人用*{margin:0;padding:0;}这种通用选择器进行全局重置了，因为它影响性能，我们更多人采用的是阿里的reset。虽然它很不多，但是对于不同的项目而已，有的重置是不需要的，所以没必要全部写进去，要看实际需求。这是一个reset.css的链接http://www.cssreset.com/，感兴趣的可以看一下。

## 4.利用css选择器，合理使用继承
a.如果父元素的多个子元素有相同的样式，无疑把样式定义在父元素上最佳。

b.对于没有所属关系的平级元素，如果有很多相同的样式，我们可以选择使用群组选择器，进行合并，类似于reset。
## 5.必要的代码注释

相信很多朋友跟我一样，不愿意看别人写的代码，其实也不是自己不愿意，而是有些“前辈们”写的样式太不知所云，导致看起来头疼，还不如自己重写，所以必要的注释还是可以有的；但请注意，我这里说的是必要的注释，而不是要多写注释。最好按照功能的类别来对一组样式表写统一注释，独立成行。
![](http://upload-images.jianshu.io/upload_images/1291361-2eecdad30f15c878.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 6.制定命名规范

相信很多人对class的取名很苦恼，其实我也是，不过以前老师说过一句话很好：“如果你不知道怎么给class命名，那就去看看‘大牛们’的代码吧！”，可以看看bootStrap、jqueryMobile等框架css的命名方式。

以下为几点建议：

a.采用“-”、驼峰命名法

譬如left-count-down、leftCountDown，不要用eftcountdown或者 _leftcountdown（部分浏览器不兼容）进行命名。

b.简写命名

 对于左侧导航“left-navgation”，我们可以简化为“left-nav”，但前提是可以见名知意，如果达不到这种效果的话，那就老老实实写全称。

c.有js操作的class命名

对于进行js操作的class可采用“js-left-container”的方式进行命名。大型项目中最好在ID或class名字前加上这种标识性前缀（命名空间），使用短破折号链接，譬如“”qovd-js-container。因为使用命名空间可以防止命名冲突，方便维护，比如在搜索和替换操作上。

d.必要的时候使用ID选择器

 一般可以使用class代替的，尽量不用ID，原因在于id可以作为变量使用， id更多使用与js操作，不过现在js操作也在淡化id的使用。

e.避免使用标签与ID或class进行组合

非必要的情况下不要使用元素标签名和ID或class进行组合，譬如div.title{margin: 20px;}。同时单个元素，多类选择器最好不超过3个，譬如class=”menu left-content content”。

f.为选择器添加状态前缀

为选择器添加状态前缀,使其语义化，譬如“.show”，改为“.is-show”，对于js操作的元素经常使用到类似的写法，进行元素的显示和隐藏。

g.基于最近父元素class进行子元素命名的前缀

譬如父元素class=”new”，子元素则命名为class=”new-title”，这种习惯看你个人，如果怕看混了，就建议不要用了。

## 7.选择更优的属性值

譬如border:0px浏览器会解析渲染，消耗内存，而border:none，浏览器则不做渲染，不消耗内存。

## 8.尽量不用@import及css表达式

增加HTTP请求次数，影响加载速度，出现从而影响加载速度。替代方法：使用、使用sass或者less将多个css文件编译成一个文件。

是XHTML标签，页面被加载时同步加载；@import只加载css，而且是待css解析器读取到css文件中有@import再去请求服务器下载样式，故有可能出现闪屏（其实就是样式未加载完成）。前者不存在兼容性问题，后者IE5+浏览器才能识别(这个方面基本可以忽略)。前者可使用DOM操作控制，后者无法控制。

## 9.使用外联CSS，尽量少用内联样式

这样做其实也是为了严格保持结构 （标记），表现 （样式），和行为 （脚本）相分离, 并尽量让这三者之间的交互保持最低限度。

## 10.嵌入式资源书写省略协议头

省略图像、媒体文件、样式表和脚本等URL协议头部声明 ( http: , https: )。如果不是这两个声明的URL则不省略。省略协议声明，使URL成相对地址，防止内容混淆问题和导致小文件重复下载。

## 11.其它书写注意事项

a.在属性名冒号结束后加一个空字符。

b.每个选择器和注释都独立成行。

c.注意元素的大小写，所有属性都要用“;”结尾。

d.省略type=“text/css”。

e.统一设置编辑器文字缩进2-4空格。

f .建议一个属性写一行，毕竟代码在上测试前，我们会使用webpack之类的 打包工具进行打包，所以你不用担心占据空间。

g.将媒体查询尽可能放在对应规则附近，如果放的太远，很有可能会被遗忘。

h.为避免不必要的继承，可以为class添加命名空间。

i.组件化、功能块、内容块方式编写css。
![](http://upload-images.jianshu.io/upload_images/1291361-ed0012f657559833.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 12.前缀兼容性书写

必要的css兼容性处理还是很重要的。
![](http://upload-images.jianshu.io/upload_images/1291361-ec076ad41df7e445.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 13.最好避免使用的CSS “hacks”

虽然它很有诱惑力，可以当作用户代理检测或特殊的CSS过滤器，但它的行为太过于频繁，会长期伤害项目的效率和代码管理，所以能用其他的解决方案就找其他的。

## 14.引入less、sass、postcss、stylus等CSS预处理语言

现在基本很少直接写CSS了，都是使用CSS预处理语言，less和sass已经很常见了，大家有时间可以看看postcss。postcss和sass无冲突， postcss不仅具有sass的功能，同时还可以可以对sass处理过后的CSS再处理，而且预处理速度也很快。

最后，附上推荐class命名表。
![](http://upload-images.jianshu.io/upload_images/1291361-46c0fd3a2e7aa0f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

