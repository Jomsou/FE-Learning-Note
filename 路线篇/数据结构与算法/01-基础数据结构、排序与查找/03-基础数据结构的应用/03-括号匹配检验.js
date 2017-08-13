var Stack = require('../data-structures/02_Stack');

/***
 * 输入一个字符串,判断其中的括号是否正确配对,只包含'()','[]','{}'这三种括号
 * @param str
 */
var bracketsMatch = function (str) {
    if (!str || str.length <= 0) {
        return false;
    }

    var map = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    var stack = new Stack();

    for (var i = 0, l = str.length; i < l; i++) {
        var ch = str[i];

        if (ch === '(' || ch === '[' || ch === '{') {
            stack.push(ch);  //遇到左括号,进栈
        }

        if (ch === ')' || ch === ']' || ch === '}') {
            var c = stack.pop();   //遇见右括号,出栈
            if (c !== map[ch]) {
                return false;
            }
        }
    }

    if (stack.length()) {   //若最后栈不为空,表示不配对
        return false;
    }

    return true;
}

console.log(bracketsMatch('(1+2)*3-[(4+5)*(3+2)]'));
console.log(bracketsMatch('{[()()()]}'));
console.log(bracketsMatch('{[()()()]}}'));
console.log(bracketsMatch('[])('));