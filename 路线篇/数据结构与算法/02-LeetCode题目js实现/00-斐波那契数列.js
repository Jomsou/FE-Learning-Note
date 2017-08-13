function fibonacci(n) {
    //递归,速度慢的不行,n到50几乎就无法算出,可能栈溢出!!!
//        if (n <= 0) {
//            return 0;
//        }
//
//        if (n == 1) {
//            return 1;
//        }
//
//        return fibonacci(n - 1) + fibonacci(n - 2);

    if (n <= 0) {
        return 0;
    }

    if (n == 1) {
        return 1;
    }

    var n1 = 0, n2 = 1, result;
    for (var i = 2; i <= n; i++) {
        result = n1 + n2;
        n1 = n2;
        n2 = result;
    }

    return result;
}

console.log(fibonacci(50));