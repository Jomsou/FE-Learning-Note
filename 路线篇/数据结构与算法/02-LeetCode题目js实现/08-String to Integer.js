/**
 * @param {string} str
 * @return {number}
 */
function myAtoi(str) {
    str = str.trim();

    if (!str) {
        return 0;
    }

    //Not a number
    if (str.length === 1 && !(str[0] >= '0' && str[0] <= '9')) {
        return 0;
    }

    var length = str.length;
    var i = 0;
    var signal = 1;
    if (str[0] === '-') {
        signal = -1;
        i = 1;   // loop index increase
    } else if (str[0] === '+') {
        i = 1;   // loop index increase
    }
    var result = 0;
    for (; i < length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            result = result * 10 + (str[i] - '0');
        } else {
            //return 0;
            //-0012a42 -> expected: -12
            break;
        }
    }

    var finalResult = signal * result;

//        if (finalResult > Math.pow(2, 31) || finalResult < -1 * Math.pow(2, 31)) {
//            return 0;
//        }

    var MAX_INT_NUMBER = Math.pow(2, 31) - 1;
    var MIN_INT_NUMBER = -1 * Math.pow(2, 31);

    if (finalResult > MAX_INT_NUMBER) {
        finalResult = MAX_INT_NUMBER;
    }
    if (finalResult < MIN_INT_NUMBER) {
        finalResult = MIN_INT_NUMBER;
    }

    return finalResult;
};

console.log(myAtoi("2147483648"));
console.log(myAtoi("-234325345"));