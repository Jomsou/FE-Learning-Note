/**
 * 插入排序:将整个数据集看作两个部分,前面已排序的部分和后面未排序的部分。
 * 每次从未排序的部分中选择第一个数,插入到前面已排序部分的合适位置。
 *
 * 速度很慢!一般在数据集不超过1000的情况下使用。。
 */

var generateTestData = require('./00-TestDataGenerator');

//经典插入排序
var insertSort = function (data) {
    for (var i = 1; i < data.length; i++) {
        if (data[i - 1] > data[i]) {
            var temp = data[i];
            var j = i;
            while (j > 0 && data[j - 1] > temp) {
                data[j] = data[j - 1];
                j--;
            }
            data[j] = temp;
        }
    }

    return data;
}

var data = generateTestData(10);
console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = insertSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

console.log(result);
