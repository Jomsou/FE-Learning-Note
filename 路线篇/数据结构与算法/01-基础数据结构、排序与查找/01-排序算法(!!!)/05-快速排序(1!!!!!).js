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
 * 快速排序
 * */
function quickSort(data, l, r) {
    {
        if (l < r) {
            //Swap(s[l], s[(l + r) / 2]); //如果以数组中间的数作为基准值,将中间的这个数和第一个数交换即可

            var i = l, j = r,
                pivot = data[l];  //以数组第一个数作为基准值来分区
            while (i < j) {
                // 从右向左找第一个小于x的数
                while (i < j && data[j] >= pivot) {
                    j--;
                }
                if (i < j) {
                    data[i++] = data[j];
                }

                // 从左向右找第一个大于等于x的数
                while (i < j && data[i] < pivot) {
                    i++;
                }
                if (i < j) {
                    data[j--] = data[i];
                }
            }

            data[i] = pivot;  //将pivot放入正确位置

            // 对左右两边递归调用
            quickSort(data, l, i - 1);
            quickSort(data, i + 1, r);
        }
    }

    return data;
}

var data = generateTestData(20000000);
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = quickSort(data, 0, data.length - 1);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);