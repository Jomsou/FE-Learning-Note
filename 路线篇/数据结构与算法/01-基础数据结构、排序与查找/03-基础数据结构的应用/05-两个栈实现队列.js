var Stack = require('../data-structures/02_Stack');

/***
 * 利用2个栈实现一个队列, 只需要实现先进先出的功能
 * @constructor
 */
/**
 * @constructor
 */
var Queue = function () {
    this.stack1 = [];
    this.stack2 = [];
};

/**
 * @param {number} x
 * @returns {void}
 */
Queue.prototype.enqueue = function (x) {
    this.stack1.push(x);
};

/**
 * @returns Number
 */
Queue.prototype.dequeue = function () {
    if (this.stack2.length) {
        return this.stack2.pop();
    } else {
        while (this.stack1.length !== 0) {
            this.stack2.push(this.stack1.pop());
        }
        return this.stack2.pop();
    }
};

/**
 * @returns {number}
 */
Queue.prototype.peek = function () {
    if (this.stack2.length) {
        return this.stack2[this.stack2.length - 1];
    } else {
        return this.stack1[0];
    }

};

/**
 * @returns {boolean}
 */
Queue.prototype.empty = function () {
    return this.stack1.length === 0 && this.stack2.length === 0;
};

var q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.stack1);
console.log(q.stack2);

console.log('----------------------------');

q.enqueue(4);
q.enqueue(5);
console.log(q.dequeue());
console.log(q.stack1);
console.log(q.stack2);

console.log('----------------------------');

console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.stack1);
console.log(q.stack2);

console.log('----------------------------');

