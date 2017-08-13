function Queue() {
    this._ds = [];
}

Queue.prototype = {
    constructor: Queue,

    enqueue: function (ele) {
        this._ds.push(ele);
    },

    dequeue: function () {
        return this._ds.shift();
    },

    front: function () {
        return this._ds[0];
    },

    rear: function () {
        return this._ds[this._ds.length - 1];
    },

    isEmpty: function () {
        return this._ds.length <= 0;
    },

    clear: function () {
        this._ds = [];
    },

    size: function () {
        return this._ds.length;
    }
}

/*
 var queue = new Queue();
 queue.enqueue(1);
 queue.enqueue(2);
 queue.enqueue(3);
 queue.enqueue(4);
 queue.enqueue(5);
 console.log(queue.dequeue());  //1
 console.log(queue.dequeue());  //2
 console.log(queue.front());    //3
 console.log(queue.rear());     //5
 console.log(queue.size());     //3
 */

module.exports = Queue;