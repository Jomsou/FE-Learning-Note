/**
 * 使用两个队列实现栈的后进先出功能
 */

function Stack() {
    this.queue1 = [];
    this.queue2 = [];
}

Stack.prototype.push = function (ele) {
    this.queue1.push(ele);  //进栈时先进入到第一个队列
}

/**
 * 弹出时先从一个队列中出队前n-1个元素入队到另一个队列,然后出队最后一个元素即可;
 * 两个队列交替进行!
 * */
Stack.prototype.pop = function () {
    if (this.queue1.length) {
        while (this.queue1.length > 1) {
            var e = this.queue1.shift();
            this.queue2.push(e);
        }
        return this.queue1.shift();  //得到最后一个元素
    } else {
        while (this.queue2.length > 1) {
            var e = this.queue2.shift();
            this.queue1.push(e);
        }
        return this.queue2.shift();
    }
}


var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop());  //3
console.log(stack.pop());  //2

stack.push(4);
stack.push(5);
console.log(stack.pop());  //5
console.log(stack.pop());  //4
console.log(stack.pop());  //1

stack.push(6);
stack.push(7);
console.log(stack.pop());  //7
console.log(stack.pop());  //6
console.log(stack.pop());  //undefined
