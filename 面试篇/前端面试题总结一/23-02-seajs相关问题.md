## sea.js

1. 有什么优势? 
2. 模块加载原理?
3. combo原理?
3. cmd、amd、commonjs规范

## 使用方法

    exports
    
    首先是 exports 的几种形式，我们可以： 
    define(function(require, exports, module) {
      exports.a = 'a';
      exports.fn = function() {};
    });
    
    也可以： 
    define(function(require, exports, module) {
      module.exports = {
        a: 'a',
        fn: function() {}
      };
    });
    
    这两者有什么区别呢？
    
    就最终的效果而言，这两种形式没什么区别：都是使得该模块对外提供 xx 和 fn 两个公共成员。
    就代码组织形式而言， exports.xx = ... 是分散赋值，中间可以穿插其他代码，很灵活。 
    module.exports = { ... } 则是集中式赋值，便于管理。两种形式各有优劣，采用何种方式，很大程度上取决于个人喜好。
    就内部实现而言，在传入参数时， exports = module.exports = {} , 很明显，第一种方式复用了 {} 初始值，
    第二种则给 module.exports 重新赋了一个新对象。
    由于 require('module-id') 返回的是 module.exports , 因此最终的效果两种形式是一致的。
    更直观的一种形式是 exports = { ... } , 但由于 JavaScript 里只能传值，不能传引用，直接给 exports 赋值，
    外面无法获取到 exports 的新值，因此才有了退而求其次的 module.exports = { ... } 形式。
    
    模块书写格式与模块加载器
    在 seajs 里，“加载”一个模块可以有： 
    seajs.use('a', callback);
    require('a');
    module.load('a', callback);
    首先， seajs.use 仅用来在页面中加载起始入口模块，这就如我们在 nodejs 里，运行模块的入口是： 
    node filename.js
    seajs.use('a', callback) 就相当于 node filename.js , 仅起到 bootstrap 的作用。
    
    在标准模块里，推荐永远不要出现 seajs. 就如 nodeJS 的模块里，不会出现 node 一样。标准模块的书写形式为： 
    define(function(require, exports, module) {
      // module code
    });
    这样做的好处，可以使得模块和具体加载器无关。比如 SeaJS 能加载的模块，理论上用 RequireJS 也可以跑起来，
    因为遵循的模块书写规范有很大交集。CommonJS 社区的一个目标就是使得各种环境下，都遵循统一的模块书写格式。
    这样，SeaJS, RequireJS, nodeJS 等都只是模块加载器，只要遵循的模块书写规范一致，模块就可以通用。
    
    动态加载
    
    define(function(require, exports, module) {
      var a = require('a');
      // ...
      module.load('b', function(b) {
        // ...
      });
      // ...
    });
    上面的代码， require('a') 对应的 a.js 模块在 require 执行前就已下载好， 
    require('a') 仅执行 a.js 模块里 define 的 function 参数，以获取模块 a 的 exports. 
    这种方式是预先加载、按需执行。
    
    而 module.load('b', callback) 是执行到此处时，才开始下载 b.js 模块。下载好后，回调 callback 函数。
    这种方式是动态延迟加载。
    
    一般来说， require('a') 这种形式用于强依赖，缺了模块 a, 该模块功能就不全了。 
    module.load 则用于加载可选模块，比如在某些特定条件下才需要的功能。
    
    这两种方式各自的使用场景不同，得具体问题具体分析。
    
    有心人可以发现： module.load 和 seajs.use 是很类似的。内部实现上也的确是公用一套逻辑，
    唯一不同的是， module.load('path/to/module') 是相对当前模块来定位， seajs.use 是相对当前页面。

## 1. sea.js优点

1. 提高可维护性。
2. 模块化编程。
3. 动态加载，前端性能优化
4. 利用插件实现combo(请求合并)功能,等等

## 2. 模块加载实现原理(参考前一篇)

## 3. combo请求合并的原理

