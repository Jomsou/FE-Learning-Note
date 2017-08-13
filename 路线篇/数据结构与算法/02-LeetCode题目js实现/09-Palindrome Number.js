//判断一个数是否为回文数
var isPalindrome = function (x) {
    var strNumber = x + '';
    var length = strNumber.length;
    var center = Math.floor(length / 2);
    var flag = true;
    for (var i = 0; i < center; i++) {
        if (strNumber[i] !== strNumber[length - 1 - i]) {
            flag = false;
            break;
        }
    }

    return flag;
};

console.log(isPalindrome(12345));
console.log(isPalindrome(12321));
