## 开启GZip压缩
### 1. 请求头通过`Accept-Encoding`来指定接受压缩内容。
```
Accept-Encoding: gzip,deflate
```

### 2. 响应头通过`Content-Encoding`来指定文件被压缩和压缩格式。
```
Content-Encoding: gzip
```

## 压缩什么?
```
可以压缩HTML文档、js和css以及其他任何文本响应,但是不要压缩图片和PDF,因为图片和PDF已经被压缩过,
再压缩只会浪费cpu资源,而且可能导致文件变大。
```

## 怎样压缩? 
```
通常是配置web服务器即可,例如Apache的mod_gzip模块和mod_deflate模块就用来配置压缩。
```