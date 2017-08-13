function Stack() {
    //私有成员
    this._data = [];
    this._top = -1;
}

Stack.prototype = {
    constructor: Stack,

    push: function (ele) {
        this._data.push(ele);
        this._top++;
    },

    pop: function () {
        this._top--;
        return this._data.pop();
    },

    peek: function () {
        return this._data[this._top];
    },

    length: function () {
        return this._data.length;
    },

    clear: function () {
        data = [];
        top = -1;
    }
}


/*
 var stack = new Stack();
 stack.push(1);
 stack.push(2);
 stack.push(3);
 console.log(stack);

 var p = stack.pop();
 console.log(p);
 console.log(stack);
 console.log(stack.peek());
 */

module.exports = Stack;