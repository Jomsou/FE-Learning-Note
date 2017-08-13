# 前端路由实现与 react-router 源码分析

    在单页应用上，前端路由并不陌生。很多前端框架也会有独立开发或推荐配套使用的路由系统。
    那么，当我们在谈前端路由的时候，还可以谈些什么？
    本文将简要分析并实现一个的前端路由，并对 react-router 进行分析。

## 一个极简前端路由实现

说一下前端路由实现的简要原理，以 hash 形式（也可以使用 History API 来处理）为例，当 url 的 hash 发生变化时，
触发 hashchange 注册的回调，回调中去进行不同的操作，进行不同的内容的展示。直接看代码或许更直观。

    function Router() {
        this.routes = {};
        this.currentUrl = '';
    }
    
    Router.prototype.route = function(path, callback) {
        this.routes[path] = callback || function(){};
    };
    
    Router.prototype.refresh = function() {
        this.currentUrl = location.hash.slice(1) || '/';
        this.routes[this.currentUrl]();
    };
    
    Router.prototype.init = function() {
        window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
    }
    
    window.Router = new Router();
    window.Router.init();
    
上面路由系统 Router 对象实现，主要提供三个方法

- init 监听浏览器 url hash 更新事件
- route 存储路由更新时的回调到回调数组routes中，回调函数将负责对页面的更新
- refresh 执行当前url对应的回调函数，更新页面

Router 调用方式以及呈现效果如下：点击触发 url 的 hash 改变，并对应地更新内容（这里为 body 背景色）

    <ul> 
        <li><a href="#/">turn white</a></li> 
        <li><a href="#/blue">turn blue</a></li> 
        <li><a href="#/green">turn green</a></li> 
    </ul> 
    var content = document.querySelector('body');
    // change Page anything
    function changeBgColor(color) {
        content.style.backgroundColor = color;
    }
    Router.route('/', function() {
        changeBgColor('white');
    });
    Router.route('/blue', function() {
        changeBgColor('blue');
    });
    Router.route('/green', function() {
        changeBgColor('green');
    });

以上为一个前端路由的简单实现，点击查看完整代码，虽然简单，但实际上很多路由系统的根基都立于此，
其他路由系统主要是对自身使用的框架机制的进行配套及优化，如与 react 配套的 react-router。

# react-router 分析

## react-router 与 history 结合形式

react-router 是基于 history 模块提供的 api 进行开发的，结合的形式本文记为 包装方式。
所以在开始对其分析之前，先举一个简单的例子来说明如何进行对象的包装。
    
    // 原对象
    var historyModule = {
        listener: [],
        listen: function (listener) {
            this.listener.push(listener);
            console.log('historyModule listen..')
        },
        updateLocation: function(){
            this.listener.forEach(function(listener){
                listener('new localtion');
            })
        }
    }
    // Router 将使用 historyModule 对象，并对其包装
    var Router = {
        source: {},
        init: function(source){
            this.source = source;
        },
        // 对 historyModule的listen进行了一层包装
        listen: function(listener) {
            return this.source.listen(function(location){
                console.log('Router listen tirgger.');
                listener(location);
            })
        }
    }
    // 将 historyModule 注入进 Router 中
    Router.init(historyModule);
    // Router 注册监听
    Router.listen(function(location){
        console.log(location + '-> Router setState.');
    })
    // historyModule 触发回调
    historyModule.updateLocation();
    
    返回：
    22

可看到 historyModule 中含有机制：historyModule.updateLocation() -> listener( )，
Router 通过对其进行包装开发，针对 historyModule 的机制对 Router 也起到了作用，
即historyModule.updateLocation() 将触发 Router.listen 中的回调函数 。
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>包装方式</title>
    </head>
    <body>
    <script>
        var body = document.querySelector('body'),
            newNode = null,
            append = function(str){
                newNode = document.createElement("p");
                newNode.innerHTML = str;
                body.appendChild(newNode);
            };
        
        // 原对象
        var historyModule = {
            listener: [],
            listen: function (listener) {
                this.listener.push(listener);
                append('historyModule listen.')
            },
            updateLocation: function(){
                append('historyModule updateLocation tirgger.');
                this.listener.forEach(function(listener){
                    listener('new localtion');
                })
            }
        }
        // Router 将使用 historyModule 对象，并对其包装
        var Router = {
            source: {},
            init: function(source){
                this.source = source;
            },
            listen: function(listener) {
                append('Router listen.');
                // 对 historyModule的listen进行了一层包装
                return this.source.listen(function(location){
                    append('Router listen tirgger.');
                    listener(location);
                })
            }
        }
        // 将 historyModule 注入进 Router 中
        Router.init(historyModule);
        // Router 注册监听
        Router.listen(function(location){
            append(location + '-> Router setState.');
        })
        // historyModule 触发监听回调
        historyModule.updateLocation();
    </script>
    </body>
    </html>
    
这种包装形式能够充分利用原对象（historyModule ）的内部机制，减少开发成本，
也更好的分离包装函数（Router）的逻辑，减少对原对象的影响。

## react-router 使用方式

react-router 以 react component 的组件方式提供 API， 包含 Router，Route，Redirect，Link 等等，
这样能够充分利用 react component 提供的生命周期特性，同时也让定义路由跟写 react component 达到统一，如下

    render((
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="about" component={About}/>
          <Route path="users" component={Users}>
            <Route path="/user/:userId" component={User}/>
          </Route>
          <Route path="*" component={NoMatch}/>
        </Route>
      </Router>
    ), document.body)

