## Javascript自定义事件

JavaScript 自定义事件就是有别于如 click, submit 等标准事件的自行定制的事件，
在叙述自定义事件有何好处之前，先来看一个自定义事件的例子：
```
<div id="testBox"></div>

// 创建事件
var evt = document.createEvent('Event');
// 定义事件类型
evt.initEvent('customEvent', true, true);
// 在元素上监听事件
var obj = document.getElementById('testBox');
obj.addEventListener('customEvent', function(){
    console.log('customEvent 事件触发了');
}, false);
```
在 console 中输入 `obj.dispatchEvent(evt)`，可以看到 console 中输出“customEvent 事件触发了”，
表示自定义事件成功触发。

在这个过程中，`createEvent` 方法创建了一个空事件 evt，然后使用 `initEvent` 方法定义事件的类型为约定好的自定义事件，
再对相应的元素进行监听，接着，就是使用 `dispatchEvent` 触发事件了。

没错，自定义事件的机制如普通事件一样——监听事件，写回调操作，触发事件后执行回调。
但不同的是，自定义事件完全由我们控制触发时机，这就意味着实现了一种 JavaScript 的解耦。
我们可以把多个关联但逻辑复杂的操作利用自定义事件的机制灵活地控制好。

当然，可能你已经猜到了，上面的代码在低版本的 IE 中并不生效，
事实上在 IE8 及以下版本的 IE 中并不支持 createEvent()，而有 IE 私有的 `fireEvent()` 方法，
但遗憾的是，`fireEvent 只支持标准事件的触发`。因此，我们只能使用一个特殊而简单的方法触发自定义事件。
```
// type 为自定义事件，如 type = 'customEvent'，callback 为开发者实际定义的回调函数
obj[type] = 0;
obj[type]++;
 
obj.attachEvent('onpropertychange', function(event){
    if( event.propertyName == type ){
        callback.call(obj);
    }
});
```
这个方法的原理实际上是在 DOM 中增加一个自定义属性，同时监听元素的 propertychange 事件，
当 DOM 的某个属性的值发生改变时就会触发 propertychange 的回调，
再在回调中判断发生改变的属性是否为我们的自定义属性，若是则执行开发者实际定义的回调。从而模拟了自定义事件的机制。

为了使到自定义事件的机制能配合标准事件的监听和模拟触发，这里给出一个完整的事件机制，
这个机制支持标准事件和自定义事件的监听，移除监听和模拟触发操作。
需要注意的是，为了使到代码的逻辑更加清晰，这里约定自定义事件带有 'custom' 的前缀（例如：customTest，customAlert）。
```
/**
 * @description 包含事件监听、移除和模拟事件触发的事件机制，支持链式调用
 * @author Kayo Lee(kayosite.com)
 * @create 2014-07-24
 *
 */
 
(function( window, undefined ){
var Ev = window.Ev = window.$ = function(element){
    return new Ev.fn.init(element);
};
 
// Ev 对象构建
Ev.fn = Ev.prototype = {
    init: function(element){
        this.element = (element && element.nodeType == 1)? element: document;
    },
 
    /**
     * 添加事件监听
     * 
     * @param {String} type 监听的事件类型
     * @param {Function} callback 回调函数
     */
 
    add: function(type, callback){
        var _that = this;
        if(_that.element.addEventListener){
            /**
             * @supported For Modern Browers and IE9+
             */
            _that.element.addEventListener(type, callback, false);
        } else if(_that.element.attachEvent){
            /**
             * @supported For IE5+
             */
            // 自定义事件处理
            if( type.indexOf('custom') != -1 ){
                if( isNaN( _that.element[type] ) ){
                    _that.element[type] = 0;
                } 
 
                var fnEv = function(event){
                    event = event ? event : window.event
                    if( event.propertyName == type ){
                        callback.call(_that.element);
                    }
                };
 
                _that.element.attachEvent('onpropertychange', fnEv);
 
                // 在元素上存储绑定的 propertychange 的回调，方便移除事件绑定
                if( !_that.element['callback' + callback] ){
                    _that.element['callback' + callback] = fnEv;
                }
       
            // 标准事件处理
            } else {
                _that.element.attachEvent('on' + type, callback);
            }
        } else {
            /**
             * @supported For Others
             */
            _that.element['on' + type] = callback;
        }
 
        return _that;
    },
 
    /**
     * 移除事件监听
     * 
     * @param {String} type 监听的事件类型
     * @param {Function} callback 回调函数
     */
     
    remove: function(type, callback){
        var _that = this;
        if(_that.element.removeEventListener){
            /**
             * @supported For Modern Browers and IE9+
             */
            _that.element.removeEventListener(type, callback, false);
        } else if(_that.element.detachEvent){
            /**
             * @supported For IE5+
             */
            // 自定义事件处理
            if( type.indexOf('custom') != -1 ){
                // 移除对相应的自定义属性的监听
                _that.element.detachEvent('onpropertychange', _that.element['callback' + callback]);
                // 删除储存在 DOM 上的自定义事件的回调
                _that.element['callback' + callback] = null;
            // 标准事件的处理
            } else {
                _that.element.detachEvent('on' + type, callback);
            }
        } else {
            /**
             * @supported For Others
             */
            _that.element['on' + type] = null;
        }
 
        return _that;
    },
     
    /**
     * 模拟触发事件
     * @param {String} type 模拟触发事件的事件类型
     * @return {Object} 返回当前的 Kjs 对象
     */
     
    trigger: function(type){
        var _that = this;
        try {
                // 现代浏览器
            if(_that.element.dispatchEvent){
                // 创建事件
                var evt = document.createEvent('Event');
                // 定义事件的类型
                evt.initEvent(type, true, true);
                // 触发事件
                _that.element.dispatchEvent(evt);
            // IE
            } else if(_that.element.fireEvent){
                if( type.indexOf('custom') != -1 ){
                    _that.element[type]++;
                } else {
                    _that.element.fireEvent('on' + type);
                }
            }
        } catch(e){
        };
        return _that;
    }
}
 
Ev.fn.init.prototype = Ev.fn;
 
})( window );
```
测试用例1（自定义事件测试）
```
// 测试用例1（自定义事件测试）
// 引入事件机制
// ...
// 捕捉 DOM
var testBox = document.getElementById('testbox');
// 回调函数1
function triggerEvent(){
        console.log('触发了一次自定义事件 customConsole');
}
// 回调函数2
function triggerAgain(){
        console.log('再一次触发了自定义事件 customConsole');
}
// 封装
testBox = $(testBox);
// 同时绑定两个回调函数，支持链式调用
testBox.add('customConsole', triggerEvent).add('customConsole', triggerAgain);
```

在 console 中调用 testBox.trigger('customConsole') 自行触发自定义事件，
可以看到 console 输出两个提示语，再输入 testBox.remove('customConsole', triggerAgain) 移除对后一个监听，
这时再使用 testBox.trigger('customConsole') 触发自定义事件，可以看到 console 只输出一个提示语，
即成功移除后一个监听，至此事件机制所有功能正常工作。


测试用例2（标准事件测试）
```
// 测试用例2（标准事件测试）
// 引入事件机制
// ...
// 捕捉 DOM
var testClick = document.getElementById('testClick');
// 回调函数
function triggerEvent(){
    alert('擦，我被狠狠地点击了！');
}
// 封装
testClick = $(testBox);
// 监听
testClick.add('click', triggerEvent);
```