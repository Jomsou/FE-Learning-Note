/**
 * 选择排序
 *
 * 选择排序是先找到起始数组中最小的元素，将它交换到i=0；
 * 然后寻找剩下元素中最小的元素，将它交换到i=1的位置…… 直到找到第二大的元素，将它交换到n-2的位置。
 * 这时，整个数组的排序完成。
 */
var generateTestData = require('./00-TestDataGenerator');

var selectionSort = function (data) {
    // var l = data.length;
    // for (var i = 0; i <= l - 2; i++) {
    //     for (var j = i + 1; j <= l - 1; j++) {
    //         if (data[j] < data[i]) {
    //             var tmp = data[i];
    //             data[i] = data[j];
    //             data[j] = tmp;
    //         }
    //     }
    // }

    var l = data.length,
        min_index;

    for (var i = 0; i <= l - 2; i++) {
        min_index = i;

        //在后面的部分中找到最小值得index
        for (var j = i + 1; j <= l - 1; j++) {
            if (data[j] < data[min_index]) {
                min_index = j;
            }
        }

        //将最小值交换到未排序部分的头部
        var tmp = data[i];
        data[i] = data[min_index];
        data[min_index] = tmp;
    }

    return data;
}

var data = generateTestData(100000);
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = selectionSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);