就这样，声明了一份含有 path to component 的各个映射的路由表。
react-router 还提供的 Link 组件（如下），作为提供更新 url 的途径，触发 Link 后最终将通过如上面定义的
路由表进行匹配，并拿到对应的 component 及 state 进行 render 渲染页面。

    <Link to={`/user/89757`}>'joey'</Link>
    
这里不细讲 react-router 的使用，详情可见：https://github.com/reactjs/react-router

## 从点击 Link 到 render 对应 component ，路由中发生了什么, 为何能够触发 render component ？

主要是因为触发了 react setState 的方法从而能够触发 render component。
从顶层组件 Router 出发（下面代码从 react-router/Router 中摘取），可看到 Router 在 react component 
生命周期之组件被挂载前 componentWillMount 中使用 this.history.listen 去注册了 url 更新的回调函数。
回调函数将在 url 更新时触发，回调中的 setState 起到 render 了新的 component 的作用。

    Router.prototype.componentWillMount = function componentWillMount() {
        // .. 省略其他
        var createHistory = this.props.history;
    
        this.history = _useRoutes2['default'](createHistory)({
          routes: _RouteUtils.createRoutes(routes || children),
          parseQueryString: parseQueryString,
          stringifyQuery: stringifyQuery
        });
    
        this._unlisten = this.history.listen(function (error, state) {
            _this.setState(state, _this.props.onUpdate);
        });
      };
      
上面的 _useRoutes2 对 history 操作便是对其做一层包装，所以调用的 this.history 实际为包装以后的对象，
该对象含有 _useRoutes2 中的 listen 方法，如下

    function listen(listener) {
          return history.listen(function (location) {
              // .. 省略其他
              match(location, function (error, redirectLocation, nextState) {
                listener(null, nextState);
              });
          });
    }
    
可看到，上面代码中，主要分为两部分

1. 使用了 history 模块的 listen 注册了一个含有 setState 的回调函数（这样就能使用 history 模块中的机制）
2. 回调中的 match 方法为 react-router 所特有，match 函数根据当前 location 以及前面写的 Route 
路由表匹配出对应的路由子集得到新的路由状态值 state，具体实现可见 react-router/matchRoutes ，
再根据 state 得到对应的 component ，最终执行了 match 中的回调 listener(null, nextState) ，
即执行了 Router 中的监听回调（setState），从而更新了展示。

以上，为起始注册的监听，及回调的作用。

## 如何触发监听的回调函数的执行？

这里还得从如何更新 url 说起。一般来说，url 更新主要有两种方式：简单的 hash 更新或使用 history api 进行地址更新。
在 react-router 中，其提供了 Link 组件，该组件能在 render 中使用，最终会表现为 a 标签，
并将 Link 中的各个参数组合放它的 href 属性中。
可以从 react-router/ Link 中看到，对该组件的点击事件进行了阻止了浏览器的默认跳转行为，
而改用 history 模块的 pushState 方法去触发 url 更新。

    Link.prototype.render = function render() {
        // .. 省略其他
        props.onClick = function (e) {
          return _this.handleClick(e);
        };
        if (history) {
         // .. 省略其他
          props.href = history.createHref(to, query);
        }
        return _react2['default'].createElement('a', props);
    };
    
    Link.prototype.handleClick = function handleClick(event) {
        // .. 省略其他
        event.preventDefault();
        this.context.history.pushState(this.props.state, this.props.to, this.props.query);
    };

对 history 模块的 pushState 方法对 url 的更新形式，同样分为两种，
分别在 history/createBrowserHistory 及 history/createHashHistory 各自的 finishTransition 中，
如 history/createBrowserHistory 中使用的是 window.history.replaceState(historyState, null, path); 
而 history/createHashHistory 则使用 window.location.hash = url，调用哪个是根据我们一开始创建 history 的方式。

更新 url 的显示是一部分，另一部分是根据 url 去更新展示，也就是触发前面的监听。
这是在前面 finishTransition 更新 url 之后实现的，调用的是 history/createHistory 中的 
updateLocation 方法，changeListeners 中为 history/createHistory 中的 listen 中所添加的，如下

    function updateLocation(newLocation) {
       // 示意代码
        location = newLocation;
        changeListeners.forEach(function (listener) {
          listener(location);
        });
    }
    function listen(listener) {
         // 示意代码
        changeListeners.push(listener);
    }

## 总结

可以将以上 react-router 的整个包装闭环总结为

    回调函数：含有能够更新 react UI 的 react setState 方法。
    
    注册回调：在 Router componentWillMount 中使用 history.listen 注册的回调函数，最终放在 history 
    模块的 回调函数数组 changeListeners 中。
    
    触发回调：Link 点击触发 history 中回调函数数组 changeListeners 的执行，
    从而触发原来 listen 中的 setState 方法，更新了页面
    
    至于前进与后退的实现，是通过监听 popstate 以及 hashchange 的事件，当前进或后退 url 更新时，
    触发这两个事件的回调函数，回调的执行方式 Link 大致相同，最终同样更新了 UI ，这里就不再说明。

react-router 主要是利用底层 history 模块的机制，通过结合 react 的架构机制做一层包装，实际自身的内容并不多，
但其包装的思想笔者认为很值得学习，有兴趣的建议阅读下源码，相信会有其他收获。