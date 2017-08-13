## DOM操作方法有哪些

1. getElementById(): 获取有指定惟一ID属性值文档中的元素

2. getElementsByName(name): 返回的是数组

3. getElementsByTagName(): 返回具有指定标签名的元素子元素集合

4. getAttribute(): 返回指定属性名的属性值
   document.getElementsByTagName("a")[0].getAttribute("target");
    
5. setAttribute(): 添加指定的属性，并为其赋指定的值。
   document.getElementsByTagName("INPUT")[0].setAttribute("type","button");

6. 节点属性:
    节点名称(只读):nodeName
    节点值: nodeValue
    节点类型(只读):nodeType

7. 子节点：
    ele.childNodes 返回数组
    firstChild
    lastChild

8. 父节点
    parentNode 只有一个

9. 兄弟节点
    nextSibling 某节点之后紧跟的节点
    previousSibling

10. 插入节点
    appendChild() 插入在最后
    insertBefore(newNode,node)在node节点之前
    
11. 删除节点
    removeChild(node) 成功返回被删除的节点 失败返回null

12. 替换元素节点
    replaceChild(newnode,oldnode) 实现子节点对象的替换

13. 创建元素节点
    createElement()

14. 创建文本节点
    createTextNode()

15. 复制节点
    需要被复制的节点.cloneNode(true/false)
    true复制当前节点极其所以子节点，false仅复制当前节点
