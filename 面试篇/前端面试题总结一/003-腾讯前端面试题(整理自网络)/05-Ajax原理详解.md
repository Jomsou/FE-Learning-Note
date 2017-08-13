# Ajax工作原理
 
       1.使用CSS和XHTML来表示。
       2. 使用DOM模型来交互和动态显示。
       3.使用XMLHttpRequest来和服务器进行异步通信。
       4.使用javascript来绑定和调用。
 
## ajax原理和XmlHttpRequest对象

    Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，
    然后用javascript来操作DOM而更新页面。
    这其中最关键的一步就是从服务器获得请求数据。要清楚这个过程和原理，我们必须对 XMLHttpRequest有所了解。
    
    XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。
    简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户,达到无刷新的效果。

首先，我们先来看看XMLHttpRequest这个对象的属性。

    　　onreadystatechange  每次状态改变所触发事件的事件处理程序。
    　　responseText     从服务器进程返回数据的字符串形式。
    　　responseXML    从服务器进程返回的DOM兼容的文档数据对象。
    　　status           从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）
    　　status Text       伴随状态码的字符串信息
    　　readyState       对象状态值
    　　　　0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
    　　　　1 (初始化) 对象已建立，尚未调用send方法
    　　　　2 (发送数据) send方法已调用，但是当前的状态及http头未知
    　　　　3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText
             获取部分数据会出现错误，
    　　　　4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据
    

但是，由于各浏览器之间存在差异，所以创建一个XMLHttpRequest对象可能需要不同的方法。
这个差异主要体现在IE和其它浏览器之间。
下面是一个比较标准的创建XMLHttpRequest对象的方法。

    function CreateXmlHttp() {
        //非IE浏览器创建XmlHttpRequest对象
        if (window.XmlHttpRequest) {
            xmlhttp = new XmlHttpRequest();
        }
        //IE浏览器创建XmlHttpRequest对象
        if (window.ActiveXObject) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                try {
                    xmlhttp = new ActiveXObject("msxml2.XMLHTTP");
                }
                catch (ex) { }
            }
        }
    }
    
    function ajax() {
        var data = document.getElementById("username").value;
        CreateXmlHttp();
        if (!xmlhttp) {
            alert("创建xmlhttp对象异常！");
            return false;
        }
    
        xmlhttp.open("POST", url, false);
    
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                document.getElementById("user1").innerHTML = "数据正在加载...";
                if (xmlhttp.status == 200) {
                    document.write(xmlhttp.responseText);
                }
            }
        }
        xmlhttp.send();
    }

如上所示，函数首先检查XMLHttpRequest的整体状态并且保证它已经完成（readyStatus=4），即数据已经发送完毕。
然后根据服务器的设定询问请求状态，如果一切已经就绪（status=200），那么就执行下面需要的操作。
对于XmlHttpRequest的两个方法，open和send,其中:

open方法指定了：

    a、向服务器提交数据的类型，即post还是get。
    b、请求的url地址和传递的参数。
    c、传输方式，false为同步，true为异步。默认为true。如果是异步通信方式(true)，客户机就不等待服务器的响应；
    如果是同步方式(false)，客户机就要等到服务器返回消息后才去执行其他操作。我们需要根据实际需要来指定同步方式，
    在某些页面中，可能会发出多个请求，甚至是有组织有计划有队形大规模的高强度的request，而后一个是会覆盖前一个的，
    这个时候当然要指定同步方式。

Send方法用来发送请求。
 
    知道了XMLHttpRequest的工作流程，我们可以看出，XMLHttpRequest是完全用来向服务器发出一个请求的，
    它的作用也局限于此，但它的作用是整个ajax实现的关键，因为ajax无非是两个过程，发出请求和响应请求。
    并且它完全是一种客户端的技术。
    而XMLHttpRequest正是处理了服务器端和客户端通信的问题所以才会如此的重要。
    
    我们可以把服务器端看成一个数据接口，它返回的是一个纯文本流，当然，这个文本流可以是XML格式，可以是Html，
    可以是Javascript代码，也可以只是一个字符串。
    这时候，XMLHttpRequest向服务器端请求这个页面，服务器端将文本的结果写入页面，这和普通的web开发流程是一样的，
    不同的是，客户端在异步获取这个结果后，不是直接显示在页面，而是先由javascript来处理，然后再显示在页面。
    至于现在流行的很多ajax控件，比如magicajax等，可以返回DataSet等其它数据类型，只是将这个过程封装了的结果，
    本质上他们并没有什么太大的区别。
 
