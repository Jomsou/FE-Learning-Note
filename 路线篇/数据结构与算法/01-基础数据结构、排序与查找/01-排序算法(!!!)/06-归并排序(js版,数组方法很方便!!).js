/**
 * 归并排序
 *
 * 如果我们要将一副扑克按照数字大小排序。此前已经有两个人分别将其中的一半排好顺序。
 * 那么我们可以将这两堆扑克向上放好，假设小的牌在上面。此时，我们将看到牌堆中最上的两张牌。

 * 我们取两张牌中小的那张取出放在手中。两个牌堆中又是两张牌暴露在最上面，继续取小的那张放在手中……
 * 直到所有的牌都放入手中，那么整副牌就排好顺序了。这就是归并排序。
 */

var generateTestData = require('./00-TestDataGenerator');

/***
 * js数组方法实现merge非常简洁,但是效率不高,见通用版本的merge方法!!!
 * */
function merge(left, right) {
    var result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left).concat(right);
}

function mergeSort(items) {
    /***
     * 此句为递归结束条件,绝对不能遗漏!!!!
     */
    if (items.length == 1) {
        return items;
    }
    var middle = Math.floor(items.length / 2),
        left = items.slice(0, middle),
        right = items.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}


var data = generateTestData(300000);
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = mergeSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);
