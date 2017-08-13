# jsonp的原理和缺点

    JavaScript是一种在Web开发中经常使用的前端动态脚本技术。
    在JavaScript中，有一个很重要的安全性限制，被称为“Same-Origin Policy”（同源策略）。
    这一策略对于JavaScript代码能够访问的页面内容做了很重要的限制，
    即JavaScript只能访问与包含它的文档在同一域下的内容。 

    JavaScript这个安全策略在进行多iframe或多窗口编程、以及Ajax编程时显得尤为重要。
    根据这个策略，在baidu.com下的页面中包含的JavaScript代码，不能访问在google.com域名下的页面内容；
    甚至不同的子域名之间的页面也不能通过JavaScript代码互相访问。

    对于Ajax的影响在于，通过XMLHttpRequest实现的Ajax请求，不能向不同的域提交请求，
    例如，在abc.example.com下的页面，不能向def.example.com提交Ajax请求，等等。 
    
    然而，当进行一些比较深入的前端编程的时候，不可避免地需要进行跨域操作，这时候“同源策略”就显得过于苛刻。
    JSONP跨域GET请求是一个常用的解决方案，下面我们来看一下JSONP跨域是如何实现的，并且探讨下JSONP跨域的原理。 

## 原理
利用在页面中创建<script>节点的方法向不同域提交HTTP请求的方法称为JSONP，这项技术可以解决跨域提交Ajax请求的问题。
JSONP的工作原理如下所述： 

假设在http://example1.com/index.php这个页面中向http://example2.com/getinfo.php提交GET请求，
我们可以将下面的JavaScript代码放在http://example1.com/index.php这个页面中来实现： 

代码如下:

    var eleScript= document.createElement("script"); 
    eleScript.type = "text/javascript"; 
    eleScript.src = "http://example2.com/getinfo.php"; 
    document.getElementsByTagName("HEAD")[0].appendChild(eleScript); 

    当GET请求从http://example2.com/getinfo.php返回时，可以返回一段JavaScript代码，这段代码会自动执行，
    可以用来负责调用http://example1.com/index.php页面中的一个callback函数。 

    JSONP的优点是：它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制；
    它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；
    并且在请求完毕后可以通过调用callback的方式回传结果。 
    
    JSONP的缺点则是：它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，
    不能解决不同域的两个页面之间如何进行JavaScript调用的问题。 

