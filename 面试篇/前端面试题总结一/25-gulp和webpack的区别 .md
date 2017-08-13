## gulp和webpack有什么区别

```
Gulp应该和Grunt比较，Gulp / Grunt 是一种工具，能够优化前端工作流程。
比如自动刷新页面、combo、压缩css、js、编译less等等。
简单来说，就是使用Gulp/Grunt，然后配置你需要的插件，就可以把以前需要手工做的事情让它帮你做了。
```

```
说到 browserify / webpack ，那还要说到 seajs / requirejs 。
这四个都是JS模块化的方案。
其中seajs / require 是一种类型，browserify / webpack 是另一种类型。
```

```
seajs / require : 是一种在线"编译" 模块的方案，相当于在页面上加载一个 CMD/AMD 解释器。
这样浏览器就认识了 define、exports、module 这些东西。也就实现了模块化。

browserify / webpack : 是一个预编译模块的方案，相比于上面 ，这个方案更加智能。
以webpack为例。首先，它是预编译的，不需要在浏览器中加载解释器。
另外，你在本地直接写JS，不管是 AMD / CMD / ES6 风格的模块化，它都能认识，并且编译成浏览器认识的JS。
```


`这样就知道，Gulp是一个工具，而webpack等等是模块化方案。
Gulp也可以配置seajs、requirejs甚至webpack的插件。`