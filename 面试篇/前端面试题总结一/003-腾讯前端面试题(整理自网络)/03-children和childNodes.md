# Js中的children和childNodes的区别

## 1. childNodes 属性，标准的，它返回指定元素的子元素集合，包括HTML节点，所有属性，文本。

    可以通过nodeType来判断是哪种类型的节点，只有当nodeType==1时才是元素节点，2是属性节点，3是文本节点。
    
    有时候需要获取指定元素的第一个HTML子节点（非属性/文本节点），最容易想到的就是firstChild 属性。
    代码中第一个HTML节点前如果有换行，空格，那么firstChild返回的就不是你想要的了。
    可以使用nodeType来判断下。
    
    function getFirst(elem){
        for(var i=0,e;e=elem.childNodes[i++];){
            if(e.nodeType==1)
                return e;
        }      
    }

## 2. children 属性，非标准的，它返回指定元素的子元素集合。

    经测试，它只返回HTML节点，甚至不返回文本节点。且在所有浏览器下表现惊人的一致。
    和childNodes 一样，在Firefox下不支持()取集合元素。因此如果想获取指定元素的第一个HTML节点，
    可以使用children[0]来替代上面的getFirst函数。需注意children在IE中包含注释节点。
    
    
## 总结

    对于DOM元素，children是指DOM Object类型的子对象，不包括tag之间隐形存在的TextNode，
    而childNodes包括tag之间隐形存在的TextNode对象。