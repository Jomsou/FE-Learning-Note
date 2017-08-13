/***
 * 生成测试数据
 * */

var generateTestData = function (n) {
    var number = n || 1000;
    var arr = [];
    for (var i = 0; i < number; i++) {
        var data = Math.floor(Math.random() * number);
        arr.push(data);
    }

    return arr;
}


module.exports = generateTestData;