## ajax的优点
Ajax的给我们带来的好处大家基本上都深有体会，在这里我只简单的讲几点：

    1、最大的一点是页面无刷新，在页面内与服务器通信，给用户的体验非常好。
    2、使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。
    3、可以把以前一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器和带宽的负担，
       节约空间和宽带租用成本。并且减轻服务器的负担，ajax的原则是“按需取数据”，可以最大程度的减少冗余请求，
       和响应对服务器造成的负担。
    4、基于标准化的并被广泛支持的技术，不需要下载插件或者小程序。

## ajax的缺点
下面所阐述的ajax的缺陷都是它先天所产生的。

    1、ajax干掉了back按钮，即对浏览器后退机制的破坏。
    后退按钮是一个标准的web站点的重要功能，但是它没法和js进行很好的合作。这是ajax所带来的一个比较严重的问题，
    因为用户往往是希望能够通过后退来取消前一次操作的。那么对于这个问题有没有办法？
    答案是肯定的，用过Gmail的知道，Gmail下面采用的ajax技术解决了这个问题，在Gmail下面是可以后退的，
    但是，它也并不能改变ajax的机制，它只是采用的一个比较笨但是有效的办法，即用户单击后退按钮访问历史记录时，
    通过创建或使用一个隐藏的IFRAME来重现页面上的变更。（例如，当用户在Google Maps中单击后退时，
    它在一个隐藏的IFRAME中进行搜索，然后将搜索结果反映到Ajax元素上，以便将应用程序状态恢复到当时的状态。）
    但是，虽然说这个问题是可以解决的，但是它所带来的开发成本是非常高的，和ajax框架所要求的快速开发是相背离的。
    这是ajax所带来的一个非常严重的问题。
    
    2、安全问题。技术同时也对IT企业带来了新的安全威胁，ajax技术就如同对企业数据建立了一个直接通道。
    这使得开发者在不经意间会暴露比以前更多的数据和服务器逻辑。ajax的逻辑可以对客户端的安全扫描技术隐藏起来，
    允许黑客从远端服务器上建立新的攻击。还有ajax也难以避免一些已知的安全弱点，诸如跨站点脚步攻击、
    SQL注入攻击和基于credentials的安全漏洞等。
         
    3、对搜索引擎的支持比较弱。
         
    4、破坏了程序的异常机制。至少从目前看来，像ajax.dll，ajaxpro.dll这些ajax框架是会破坏程序的异常机制的。
         
    5、另外，像其他方面的一些问题，比如说违背了url和资源定位的初衷。
    例如，我给你一个url地址，如果采用了ajax技术，也许你在该url地址下面看到的和我在这个url地址下看到的内容是不同的。
    这个和资源定位的初衷是相背离的。
         
    6、一些手持设备（如手机、PDA等）现在还不能很好的支持ajax，比如说我们在手机的浏览器上打开采用ajax技术的网站时，
    它目前是不支持的，当然，这个问题和我们没太多关系。
 
# 第二篇

## XMLHttpRequest对象

IE7+,FireFox,Chrome,Opera,Safari创建XHR对象

    var xhr=new XMLHttpRequest();

创建XHR对象的兼容性写法
    
     function createXHR(){
             if(typeof XMLHttpRequest!="undefined"){
                 return new XMLHttpRequest();
             }else if(typeof ActiveXObject!="undefined"){
                 if(typeof arguments.callee.activeXString!="string"){
                     var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                         i,len;
                     for(i=0,len=versions.length;i<len;i++){
                         try{
                             new ActiveXObject(versions[i]);
                             arguments.callee.activeXString=versions[i];
                             break;
                         }catch(ex){
         
                         }
                     }
                 }
                 return new ActiveXObject(arguments.callee.activeXString);
             }else{
                 throw new Error("NO XHR object available");
             }
         }
         
         var xhr=new createXHR();

## XHR用法

### 1. 发送同步请求

使用 XHR 时，首先要调用 `open()` 方法，传递三个参数：

    1. 要发送的请求类型（ get , post 等）
    2. 请求的 url
    3. 是否异步发送

要发送特定的请求，必需像下面这样调用 `send()` 方法

    xhr.open("get","example.php",false);
    xhr.send(null);