再来一个例子： 
代码如下:

    var qsData = {'searchWord':$("#searchWord").attr("value"),'currentUserId': 
    $("#currentUserId").attr("value"),'conditionBean.pageSize':$("#pageSize").attr("value")}; 
    $.ajax({ 
        async:false, 
        url: http://跨域的dns/document!searchJSONResult.action, 
        type: "GET", 
        dataType: 'jsonp', 
        jsonp: 'jsoncallback', 
        data: qsData, 
        timeout: 5000, 
        beforeSend: function(){ 
        //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了 
    }, 
    success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数 
        if(json.actionErrors.length!=0){ 
        alert(json.actionErrors); 
    } 
    genDynamicContent(qsData,type,json); 
    }, 
    complete: function(XMLHttpRequest, textStatus){ 
        $.unblockUI({ fadeOut: 10 }); 
    }, 
    error: function(xhr){ 
        //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了 
        //请求出错处理 
        alert("请求出错(请检查相关度网络状况.)"); 
    } 
    }); 
    有时也会看到这样的写法： 
    $.getJSON("http://跨域的dns/document!searchJSONResult.action?name1="+value1+"&jsoncallback=?", 
    function(json){ 
        if(json.属性名==值){ 
        // 执行代码 
        } 
    }); 
    
    这种方式其实是上例$.ajax({..}) api的一种高级封装，有些$.ajax api底层的参数就被封装而不可见了。 
    这样，jquery就会拼装成如下的url get请求： 
    代码如下:
    http://跨域的dns/document!searchJSONResult.action?&jsoncallback=jsonp1236827957501&_=1236828192549
    &searchWord= %E7%94%A8%E4%BE%8B¤tUserId=5351&conditionBean.pageSize=15 
    
    在响应端(http://跨域的dns/document!searchJSONResult.action)，
    通过 jsoncallback = request.getParameter("jsoncallback") 得到jquery端随后要回调的
    js function name:jsonp1236827957501 然后 response的内容为一个
    Script Tags:"jsonp1236827957501("+按请求参数生成的json数组+")"; 
    jquery就会通过回调方法动态加载调用这个js tag:jsonp1236827957501(json数组); 
    这样就达到了跨域数据交换的目的。 

## JSONP原理 

    JSONP的最基本的原理是：动态添加一个<script>标签，而script标签的src属性是没有跨域的限制的。
    这样说来，这种跨域方式其实与ajax XmlHttpRequest协议无关了。 
    这样其实"jQuery AJAX跨域问题"就成了个伪命题，jquery $.ajax方法名有误导人之嫌。 
    如果设为dataType: 'jsonp'，这个$.ajax方法就和ajax XmlHttpRequest没什么关系了，取而代之的则是JSONP协议。
    JSONP是一个非官方的协议，它允许在服务器端集成Script tags返回至客户端，通过javascript callback的形式实现跨域访问。 
    
    JSONP即JSON with Padding。由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源。
    如果要进行跨域请求， 我们可以通过使用html的script标记来进行跨域请求，并在响应中返回要执行的script代码，
    其中可以直接使用JSON传递javascript对象。 这种跨域的通讯方式称为JSONP。 
    
    jsonCallback 函数jsonp1236827957501(....)：是浏览器客户端注册的，获取跨域服务器上的json数据后，回调的函数 
    
    Jsonp的执行过程如下： 
    首先在客户端注册一个callback (如:'jsoncallback'), 然后把callback的名字(如:jsonp1236827957501)传给服务器。
    注意：服务端得到callback的数值后，要用jsonp1236827957501(......)把将要输出的json内容包括起来，
    此时，服务器生成 json 数据才能被客户端正确接收。 
    
    然后以 javascript 语法的方式，生成一个function， function 名字就是传递上来的参数 
    'jsoncallback'的值 jsonp1236827957501 . 
    最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。 
    
    客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时javascript文档数据，作为参数， 
    传入到了客户端预先定义好的 callback 函数(如上例中jquery $.ajax()方法封装的的success: function (json))里。
    可以说jsonp的方式原理上和<script src="http://跨域/...xx.js"></script>是一致的
    (qq空间就是大量采用这种方式来实现跨域数据交换的)。
    JSONP是一种脚本注入(Script Injection)行为，所以有一定的安全隐患。 
    
    那jquery为什么不支持post方式跨域呢？ 
    虽然采用post+动态生成iframe是可以达到post跨域的目的(有位js牛人就是这样把jquery1.2.5 打patch的)，
    但这样做是一个比较极端的方式，不建议采用。 
    也可以说get方式的跨域是合法的，post方式从安全角度上，被认为是不合法的，万不得已还是不要剑走偏锋。 
    
    client端跨域访问的需求看来也引起w3c的注意了，看资料说html5 WebSocket标准支持跨域的数据交换，
    应该也是一个将来可选的跨域数据交换的解决方案。 
    
    来个超简单的例子： 
    复制代码 代码如下:
    
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
    <html xmlns="http://www.w3.org/1999/xhtml" > 
    <head> 
    <title>Test Jsonp</title> 
    <script type="text/javascript"> 
    function jsonpCallback(result) 
    { 
    alert(result.msg); 
    } 
    </script> 
    <script type="text/javascript" src="http://crossdomain.com/jsonServerResponse?jsonp=jsonpCallback"></script> 
    </head> 
    <body> 
    </body> 
    </html> 
    
    其中 jsonCallback 是客户端注册的，获取跨域服务器上的json数据后，回调的函数。
    http://crossdomain.com/jsonServerResponse?jsonp=jsonpCallback 这个 url 是跨域服务器取 
    json 数据的接口，参数为回调函数的名字，返回的格式为：jsonpCallback({msg:'this is json data'}) 
    
    简述原理与过程：首先在客户端注册一个callback, 然后把callback的名字传给服务器。
    此时，服务器先生成 json 数据。 然后以 javascript 语法的方式，生成一个function , 
    function 名字就是传递上来的参数 jsonp。最后将 json 数据直接以入参的方式，放置到 function 中，
    这样就生成了一段 js 语法的文档，返回给客户端。 
    
    客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时数据作为参数，
    传入到了客户端预先定义好的 callback 函数里。（动态执行回调函数）