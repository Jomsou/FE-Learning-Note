/**
 * 快速排序: 快速排序通常被认为是高效，快速等特点是使用V8引擎的实现Array.prototype.sort()上有超过23个项目的数组。
 * 对于少于23个项目，V8采用插入排序法。
 *
 * 快排是处理大数据集最快的算法之一。它是一种分而治之的算法,通过递归的方式将数据集依次分解为包含较小元素和包含
 * 较大元素的不同子序列。不断重复这个步骤直至所有数据有序。
 *
 * 这个算法首先要在数据集中选择一个基准值(pivot),数据排序围绕基准值进行。
 * 将列表中小于基准值的数据移动到一侧,将大于基准值的数据移动到另一侧。
 *
 * 快速排序非常适用于大数据集,处理小数据集反而性能下降。
 */

var generateTestData = require('./00-TestDataGenerator');

/**
 * 交换两个数
 * */
function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

/**
 * 分区操作: 以数组的中位数为基准值!
 * */
function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

/**
 * 快速排序
 * */
function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }

    }
    return items;
}

var data = generateTestData(500000);
// var data = [32, 48, 6, 21, 3];
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = quickSort(data, 0, data.length - 1);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);