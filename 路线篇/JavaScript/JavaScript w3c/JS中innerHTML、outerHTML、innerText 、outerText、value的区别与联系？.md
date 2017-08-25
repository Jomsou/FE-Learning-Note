任务一：零基础JavaScript编码（一）
一、JS中innerHTML、outerHTML、innerText 、outerText、value的区别与联系？
jS中设置或者获取所选内容的值：
①innerHTML :属性设置或返回该标签内的HTML。也就是从对象的起始位置到终止位置的全部内容,包括Html标签。
②outerHTML：属性设置或返回该标签及标签内的HTML。也就是从对象的该标签起始到终止位置的全部内容,包括Html标签。
如果要输出不含HTML标签的内容，可以使用innerHTML取得包含HTML标签的内容后，再用正则表达式去除HTML标签，
③inneText：从起始位置到终止位置的内容，但它去除html标签。（只能在IE和chrome下使用）
④outerText 设置(包括标签)或获取(不包括标签)对象的文本 <br><br>
⑤value：属性可设置或返回密码域的默认值。获取文本框的值
二、jQuery中的text()、html()和val()
jQuery中设置或者获取所选内容的值：
①text();设置或者获取所选元素的文本内容；
②html();设置或者获取所选元素的内容（包括html标记）；
③val();设置或者获取表单字段的值（前提是表单设置了value属性）；
首先，html属性中有两个方法，一个有参，一个无参
```
  1. 无参html（）：取得第一个匹配元素的html内容。这个函数不能用于XML文档。但可以用于XHTML文档，返回的是一个String
 例子：
        html页面代码：<div><p>Hello</p></div>
       jquery代码：$("div").html();
      结果：<p>Hello</p>
 2.有参html（val）：设置每一个匹配元素的html内容。这个函数不能用于XML文档。但可以用于XHTML文档。返回一个jquery对象
    html页面代码：<div></div>
    jquery代码：$("div").html("<p>Nice to meet you</p>");
    结果：[ <div><p> Nice to meet you</p></div> ]
```     
其次，text属性中有两个方法，一个有参，一个无参
```
    1. 无参text（）：取得所有匹配元素的内容。结果是由所有匹配元素包含的文本内容组合起来的文本。返回的是一个String
     例子：
        html页面代码：<p><b>Hello</b> fine</p>
                              <p>Thank you!</p>
       jquery代码：$("p").text();
       结果：HellofineThankyou!
     2.有参text（val）：设置所有匹配元素的文本内容,与 html() 类似, 但将编码 HTML (将 "<" 和 ">" 替换成相应的HTML实体).返回一个jquery对象
       html页面代码：<p>Test Paragraph.</p>
      jquery代码：$("p").text("<b>Some</b> new text.");
      结果:[ <p><b>Some</b> new text.</p> ]
```
最后，val（）属性中也有两个方法，一个有参，一个无参。
```
1.无参val（）：获得第一个匹配元素的当前值。在 jQuery 1.2 中,可以返回任意元素的值了。包括select。如果多选，将返回一个数组，其包含所选的值。 返回的是一个String、 array
jquery代码：$("p").append( "<b>Single:</b> " + $("#single").val() + " <b>Multiple:</b> " + $("#multiple").val().join(", "));
结果:[ <p><b>Single:</b>Single<b>Multiple:</b>Multiple, Multiple3</p>]
2.有参val（val）：设置每一个匹配元素的值。在 jQuery 1.2, 这也可以为check,select,radio元件赋值,返回一个jquery对象
html页面代码：<input type="text"/>
jquery代码：$("input").val("hello world!");
结果：hello world!
```