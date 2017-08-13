/***
 * 冒泡排序: 最慢的排序算法,基本上用不着!!!
 * */

var generateTestData = require('./00-TestDataGenerator');

var bubbleSort = function (data) {

    for (var i = 0; i < data.length; i++) {
        for (var j = i + 1; j < data.length; j++) {
            if (data[j] < data[i]) {
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }

    return data;
}

var data = generateTestData(20);
console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = bubbleSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

console.log(result);
