/**
 * 双向链表
 */

//节点类
var Node = function (element) {
    this.element = element;
    this.previous = null;
    this.next = null;
}

//双向链表
function DoublyLinkedList() {
    this._head = new Node();
}

DoublyLinkedList.prototype = {
    constructor: DoublyLinkedList,

    constructList: function (elements/*array*/) {
        if (!elements || !elements.length) {
            return this._head;
        }

        var head = this._head;
        for (var i = 0, l = elements.length; i < l; i++) {
            var node = new Node(elements[i]);
            node.next = null;
            node.previous = head;

            head.next = node;
            head = node;
        }
    },

    insert: function (newElement, afterElement) {
        var foundNode = this.find(afterElement);
        if (!foundNode) {
            console.log('cannot find element: ' + afterElement + ' in this list!');
            return;
        }
        var node = new Node(newElement);

        node.next = foundNode.next;
        foundNode.next.previous = node;

        foundNode.next = node;
        node.previous = foundNode;
    },

    remove: function (element) {
        //双向链表删除操作时不需要再找到待删除节点的前一个节点
        var foundNode = this.find(element);
        if (foundNode) {
            if (foundNode.next) {  //待删除的不是最后一个节点
                foundNode.previous.next = foundNode.next;
                foundNode.next.previous = foundNode.previous;
            } else {  //待删除的是最后一个节点
                foundNode.previous.next = null;
            }
        }
    },

    find: function (element) {
        var p = this._head;
        while (p.next && p.next.element !== element) {
            p = p.next;
        }

        // return p.next ? true : false;

        if (p.next) {
            return p.next;
        } else {
            return null;
        }
    },

    display: function () {
        var p = this._head;
        while (p.next) {
            console.log(p.next.element);
            p = p.next;
        }
    },

    //查找最后一个元素,用于反向遍历链表
    _findLast: function () {
        var h = this._head;
        while (h.next) {
            h = h.next;
        }
        return h;
    },

    displayReverse: function () {
        var node = this._findLast();
        while (node.previous) {
            console.log(node.element);
            node = node.previous;
        }
    }
}

/*
 var dlist = new DoublyLinkedList();
 dlist.constructList([10, 20, 30, 40, 50, 60, 70, 80]);
 dlist.display();
 console.log('---------------------------------------');

 dlist.insert(100, 30);
 dlist.display();
 console.log('---------------------------------------');

 dlist.remove(30);
 dlist.display();
 console.log('---------------------------------------');

 dlist.remove(80);
 dlist.display();
 console.log('---------------------------------------');

 // console.log(dlist._findLast());
 dlist.displayReverse();
 console.log('---------------------------------------');

 dlist.remove(60);
 dlist.displayReverse();
 console.log('---------------------------------------');
 */


module.exports = DoublyLinkedList;

