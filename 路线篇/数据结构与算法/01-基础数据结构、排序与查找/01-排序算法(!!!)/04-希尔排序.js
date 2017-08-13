/**
 * 希尔排序
 *
 * Shell Sorting依赖于间隔(step)的选取。
 *
 * 希尔排序的核心理念和插入排序不同,它会首先比较距离较远的元素,而非相邻元素。
 * 使用这种方案可以使离正确位置很远的元素能够快速回到更合适的位置。
 *
 * 可以动态定义每次排序的间隔,但在应用中,通常会提前定义好间隔序列。
 *
 * 希尔排序可以和其他排序算法配合使用,一般使用插入排序。
 *
 * 分组间隔的合理性会对希尔排序的性能造成较大的影响!!!
 * 希尔排序比冒泡排序平均快5倍,比插入排序大致快2倍,但是比快排、归并、堆排序慢的多!!!!
 * 但是比较简单实现,通常适用于数据量在5000以下的场景。。
 */

var generateTestData = require('./00-TestDataGenerator');

var shellSort = function (data, gaps /*array of numbers*/) {
    var l = data.length;

    for (var k = 0; k < gaps.length; k++) {  //最外层循环取得每次的step

        var step = gaps[k];

        //希尔排序内部使用插入排序
        for (var i = step; i < l; i += step) {
            if (data[i - step] > data[i]) {
                var temp = data[i];
                var j = i;
                while (j > 0 && data[j - step] > temp) {
                    data[j] = data[j - step];
                    j -= step;
                }
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

var result = shellSort(data, [10, 4, 1]);
// var result = shellSort(data, [701, 301, 132, 57, 23, 10, 4, 1]);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

console.log(result);
