var Stack = require('../data-structures/02_Stack');

/***
 * 使用栈来判断一个数是否为回文数
 * @param number
 * @returns {boolean}
 */
var isPalindromic = function (number) {
    if (!number || number < 0) {
        return false;
    }
    if (typeof number !== 'number') {
        console.warn('expect a number!');
        return false;
    }

    var stack = new Stack();
    var str = number + '';
    for (var i = 0, l = str.length; i < l; i++) {
        stack.push(str[i]);
    }

    var destStr = '';
    while (stack.length()) {
        destStr += stack.pop();
    }

    if (destStr === str) {
        return true;
    }
    return false;
}


console.log(isPalindromic(-125));
console.log(isPalindromic('12321'));
console.log(isPalindromic(12321));