这里 `send()` 方法接收一个参数，作为请求主体发送的数据。
`如果不需要通过请求主体发送数据，这里必须传入 null` ，因为这个参数对有些浏览器来说是必需的。
调用 send() 之后，请求就会被分派到服务器。
由于这次请求是同步的，JavaScript 代码会等到服务器响应之后再继续执行。
在收到响应之后，相应的数据会自动填充XHR对象的属性，相关的属性简介如下：

    responseText: 作为响应主体被返回的文本。
    responseXML: 如果响应的内容类型是 “text/xml”或”application/xml”，
                 这个属性中将保存包含着相应数据的XML DOM文档。
    status: 响应的HTTP状态。
    statusText: HTTP状态的说明。

接受响应之后，第一步是检查 status 属性，以确定响应已经成功返回。状态码：

    200 表示成功
    304 表示请求的资源并没有修改，可以直接使用浏览器中缓存的版本，响应也是有效的

像下面这样检查上述这两种状态码的状态：

     xhr.open("get","example.txt",false);
     xhr.send(null);
     if((xhr.status >= 200 && xhr.status < 300)|| xhr.status == 304){
         alert(xhr.responseText);
     }else{
         alert("Request was unsuccessful: " + xhr.status);
     } 
 
注意：无论内容类型是什么，响应主体的内容都会保存到 responseText 属性中；
而对于非 XML 数据而言， responseXML 属性的值将为 null。

### 2. 发送异步请求

向前面这样发送同步请求当然没问题，但多数情况下，我们还是要发送异步请求，才能让 JavaScript 继续执行而不必等待响应。
此时，可以检测 XHR 对象的 `readyState 属性`，该属性表示请求/响应过程中的当前活动阶段。

这个属性可取的值如下：
    
    0：未初始化。尚未调用 open() 方法。
    1：启动。已经调用 open() 方法，但尚未调用 send() 方法。
    2：发送。已经调用 send() 方法，但尚未接收响应。
    3：接收。已经接收到部分响应数据。
    4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

只要 readyState 属性的值由一个值变为另一个值，都会触发一次 `readystatechange 事件`。
可以利用这个事件来检测每次状态变化后的 readyState 的值，通常，我们只对 readyState 值为 4 的阶段感兴趣，
因为这时所有的数据都已经就绪。
不过，必须在调用 open() 之前指定 onreadyState 事件处理程序才能确保跨浏览器兼容性。

例子如下：

     var xhr = createXHR();
     xhr.onreadyStatechange = function(){
         if(xhr.readyState == 4){
             if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                 alert(xhr.responseText);
             }else{
                 alert("Request was unsuccessful:" + xhr.status );
             }
         }
     };
     xhr.open("get","example.txt",true);
     xhr.send(null);

另外，在接收到响应之前还可以调用 `abort()` 方法来取消异步请求，如下所示：

    xhr.abort();

调用这个方法后，XHR 对象会停止触发事件，而且也不再允许访问任何与响应有关的对象属性。

## HTTP头部信息
每个 HTTP 请求和响应都会带有响应的头部信息，有的对开发人员有用，有的也没有什么用，
XHR 对象也提供了操作这两种头部（即请求头部和响应头部）信息的方法。
默认情况下，在发送 XHR 请求的同事，还会发送下列头部信息。

    Accept: 浏览器能够处理的内容类型。
    Accept-Charset: 浏览器能够显示的字符集。
    Accept-Encoding: 浏览器能够处理的压缩编码。
    Accept-Language: 浏览器当前设置的语言。
    Connection: 浏览器与服务器之间连接的类型。
    Cookie: 当前页面设置的语言。
    Host: 发出请求的页面所在的域。
    Referer: 发出请求的页面的URI。
    User-Agent: 浏览器的用户代理字符串。

使用 `setRequestHeader()` 方法可以设置自定义的请求头部信息。
这个方法接受两个参数：头部字段的名称和头部字段的值。
`要成功发送请求头部信息，必须在调用 open() 方法之后且调用 send() 方法之前调用 setRequestHeader()`,
如下面的例子所示。

     var xhr = createXHR();
     xhr.onreadystatechange = function(){
         if(xhr.readyState == 4){
             if((xhr.status >= 200 && xhr.status < 300) || xhr.status = 304){
                 alert(xhr.responseText);
             }else{
                 alert("Request was unsuccessful: " + xhr.status);
             }
         }
     };
     xhr.open("get","example.php",true);
     xhr.setRequestHeader("MyHeader","MyValue");
     xhr.send(null); 

服务器在接收到这种自定义的头部信息之后，可移植性响应的后续操作。
建议使用自定义的头部字段名称，不要使用浏览器正常发送的字段名称。

