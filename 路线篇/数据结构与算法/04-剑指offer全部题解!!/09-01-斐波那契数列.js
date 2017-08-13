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