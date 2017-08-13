# HTTP2新特性
(http://www.tuicool.com/articles/mq2qm26)


## HTTP/2 源自 SPDY/2

    SPDY 系列协议由谷歌开发，于 2009 年公开。它的设计目标是降低 50% 的页面加载时间。
    当下很多著名的互联网公司都在自己的网站或 APP 中采用了 SPDY 系列协议（当前最新版本是 SPDY/3.1），
    因为它对性能的提升是显而易见的。
    主流的浏览器（谷歌、火狐、Opera）也都早已经支持 SPDY，它已经成为了工业标准，HTTP Working-Group 
    最终决定以 SPDY/2 为基础，开发 HTTP/2。

但是，HTTP/2 跟 SPDY 仍有不同的地方，主要是以下两点：

    HTTP/2 支持明文 HTTP 传输，而 SPDY 强制使用 HTTPS
    HTTP/2 消息头的压缩算法采用 HPACK ，而非 SPDY 采用的 DELEFT

## HTTP/2 的优势

相比 HTTP/1.x，HTTP/2 在底层传输做了很大的改动和优化：
    
    1. HTTP/2 采用二进制格式传输数据，而非 HTTP/1.x 的文本格式。
    二进制格式在协议的解析和优化扩展上带来更多的优势和可能。
    
    2. HTTP/2 对消息头采用 HPACK 进行压缩传输，能够节省消息头占用的网络的流量。
    而 HTTP/1.x 每次请求，都会携带大量冗余头信息，浪费了很多带宽资源。头压缩能够很好的解决该问题。
    
    3. 多路复用，直白的说就是所有的请求都是通过一个 TCP 连接并发完成。
    HTTP/1.x 虽然能利用一个连接完成多次请求，但是多个请求之间是有先后顺序的，后面发送的请求必须等待上一个请求返回才能发送响应。
    这会很容易导致后面的请求被阻塞，而 HTTP/2 做到了真正的并发请求。
    同时， 流还支持优先级和流量控制。
    
    4. Server Push：服务端能够更快的把资源推送给客户端。
    例如服务端可以主动把 JS 和 CSS 文件推送给客户端，而不需要客户端解析 HTML 再发送这些请求。
    当客户端需要的时候，它已经在客户端了。

    HTTP/2 主要是 HTTP/1.x 在底层传输机制上的完全重构，HTTP/2 是基本兼容 HTTP/1.x 的语义的。 
    Content-Type 仍然是 Content-Type ，只不过它不再是文本传输了。

那么 HTTP/2 的这些新特性又是如何实现的呢？

## HTTP/2 的基石 － Frame

    Frame 是 HTTP/2 二进制格式的基础，基本可以把它理解为它 TCP 里面的数据包一样。
    HTTP/2 之所以能够有如此多的新特性，正是因为底层数据格式的改变。 
    Frame 的基本格式如下（图中的数字表示所占位数，内容摘自 http2-draft-17 ）:
    
    +-----------------------------------------------+
    |                 Length (24)                   |
    +---------------+---------------+---------------+
    |   Type (8)    |   Flags (8)   |
    +-+-------------+---------------+-------------------+
    |R|                 Stream Identifier (31)          |
    +=+=================================================+
    |                   Frame Payload (0...)        ...
    +---------------------------------------------------+
    
    Length: 表示 Frame Payload 部分的长度，另外 Frame Header 的长度是固定的 9 字节
    （Length + Type + Flags + R + Stream Identifier = 72 bit）。
    
    Type: 区分这个 Frame Payload 存储的数据是属于 HTTP Header 还是 HTTP Body；
    另外 HTTP/2 新定义了一些其他的 Frame Type，
    例如，这个字段为 0 时，表示 DATA 类型（即 HTTP/1.x 里的 Body 部分数据）
    
    Flags: 共 8 位， 每位都起标记作用。每种不同的 Frame Type 都有不同的 Frame Flags。
    例如发送最后一个 DATA 类型的 Frame 时，就会将 Flags 最后一位设置 1（ flags &= 0x01 ），
    表示 END_STREAM，说明这个 Frame 是流的最后一个数据包。
    
    R: 保留位。
    
    Stream Identifier: 流 ID，当客户端和服务端建立 TCP 链接时，就会先发送一个 Stream ID = 0 的流，
    用来做些初始化工作。之后客户端和服务端从 1 开始发送请求/响应。
    
    Frame 由 Frame Header 和 Frame Payload 两部分组成。不论是原来的 HTTP Header 还是 HTTP Body，
    在 HTTP/2 中，都将这些数据存储到 Frame Payload，组成一个个 Frame，再发送响应/请求。
    通过 Frame Header 中的 Type 区分这个 Frame 的类型。
    由此可见语义并没有太大变化，而是数据的格式变成二进制的 Frame。