调用 XHR 对象的 `getResponseHeader()` 方法并传入头部字段名称，可以取得相应的响应头部信息。
而调用 `getAllResponseHeaders()` 方法可以取得一个包含所有头部信息的长字符串。看下面的例子：

    var myHeader=xhr.getResponseHeader("MyHeader");
    var allHeader=xhr.getAllResponseHeaders();

## GET请求

GET 是最常见的请求类型，最常用于向服务器查询某些信息。
必要时，可以讲查询字符串参数追加到 URL 的末尾，以便将信息发送给服务器。
对 XHR 而言，位于传入 open() 方法的 URL 末尾的查询字符串必须经过正确的编码才行。
使用 GET 请求经常会发生的一个错误，及时查询字符串的格式有问题。
查询字符串中每个参数的名称和值必须使用 `encodeURIComponent()` 进行编码，然后才能放到 URL 的末尾；
而且所有名-值对都必须由`和号(&)`分隔，例子如下：

    xhr.open("get","example.php?name1=value1&name2=value2",true);

下面这个函数可以辅助向现有 URL 的末尾添加查询字符串参数：

    function addURLParam(url,name,value){
        url += (url.indexOf("?") == -1? "?":"&");
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);

使用方法：

    var url="example.php";
    
    //添加参数
    url = addURLParam(url,"name","Nocholas");
    url = addRULParam(rul,"book","Professional JavaScript");
    
    //初始化请求
    xhr.open("get",url,false);

## POST请求
POST 请求通常用于向服务器发送应该被保存的数据。POST 请求应该吧数据作为请求的主体提交，
而 GET 请求传统上不是这样。
默认情况下，服务器对 POST 请求和提交 Web 表单的请求并不会一视同仁。
因此，服务器端必须有程序来读取发送过来的原始数据，并从中解析出有用的部分。
不过，我们可以使用 XHR 来模仿表单提交：

首先将 Content-Type 头部信息设置为 application/x-www-from-urlencoded,也就是表单提交时的内容类型，
其次是以适当的格式创建一个字符串。

如下所示：

     function submitData(){
         var xhr = createXHR();
         xhr.onreadystatechange = function(){
             if(xhr.readyState == 4){
                 if((xhr.status >= 200 && xhr.status < 300) || xhr.status = 304){
                     alert(xhr.responseText);
                 }else{
                     alert("Request was unsuccessful: " + xhr.status);
                 }
             }
         };
         xhr.open("post","example.php",true);
         xhr.setRequestHeader("Content-Type","application/x-www-from-urlencoded");
         var form=document.getElementById("user-info");
         xhr.send(serialize(form));
     } 

这个函数可以将 ID 为 “user-info” 的表单中的数据序列化之后发送给服务器。

## XMLHttpRequest2级
XMLHttpRequest 1级只是把已有的 XHR 对象的实现细节描述了出来。
而 XMLHttpRequest2级则进一步发展了 XHR。
`并非所有浏览器都完整地实现了 XMLHttpRequest2级规范。`

## FormData
现代 Web 应用中频繁使用的一项功能就是表单数据的序列化，XMLHttpRequest2级为此定义了 FormData 类型。
FormData 为序列化表单以及创建与表单格式相同的数据提供了便利。
下面代码创建了 FormData 对象，并向其中添加了一些数据。
    
    var data = new FormData();
    data.append("name","Nicholas");

这个 append() 方法接受两个参数：键和值，分别对应表单字段的名字和字段中包含的值。可以像这样添加任意多的键值对。
而通过向 FormData 构造函数中传入表单元素，也可以用表单元素的数据预先向其中填入键值对：

    var data=new FormData(document.forms[0]);

创建了 FormData 的实例后，可以将它直接传给 XHR 的 `send()` 方法，如下所示：

     function submitData(){
         var xhr = createXHR();
         xhr.onreadystatechange = function(){
             if(xhr.readyState == 4){
                 if((xhr.status >= 200 && xhr.status < 300) || xhr.status = 304){
                     alert(xhr.responseText);
                 }else{
                     alert("Request was unsuccessful: " + xhr.status);
                 }
             }
         };
         xhr.open("post","example.php",true);
         var form=document.getElementById("user-info");
         xhr.send(new FormData(form));
     } 

使用 FormData 的方便之处在于不必明确地在 XHR 对象上设置请求头部。
XHR 对象能够识别传入的数据类型是 FormData 的实例，并配置适当的头部信息。
支持 FormData 的浏览器有 Firefox4+，Safari5+，Chrome和Android3+版WebKit。
