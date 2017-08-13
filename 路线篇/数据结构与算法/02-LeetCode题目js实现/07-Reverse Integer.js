function reverse(x) {
    //转换成字符串的方法不能AC,因为翻转后的字符串转换为整型时可能溢出!!!
    /*var str = x + "";
     var operator, arr = str.split('');
     if (str.startsWith("-")) {
     operator = str[0];
     arr = str.substr(1).split('');
     }
     if (str.startsWith("+")) {
     arr = str.substr(1).split('');
     }

     var length = arr.length;
     var center = Math.floor(length / 2);
     for (var i = 0; i < center; i++) {
     var tmp = arr[i];
     arr[i] = arr[length - i - 1];
     arr[length - i - 1] = tmp;
     }

     var resultStr = operator ? operator + arr.join('') : arr.join('');
     return parseInt(resultStr, 10);*/


    //一个比较保险的方法，就是计算的时候采用long类型，计算完毕后再看是否超过了整型的上界或下界，
    // 超过了则返回整型的最大值或最小值，否则直接强制转换为整型后返回即可
    if (x === 0) return 0;
    var isNegative = x < 0 ? true : false;   //是不是负数
    if (isNegative) {
        x = x * -1;  //负数转换成正数计算
    }

    var result = 0;
    while (true) {
        result += x % 10;
        x = Math.floor(x / 10);

        if (x !== 0) {
            result *= 10;
        } else {
            break;
        }
    }

    //结果
    if (isNegative) {
        result *= -1;
    }
    //判断js整型值范围
    if (result > Math.pow(2, 31) || result < -1 * Math.pow(2, 31)) {
        return 0;
    }
    return result;
};

console.log(reverse(10));
console.log(reverse(-123));
console.log(reverse(12345));
console.log(reverse(+12345));
//    console.log(reverse(1));