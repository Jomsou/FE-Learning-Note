## 请你谈谈Cookie的弊端

cookie虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的。

- 第一：每个特定的域名下最多生成20个cookie
```
    1.IE6或更低版本最多20个cookie
    2.IE7和之后的版本最后可以有50个cookie。
    3.Firefox最多50个cookie
    4.chrome和Safari没有做硬性限制
```
- IE和Opera 会清理近期最少使用的cookie，Firefox会随机清理cookie。
- `cookie的最大大约为4096字节`，为了兼容性，一般不能超过4095字节,`每个cookie长度不能超过4KB，否则会被截掉`.
- 可以被脚本修改,安全性问题


## 浏览器本地存储
html5中的Web Storage包括了两种存储方式：`sessionStorage`和`localStorage`。

    sessionStorage用于本地存储一个会话（session）中的数据，
    这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。
    因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。
    
    而localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

## web storage和cookie的区别

1. Web Storage的概念和cookie相似，区别是它是为了更大容量存储设计的。
2. Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，
3. 另外cookie还需要指定作用域，不可以跨域调用。
4. 除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，
不像cookie需要前端开发者自己封装setCookie，getCookie。

```
但是cookie也是不可以或缺的：cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，
而Web Storage仅仅是为了在本地“存储”数据而生。
localStorage和sessionStorage都具有相同的操作方法，例如setItem、getItem和removeItem等
```

## cookie 和session 的区别：

1. cookie数据存放在客户的浏览器上，session数据放在服务器上。
2. cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
    考虑到安全应当使用session。
3. session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
     考虑到减轻服务器性能方面，应当使用COOKIE。
4. 单个`cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie`。

