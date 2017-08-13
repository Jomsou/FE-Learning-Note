/**
 * 递归
 * */

//例1: 求1+2+...+n的和
function addFrom1ToN(n) {
    if (n === 1) {
        return 1;
    }

    return addFrom1ToN(n - 1) + n;
}
// console.log(addFrom1ToN(100));


//例2: 逆序打印链表
function printListInReverseOrder(arr) {
    if (arr && arr.length) {
        var a = arr.slice(1);
        if (a.length === 1) {
            console.log(a[0]);
        } else {
            printListInReverseOrder(a);
        }
    }
    console.log(arr[0]);
}

var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
// printListInReverseOrder(data);

//例3: Fibonacci数列非递归解法
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    var num1 = 1, num2 = 1;
    var result;
    for (var i = 3; i <= n; i++) {
        result = num1 + num2;
        num1 = num2;
        num2 = result;
    }

    return result;
}

console.log(fibonacci(100));