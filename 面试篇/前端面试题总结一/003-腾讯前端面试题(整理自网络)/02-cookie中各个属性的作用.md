# cookie中domain,path,secure,httpOnly等属性的作用

cookie的基本通信流程：

    设置cookie => cookie被自动添加到request header中 => 服务端接收到cookie。

这个流程中有几个问题需要好好研究：

    1. 什么样的数据适合放在cookie中？
    2. cookie是怎么设置的？
    3. cookie为什么会自动加到request header中？
    4. cookie怎么增删查改？


## cookie 是怎么工作的？

    首先必须明确一点，存储cookie是浏览器提供的功能。
    cookie 其实是存储在浏览器中的纯文本，浏览器的安装目录下会专门有一个 cookie 文件夹来存放各个域下设置的cookie。
    
    当网页要发http请求时，浏览器会先检查是否有相应的cookie，有则自动添加在request header中的cookie字段中。
    这些是浏览器自动帮我们做的，而且每一次http请求浏览器都会自动帮我们做。
    这个特点很重要，因为这关系到“什么样的数据适合存储在cookie中”。
    
    存储在cookie中的数据，每次都会被浏览器自动放在http请求中，如果这些数据并不是每个请求都需要发给服务端的数据，
    浏览器这设置自动处理无疑增加了网络开销；
    
    但如果这些数据是每个请求都需要发给服务端的数据（比如身份认证信息），浏览器这设置自动处理就大大免去了重复添加操作。
    所以对于那设置“每次请求都要携带的信息（最典型的就是身份认证信息）”就特别适合放在cookie中，其他类型的数据就不适合了。
    
    但在 localStorage 出现之前，cookie被滥用当做了存储工具。
    什么数据都放在cookie中，即使这些数据只在页面中使用而不需要随请求传送到服务端。
    当然cookie标准还是做了一些限制的：每个域名下的cookie 的大小最大为4KB，每个域名下的cookie数量最多为20个
    （但很多浏览器厂商在具体实现时支持大于20个）。


## cookie 的格式

### document.cookie
JS 原生的 API提供了获取cookie的方法：`document.cookie（注意，这个方法只能获取非 HttpOnly 类型的cookie）`。
在 console 中执行这段代码可以看到结果如下：

    "gr_user_id=dec3033e-eabf-4227-91d2-c2086c9bb696; _gat=1; activate_count=34;
     _ga=GA1.2.74101496.1460964346; Hm_lvt_e23800c454aa573c0ccb16b52665ac26=1469061503,1469081122,
     1469084208,1469084424; Hm_lpvt_e23800c454aa573c0ccb16b52665ac26=1469084458; 
     showRegister2=true; gr_session_id_5411b7ab1ae040ed9a4eb4a120a06ead=3ea1afd0-3a5d-
     42b3-8ea2-341afeee8552; showRegister=false"

打印出的结果是一个字符串类型，因为cookie本身就是存储在浏览器中的字符串。
但这个字符串是有格式的，由键值对 key=value构成，键值对之间由一个分号和一个空格隔开。

### cookie 的属性选项
每个cookie都有一定的属性，如什么时候失效，要发送到哪个域名，哪个路径等等。
这些属性是通过cookie选项来设置的，cookie选项包括：`expires、domain、path、secure、HttpOnly`。
在设置任一个cookie时都可以设置相关的这些属性，当然也可以不设置，这时会使用这些属性的默认值。
在设置这些属性时，属性之间由一个分号和一个空格隔开。代码示例如下：

    "key=name; expires=Thu, 25 Feb 2016 04:18:00 GMT; domain=ppsc.sankuai.com; 
    path=/; secure; HttpOnly"

