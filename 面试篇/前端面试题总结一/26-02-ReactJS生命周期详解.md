## React生命周期函数详解

```
在组件的整个生命周期中，随着该组件的props或者state发生改变，它的DOM表现也将有相应的改变，
一个组件就是一个状态机，对于特定的输入，它总会返回一致的输出。
React为每个组件提供了生命周期钩子函数去响应不同的时刻——创建时、存在期及销毁时。
```
 
## 生命周期方法
React的组件拥有简洁的生命周期API，它仅仅提供你所需要的方法，而不会去最求全面。

### 当你首次使用一个组建类时，会看到下面这些方法依次被调用：

1. getDefaultProps
2. getInitialState
3. componentWillMount
4. render
5. ComponentDidMount
 
### 对于该组件类所有后续应用，你将会看到下面的方法依次被调用。
注意：gerDefaultProps方法不在列表中。

1. getInitialState
2. componentWillMount
3. render
4. componentDidMount
 
### 存在期：
随着应用状态的改变，以及组件逐渐受到影响，你将会看到下面的方法一次被调用：

1. componentWillReceiveProps
2. shouldComponentUpdate
3. componentWillUpdate
4. render
5. componentDidUpdate
 
### 销毁&清理期：
最后，当该组件被使用完成后，`componentWillUnmount`方法会被调用，目的是给这个实例提供清理自身的机会。
 

详细说明
## 实例化：当每个新的组件被创建首次渲染时，有一系列的方法可以用来为其做准备工作，这些方法中的每一个斗殴明确的职责，如下所示：
### 1. getDefaultProps
```
对于组件来说，这个方法只会调用一次，对于那些没有父辈组件指定的props属性的新建实例来说，
这个方法返回的对象可用与为实例设置默认的props值。
```
 
### 2. getInitalState：
```
对于组件的每个实例来说，这个方法调用次数有且仅有一次，这里你将有机会初始化每个实例的state,
与getDefaultProps方法不同的是，每次实例创建时该方法都会被调用一次，这个方法中，可以访问到this.props.
```

### 3. componentWillMount:
```
该方法在完成首次渲染之前被调用，这也是在render方法调用前可以修改组件state的最后一次机会。
```
 
### 4. render:
```
在这里你创建一个虚拟DOM，用来表示组件的输出，对于一个组件来说，render是唯一一个必需的方法，并且有特定的规则。

render方法选要满足下面几点：
只能通过this.props和this.state访问数据。
可以返回null，false或者任何React组件。
只能出现一个顶级组件（不能返回一组元素）、
必须纯净，有位置不能改变组件状态或者修改DOM输出。
```

### 5. componentDidMount:
```
在render方法成功调用并且真实的DOM已经被渲染之后，可以在componentDidMount内部通过this.getDOMNode()方法访问到它。
这就是你可以访问原始DOM的生命周期的钩子函数，当你需要测量DOM元素的高度或者使用计时器操作它或者运行jQuery插件时，
可以将这些操作挂载到这个方法上：

举例来说，假设需要在一个通过React渲染出的表单元素上使用jQueryUI的Autocomplete插件，则可以这样使用它：
//需要自动补全的字符串列表
var datasource =[...];
var MyComponent=React.crateClass({
    render:function(){
        rerurn <input .../>
    },
    
    componentDidMount:function(){
    $(this.gerDOMNode()).autocomplete({
        source:datasource
        });
    }
});
ps：当React运行在服务器端时候，componentdidmount方法不会被调用。
```
 
## 存在期：
此时组件已经渲染好并且用户可以与它进行交互，通常一次鼠标点击、手指点按或者键盘事件触发一个时间处理器，
随着用户改变了组件或则和整个应用的state，便会有新的state流入组件树，并且我们将会获得操控它的机会。
 
### 1. componentWillReceiveProps:
```
任何时刻组件的props都可以通过父辈组件来更改，出现这种情况时，componentWillReceiveProps方法会被调用，
你将获得更改props方法及跟他关心state的机会。例如：
componentWillReceiveProps:function(nextProps){
    if(nextProps.checked ！==undefined）{
        this.setState({
            checked:nextProps.checked
        });
    }
}
```
 
### 2. shouldComponentUpdate:
```
调用shouldComponentUpdate方法在组件渲染时进行精确优化。
如果某个组件或者它的任何子组件不需要渲染成新的props或则和state，则该方法返回false，
返回false则是说明React要跳到render方法，一届位于render前后的钩子函数：componentWillUpadate和componentDidUpdate。
该方法非必需的，并且大部分情况没有必要使用它。
```
 
### 3. componentWillUpdate:
```
和componentwillMount:方法类似，组建会在收到新的props或者state进行渲染之前调用该方法。
注意：你不可以在该方法中更新huo或者props。而应该借助componentWillReceiveProps方法在运行时更新state。
```
 
### 4. componentDidUpdate：
```
和componentDidMount方法类似，该方法给我们更新已经渲染好的DOM机会。
```
 
 
## 销毁&清理期
当React使用完一个组件，这个组件必须从DOM中卸载随后被销毁。此时仅有的一个狗子函数会做出响应，完成所有的清理和销毁工作。
### 1. componentWillUnmount：
```
最后，随着组件从他的层级结构中移除，这个组件的生命也就走id熬了尽头，该方法会在组件被移除之前调用，让你有机会做一些清理工作。
在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如穿件的定时器或者添加的事件监听器。
```
 
## 反模式：把计算后的值赋值给state：
getInitalState方法中，尝试通过this.props来创建state的做法是一种反模式。React专注于维护数据的单一来源。
它的设计使得传递数据的来源更加显而易见，这是React的一个优势。

比如在组件中吧日期转化成字符串形式，或者渲染之前字符串转换为大写。这些都不是state，只能够在渲染时进行计算。
当组件的state值和它基于的prop不同步，因而无法了解到render函数内部结构时，可以认定为一种反模式。
```
//反模式:经过计算后值不应该赋给state
getDefaultProps:function(){
return{
date:newDate()
};
},
getInitalState:function(){
return{
day:this.props.date.getDay()
}
},
render:function(){
return <div>Day:{this.state.day}</day>
}
```
正确的模式应该是渲染时计算这些值，保证了计算后的值永远不会派生出它的props值不同步。
```
//渲染时计算值是正确的
gerDefaultProps：function（）{
    return{
        date：new Date()
    }；
}
render：function（）{
    var day = this.props.date.getDay();
    return <div>Day:{day}</div>;
}
```
然而，如果你的目的并不是同步，而只是简单的初始化state，那么在getInitialState方法中使用props是没问题的，
只是一定要明确你的意图，比如prop添加initial前缀。
```
getDefaultProps：function(){
    return{
        initialValue:'some-dafault-value'
    }；
},
getInitialState:function(){
    return{
        value:this.props.initialValue
    };
},
render:function(){
    return <div>{this.props.value}</div>
}
```

## 总结：
react生命周期提供了进行设计的钩子函数，会伴随着组件整个生命周期。
和状态机类似，每个组件都被设计成了能够在整个生命周期中输出稳定、语义化的标签。
组件不会独立存，随着父组件将props推送给他们的子组件，以及那些子组件渲染它们自身的子组件你必须谨慎的考虑数据是如何流经整个应用的。
每一个子组件真正需要掌握多少数据，哪个组件来控制应用的状态？这些涉及数据流了。