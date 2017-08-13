//括号配对检测
/**
 * Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.
 */


/**
 * 利用栈实现,从头到尾扫描字符串的字符,碰到左字符进栈,碰到右字符出栈并匹配。最终栈因为空。
 * @param s
 * @returns {boolean}
 */
var isValid = function (s) {
    var flag = true;
    var obj = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    var arr = [];
    for (var i = 0, l = s.length; i < l; i++) {
        var ch = s[i];
        switch (ch) {
            case '(':
            case '{':
            case '[':
                arr.push(ch);
                break;
            case ')':
            case '}':
            case ']':
                var top = arr.pop();
                if (top !== obj[ch]) {
                    flag = false;
                    break;
                }
                break;
            default:
                break;
        }
    }

    //最终如果栈不为空,表示括号不配对
    if (arr.length) {
        flag = false;
    }

    return flag;
};

console.log(isValid("()[]{"));
console.log(isValid("{()[]}"));