### expires
expires选项用来设置“cookie 什么时间内有效”。

    expires其实是cookie失效日期，expires必须是 GMT 格式的时间（可以通过 new Date().toGMTString()
    或者 new Date().toUTCString() 来获得）。
    
    如expires=Thu, 25 Feb 2016 04:18:00 GMT表示cookie讲在2016年2月25日4:18分之后失效，
    对于失效的cookie浏览器会清空。
    如果没有设置该选项，则默认有效期为session，即会话cookie。
    这种cookie在浏览器关闭后就没有了。
    
    expires 是 http/1.0协议中的选项，在新的http/1.1协议中expires已经由 max-age 选项代替，
    两者的作用都是限制cookie 的有效时间。expires的值是一个时间点（cookie失效时刻= expires），
    而max-age 的值是一个以秒为单位时间段（cookie失效时刻= 创建时刻+ max-age）。

### domain 和 path
`domain选项用来设置cookie该发到哪个域名，path选项用来设置cookie该发往哪个路径。`

    如某个 cookie 设置为domain=ppsc.sankuai.com; path=/pub; 
    表示：若请求的地址域名是“ppsc.sankuai.com”，路径是“/pub”或“/pub下的任一子目录”如/pub/example、
    /pub/example/doc时，浏览器才会将这个cookie自动添加到请求头部中。
    比如请求地址为http://ppsc.sankuai.com/pub时，该cookie会被发送，
    但请求地址为http://ppsc.sankuai.com/时，该cookie不会被发送。
    
    如某个 cookie 设置为domain=sankuai.com; path=/; 
    表示：若请求的地址域名是“sankuai.com”或其子域如“ ppsc.sankuai.com”、“dx.ppsc.sankuai.com”等，
    路径是“/”或其下的任一子目录如/pub/example、/pub/example/doc时，浏览器才会将这个cookie自动添加到请求头部中。

所以domain和path2个选项共同决定了cookie何时被浏览器自动添加到请求头部中发送出去。
如果没有设置这两个选项，则会使用默认值。
`domain的默认值为设置该cookie的网页所在的域名，path默认值为设置该cookie的网页所在的目录。`

### secure
secure选项用来设置cookie只在确保安全的请求中才会发送。

    当请求是HTTPS或者其他安全协议时，包含 secure 选项的 cookie 才能被发送至服务器。
    
    默认情况下，cookie不会带secure选项(即为空)。
    所以默认情况下，不管是HTTPS协议还是HTTP协议的请求，cookie 都会被发送至服务端。
    但要注意一点，secure选项只是限定了在安全情况下才可以传输给服务端，但并不代表你不能看到这个 cookie。
    
    下面我们设置一个 secure类型的 cookie：
    
    document.cookie = "name=huang; secure";
    之后你就能在控制台中看到这个 cookie 了

这里有个坑需要注意下：

    如果想在客户端即网页中通过 js 去设置secure类型的 cookie，必须保证网页是https协议的。
    在http协议的网页中是无法设置secure类型cookie的。

### httpOnly
`这个选项用来设置cookie是否能通过 js 去访问。`
    
    默认情况下，cookie不会带httpOnly选项(即为空)，所以默认情况下，
    客户端是可以通过js代码去访问（包括读取、修改、删除等）这个cookie的。
    当cookie带httpOnly选项时，客户端则无法通过js代码去访问（包括读取、修改、删除等）这个cookie。
    
    在客户端是不能通过js代码去设置一个httpOnly类型的cookie的，这种类型的cookie只能通过服务端来设置。

那我们在页面中怎么知道哪些cookie是httpOnly类型的呢？在浏览器的console下查看：

    凡是httpOnly类型的cookie，其 HTTP 一列都会打上√。
    你通过document.cookie是不能获取的，也不能修改PA_VTIME的。

### httpOnly与安全

为什么我们要限制客户端去访问cookie？`这样做是为了保障安全`。

    试想：如果任何 cookie 都能被客户端通过document.cookie获取会发生什么可怕的事情。
    当我们的网页遭受了 XSS 攻击，有一段恶意的script脚本插到了网页中。
    这段script脚本做的事情是：通过document.cookie读取了用户身份验证相关的 cookie，
    并将这些 cookie 发送到了攻击者的服务器。攻击者轻而易举就拿到了用户身份验证信息，
    于是就可以摇摇大摆地冒充此用户访问你的服务器了（因为攻击者有合法的用户身份验证信息，所以会通过你服务器的验证）。

