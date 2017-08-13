# data-xxx属性的作用

HTML 5增加了一项新功能是自定义数据属性，也就是 data-*自定义属性。
在HTML5中我们可以使用以data-为前缀来设置我们需要的自定义属性，来进行一些数据的存放。
当然高级浏览器下可通过脚本进行定义和数据存取。在项目实践中非常有用。

    <div id="user" data-uid="12345" data-uname="ifanybug"></div>

## 使用attributes方法存取data-*自定义属性的值非常方便：

    var user = document.getElementById('user');
    var userName = user.getAttribute('data-uname'); // userName = 'ifanybug'
    var userId = user.getAttribute('data-uid'); // userId = '12345'
                                                                                                                                                                              
## 使用setAttribute设置 data- 属性

    user.setAttribute('data-site', 'http://www.ifanybug.com');


此方法能在所有的现代浏览器中正常工作，但它不是HTML 5 的自定义 data-* 属性被使用目的，
不然和我们以前使用的自定义属性就没有什么区别了，例如：

    <div id="user" uid="12345" uname="ifanybug"></div>
    <script>
    // 使用getAttribute获取 data- 属性
    var user = document.getElementById('user');
    var userName = user.getAttribute('uname'); // userName = 'ifanybug'
    var userId = user.getAttribute('uid'); // userId = '12345'
    // 使用setAttribute设置 data- 属性
    user.setAttribute('site', 'http://www.ifanybug.com');
    </script>

`这种“原始”的自定义属性和上面data-*自定义属性没什么区别，只是属性名不一样。`

## dataset属性存取`data-*`自定义属性的值
这种方式通过访问一个元素的`dataset属性`来存取`data-*`自定义属性的值。

    这个dataset属性是HTML5 JavaScript API的一部分，
    用来返回一个所有选择元素data-属性的DOMStringMap对象。

## 和attributes方法比较：

    data-*主要是对自定义属性做了标准化；
    循环取值的时候dataset属性比较方便，还有不是问题的问题就是自定义的attribute也不符合html规范（欢迎留言补充）。
    
    使用这种方法时，不是使用完整的属性名，如data-uid来存取数据，应该去掉data-前缀。
    还有一点特别注意的是：data-属性名如果包含了连字符，例如：data-date-of-birth，连字符将被去掉，
    并转换为驼峰式的命名，前面的属性名转换后应该是：dateOfBirth。


    <script type="text/javascript">
        var el = document.querySelector('#user');
        console.log(el.id); // 'user'
        console.log(el.dataset);//一个DOMStringMap
        console.log(el.dataset.id); // '1234567890'
        console.log(el.dataset.name); // 'ifanybug'
        console.log(el.dataset.dateOfBirth); // ''
        el.dataset.dateOfBirth = '1985-01-05'; // 设置data-date-of-birth的值.
        console.log('someDataAttr' in el.dataset);//false
        el.dataset.someDataAttr = 'mydata';
        console.log('someDataAttr' in el.dataset);//true
    </script>


如果你想删掉一个data-属性，可以这么做：

    delete el.dataset.id;
    //或者
    el.dataset.id=null; 。

看起来很美，哈哈，但是不幸的是，新的dataset属性只有在Chrome 8+ Firefox(Gecko) 6.0+ 
Internet Explorer 11+ Opera 11.10+ Safari 6+浏览器中实现，
所以在此期间最好用的getAttribute和setAttribute来操作。

## 关于data-属性选择器
    
    在实际开发时，您可能会发现它很有用，你可以根据自定义的data-属性选择相关的元素。
    例如使用querySelectorAll选择元素：
    
    // 选择所有包含 'data-flowering' 属性的元素
    document.querySelectorAll('[data-flowering]');
    
    // 选择所有包含 'data-text-colour' 属性值为red的元素
    document.querySelectorAll('[data-text-colour="red"]');
    
    同样的我们也可以通过data-属性值对相应的元素设置CSS样式，例如下面这个例子：
    <style type="text/css">
        .user {
            width: 256px;
            height: 200px;
        }
                                                                                                                                 
        .user[data-name='feiwen'] {
            color: brown
        }
                                                                                                                                 
        .user[data-name='css'] {
            color: red
        }
    </style>
    <div class="user" data-id="123" data-name="feiwen">1</div>
    <div class="user" data-id="124" data-name="css">ifanybug</div>

## 如果你使用jQuery类库，那么你可以非常愉悦的使用jquery的data()方法存取data-*自定义属性，
方法允许我们在DOM元素上绑定任意类型的数据,避免了循环引用的内存泄漏风险。

主要的方法如下：

    .data( key, value )
    .data( obj )
    .data( key )
    .data()

`从jQuery 1.4.3起， HTML 5 data- 属性 将自动被引用到jQuery的数据对象中。`


例如HTML：

    <div data-role="page" data-last-value="43" data-hidden="true" 
    data-options='{"name":"John"}'></div>
    
    下面的 jQuery代码都是返回 true 的：
    $("div").data("role") === "page";
    $("div").data("lastValue") === 43;
    $("div").data("hidden") === true;
    $("div").data("options").name === "John";

## jquery和html5 API的不同点

    和html5的api不同的是,jQuery会尝试将字符串转换为一个JavaScript值（包括布尔值（booleans），
    数字（numbers），对象（objects），数组（arrays）和空（null））。
    如果这样做不会改变数值的表示，那么该值将转换为一个数字（number）。
    
    例如，“1E02”和“100.000”是等同于数字（数字值100），但将转换它们会改变他们的表示，所以他们被保留为字符串。
    字符串值“100”被转换为数字100。
    
    如果数据(data)属性是一个对象（以“{”开始）或数组（以’[‘开始），可以用jQuery.parseJSON 将其解析成字符串；
    它必须遵循有效的JSON的语法，包括带双引号的属性名称。如果该值不能解析为一个JavaScript值，它将被保留为字符串。
    
    如果不想将取出的属性值直接当作字符串的话，请使用attr()方法。
    
    data-属性是在第一次使用这个数据属性后不再存取或改变（所有的数据值都在jQuery内部存储）。
    
    调用 .data() 时如果不带参数，将会以 JavaScript 对象的形式获取所有数据。
    这个对象可以安全的存放在变量中，
    因为一旦这个新对象被提取出来，之后对元素进行的 .data(obj)操作，将不会再影响这个对象。
    
    另外，直接操作这个对象会比每次调用 .data() 来设置或获取值要快一些。