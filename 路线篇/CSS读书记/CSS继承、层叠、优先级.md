# css继承、层叠、优先级
## 继承的好处：
1.父元素设置样式，子元素可以继承部分属性
2.减少css代码
*兼容性问题：*在IE6及以下版本，table没有继承父元素定义的样式
用群组选择器解决。
div,table,td,tr{font-size: 12px;}
当子元素有默认的样式，与父元素定义样式冲突时，子元素不会继承父元素定义的样式
![](http://i.imgur.com/aErih04.png)
![](http://i.imgur.com/rtSpCBJ.png)
![](http://i.imgur.com/bA11iVx.png)
也就是说继承是比较弱的，即继承的优先级
## 层叠
![](http://i.imgur.com/XG5DNlp.png)
## 选择器优先级
![](http://i.imgur.com/jLQ7tGa.png)
### 就近原则：适用于选择器优先级和css引入方法优先级
![](http://i.imgur.com/YuI4ZSY.png)
## CSS优先级规则和权值规则
![](http://i.imgur.com/8E1UBgb.png)
![](http://i.imgur.com/Awc9ZM7.png)
![](http://i.imgur.com/WyRhnd8.png)
![](http://i.imgur.com/C4ve5Jf.png)
![](http://i.imgur.com/IG9USdh.png)
## 总结：
![](http://i.imgur.com/6NTBIAA.png)
id权值：100，class权值：10，标签权值 ：1，通配符权值：0
最后一个权值规则主要应用于有ID、class、标签选择器派生出来的后代选择器。
**如果设置的css样式不起作用就要考虑是否优先级的问题。**
##css命名规范
#### CSS样式命名规则
• 采用英文字母、数字以及“-”和“_”命名
• 以小写字母开头，不能以数字和“-”、“_”开头
• 命名形式：单字，连字符，下划线和驼峰
•使用有意义命名
#### 常用的CSS样式命名
1）页面结构
页头：header
页面主体：main
页尾：footer
内容：content/container
容器: container
导航：nav
侧栏：sidebar
栏目：column
页面外围控制：wrapper
左右中：left right center
常用的CSS样式命名
2）导航
导航：nav
主导航：mainnav
子导航：subnav
顶导航：topnav
边导航：sidebar
左导航：leftsidebar
右导航：rightsidebar
菜单：menu
子菜单：submenu
标题: title
摘要: summary
常用的CSS样式命名
3)功能
标志：logo
广告：banner
登陆：login
登录条：loginbar
注册：register
搜索：search
功能区：shop
标题：title