/**
 * Created by Edgar.yjb on 16/7/4.
 * 链表实现
 */

//节点类
var Node = function (element) {
    this.element = element;
    this.next = null;
}


//单链表
function LinkedList() {
    this._head = new Node();
}

LinkedList.prototype = {
    constructor: LinkedList,

    constructList: function (elements/*array*/) {
        if (!elements || !elements.length) {
            return this._head;
        }

        var head = this._head;
        for (var i = 0, l = elements.length; i < l; i++) {
            var node = new Node(elements[i]);
            node.next = null;
            head.next = node;
            head = node;
        }
    },

    insert: function (newElement, afterElement) {
        var after = this.find(afterElement);
        if (!after) {
            console.log('cannot find element: ' + afterElement + ' in this list!');
            return;
        }
        var node = new Node(newElement);
        node.next = after.next;
        after.next = node;
    },

    remove: function (element) {
        /*
         //不知道待删除节点的前一个节点,
         // 在O(1)的时间复杂度内删除该节点!!!
         //但这样删除最后一个元素可能有问题?
         var foundNode = this.find(element);
         if (foundNode) {
         //将待删除元素的下一个节点复制到当前节点,然后删除下一个节点即可!
         foundNode.element = foundNode.next ? foundNode.next.element : null;
         foundNode.next = foundNode.next ? foundNode.next.next : null;
         }
         */
        var h = this._head;
        while (h.next && h.next.element !== element) {
            h = h.next;
        }
        if (h.next) {
            h.next = h.next.next;
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
    }

}

/*
 var list = new LinkedList();
 list.constructList([1, 2, 3, 4, 5, 6]);
 list.display();

 console.log('-------------------------------------------');

 console.log(list.find(5));
 console.log(list.find(6));
 console.log(list.find(7));

 console.log('-------------------------------------------');

 list.insert(7, 3);
 list.display();

 console.log('-------------------------------------------');

 list.insert(8, 10);
 list.display();

 console.log('-------------------------------------------');

 list.remove(7);
 list.display();

 console.log('-------------------------------------------');

 list.remove(6);
 list.remove(2);
 list.display();

 console.log('-------------------------------------------');
 */

module.exports = LinkedList;