原理(`seajs combo插件将多个请求合并在一个url钟,然后web服务器进行解析,一次返回多个文件!!!`): 
```
    减少 HTTP 请求数是性能优化中非常重要的一条准则。使用 `combo 插件`，配合`服务器的nginx-http-concat服务`，
    可自动对同一批次的多个模块进行合并下载。
```

#### 使用场景

    seajs.use(['a', 'b'], ...);
    require.async(['a', 'b'], ...);
    define('id', ['a', 'b'], ...);
    
    上面这些场景中的 a.js 和 b.js 可以合并成 http://example.com/path/to/??a.js,b.js 一起下载。

#### 引入方式

使用很简单，只要加载 sea.js 时，同时加载 seajs-combo.js 即可：

    <script src="http://test.com/??path/to/sea.js,path/to/seajs-combo.js"></script>

或者在 sea.js 之后用 script 引入：

    <script src="path/to/sea.js"></script>
    <script src="path/to/seajs-combo.js"></script>
    
推荐用 ??path/to/sea.js,path/to/seajs-combo.js 的方式激活，这可以少一个请求。

    提示：其他需要线上使用的插件，都推荐通过 ??path/to/sea.js,path/to/seajs-xxx.js 的方式使用。

#### 配置项
加载 combo 插件后，可以通过 comboSyntax 配置更改 combo 规则：

    seajs.config({
      comboSyntax: ['?', '&']
    })
    
上面的配置，会将 combo 规则改成类 YUI Loader 的形式：http://example.com/path/to/?a.js&b.js

可以通过 comboExcludes 排除掉特定文件：

    seajs.config({
      comboExcludes: /jquery\.js/ // 从 combo 中排除掉 jquery.js 
    })
    comboExcludes 可以是正则，也可以是一个函数：
    
    seajs.config({
      comboExcludes: function(uri) {
        // 某些特定目录下的文件不合并
        if (uri.indexOf('/some/path/') > 0) {
          return true
        }
      }
    })
在激活 combo 插件后，如果需要临时禁用 combo，可以

    seajs.config({
      comboExcludes: /.*/
    })
上面的配置把所有文件都排除掉了，因此 combo 也就不生效了。

提示：combo 插件已经做了去重等处理，已经下载或正在下载的，不会重复下载。

combo 后的 URL 地址太长时，IE 以及有些服务器的配置会不支持。目前最佳经验值是不超过 2000 个字符。

    seajs.config({
      // 将 combo URL 的最大长度修改为 1000 个字符
      comboMaxLength: 1000
    })

合并请求并添加max-age

    var re_cdn_request_uri = /\w+\.r\d+\.(?:js|css)/;// 匹配 xxx.r201501201234.js
     
    seajs.config({
        charset: 'utf-8',
        comboSyntax: ['/c/=', ','] // for seajs-combo
    });
     
    seajs.on('fetch', function (req) {
        var uri = req.requestUri || req.uri;
        if (uri) {
            if (re_cdn_request_uri.test(uri)) {
                uri += (req.uri.indexOf('?') === -1 ? '?' : '&') + 'max_age=31104000';
            }
        req.requestUri = uri;
    }
    });
    
    
#### web服务端处理,解析请求url,一次返回多个文件
    
    combo模式是利用静态服务器的combo服务，结合静态分析页面使用的js或者css文件，
    然后动态输出combo url地址的方式。

公司静态集群使用的是nginx服务，nginx有个concat模块可以将url进行打包。
使用它之后，需要合并输出的静态资源需要在 ?? 两个问号后面加 , 逗号隔开，例如：

    http://baidu.com??style1.css,style2.css
    http://box.bdimg.com/life/js??script1.js,script2.js
    
当然这种合并的文件数也是有限的，如果超过默认或者设置的最大文件数，服务就会报错，
可以通过修改 nginx.conf 的配置进行修改：

    location /static/ {
        concat on;
        concat_max_files 20;
    }
