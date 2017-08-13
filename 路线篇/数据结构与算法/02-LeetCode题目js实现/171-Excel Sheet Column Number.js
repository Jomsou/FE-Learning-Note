/**
 * 171. Excel Sheet Column Number
 Given a column title as appear in an Excel sheet,
 return its corresponding column number.

 For example:

 A -> 1
 B -> 2
 C -> 3
 ...
 Z -> 26
 AA -> 27
 AB -> 28
 * */

//注意结果,不是简单相加,而是26进制表示!!!
/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function (s) {
    if (!s || s.trim().length === 0) {
        return 0;
    }

    var obj = {};
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].forEach(function (val, index) {
        obj[val] = index + 1;
    });

    var number = 0;

    for (var i = 0; i < s.length; i++) {
        //js中字符相减'B'-'A'结果为NaN,故不能像下面这样写!!
        // number = 26 * number + s.charAt(i) - 'A' + 1;
        number = 26 * number + obj[s.charAt(i)];
    }

    return number;
};

console.log(titleToNumber('AA'));