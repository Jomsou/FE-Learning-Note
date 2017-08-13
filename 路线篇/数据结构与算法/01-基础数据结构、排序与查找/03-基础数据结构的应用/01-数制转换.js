var Stack = require('../data-structures/02_Stack');


/***
 * 利用栈来做数制转换
 * @param number  待转换的数字,十进制数
 * @param base   要转换成的进制(10进制以内)
 */
var numericalTransform = function (number, base) {
    if (typeof number !== 'number' || typeof base !== 'number') {
        console.log('Parameter error!');
        return -1;
    }

    var stack = new Stack();
    do {
        stack.push(number % base);
        number = Math.floor(number / base);
    } while (number !== 0)

    //依次出栈,得到结果
    var result = '';
    while (stack.length()) {
        result += stack.pop();
    }
    return result;
}

console.log(numericalTransform(231, 8));
console.log(numericalTransform(65, 2));