### 如何设置 cookie？
知道了cookie的格式，cookie的属性选项，接下来我们就可以设置cookie了。
首先得明确一点：`cookie既可以由服务端来设置，也可以由客户端来设置`。

#### 1. 服务端设置 cookie

    不管你是请求一个资源文件（如 html/js/css/图片），还是发送一个ajax请求，服务端都会返回response。
    而response header中有一项叫set-cookie，是服务端专门用来设置cookie的。
    如下图所示，服务端返回的response header中有5个set-cookie字段，
    每个字段对应一个cookie（注意不能将多个cookie放在一个set-cookie字段中），
    set-cookie字段的值就是普通的字符串，每个cookie还设置了相关属性选项。

注意：

    一个set-Cookie字段只能设置一个cookie，当你要想设置多个 cookie，需要添加同样多的set-Cookie字段。
    服务端可以设置cookie 的所有选项：expires、domain、path、secure、HttpOnly

#### 2. 客户端设置 cookie

在网页即客户端中我们也可以通过js代码来设置cookie。

    在控制台中我们执行了下面代码：
    document.cookie = "name=Jonh; ";
    查看浏览器 cookie 面板，cookie确实设置成功了，而且属性选项 domain、path、expires都用了默认值。

再执行下面代码：

    document.cookie="age=12; expires=Thu, 26 Feb 2116 11:50:25 GMT; domain=sankuai.com; path=/";
    查看浏览器cookie 面板，如下图所示，新的cookie设置成功了，而且属性选项 domain、path、expires都变成了设定的值。

注意：
    
    客户端可以设置cookie 的下列选项：expires、domain、path、secure
    （有条件：只有在https协议的网页中，客户端设置secure类型的 cookie 才能成功），
    但无法设置HttpOnly选项。

### 用 js 如何设置多个 cookie

当要设置多个cookie时， js 代码很自然地我们会这么写：

    document.cookie = "name=Jonh; age=12; class=111";

但你会发现`这样写只是添加了第一个cookie“name=John”，后面的所有cookie都没有添加成功!!!`。
所以最简单的设置多个cookie的方法就在重复执行document.cookie = "key=name"
如下：

    document.cookie = "name=Jonh";
    document.cookie = "age=12";
    document.cookie = "class=111";

### 修改 cookie

    要想修改一个cookie，只需要重新赋值就行，旧的值会被新的值覆盖。
    但要注意一点，在设置新cookie时，path/domain这几个选项一定要旧cookie 保持一样。
    否则不会修改旧值，而是添加了一个新的 cookie。

### 删除 cookie

    删除一个cookie 也挺简单，也是重新赋值，只要将这个新cookie的expires 选项设置为一个过去的时间点就行了。
    但同样要注意，path/domain/这几个选项一定要旧cookie 保持一样。

### cookie 编码

    cookie其实是个字符串，但这个字符串中逗号、分号、空格被当做了特殊符号。
    所以当cookie的 key 和 value 中含有这3个特殊字符时，需要对其进行额外编码，一般会用escape进行编码，
    读取时用unescape进行解码；
    当然也可以用encodeURIComponent/decodeURIComponent或者encodeURI/decodeURI。
    
    var key = escape("name;value");
    var value = escape("this is a value contain , and ;");
    document.cookie= key + "=" + value + "; expires=Thu, 26 Feb 2116 11:50:25 GMT; 
    domain=sankuai.com; path=/";

### 跨域请求中 cookie

之前在介绍 XHR 的一篇文章里面提过：

    默认情况下，在发生跨域时，cookie 作为一种 credential 信息是不会被传送到服务端的。
    必须要进行额外设置才可以。