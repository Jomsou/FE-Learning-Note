/**
 * 归并排序
 *
 * 如果我们要将一副扑克按照数字大小排序。此前已经有两个人分别将其中的一半排好顺序。
 * 那么我们可以将这两堆扑克向上放好，假设小的牌在上面。此时，我们将看到牌堆中最上的两张牌。

 * 我们取两张牌中小的那张取出放在手中。两个牌堆中又是两张牌暴露在最上面，继续取小的那张放在手中……
 * 直到所有的牌都放入手中，那么整副牌就排好顺序了。这就是归并排序。
 */

var generateTestData = require('./00-TestDataGenerator');

function merge(a1, a2) {
    var result = [];
    var i = 0,
        j = 0,
        l1 = a1.length,
        l2 = a2.length;

    while (i < l1 && j < l2) {
        if (a1[i] < a2[j]) {
            result.push(a1[i++]);
        } else {
            result.push(a2[j++]);
        }
    }

    if (i < l1) {
        for (; i < l1; i++) {
            result.push(a1[i]);
        }
    }

    if (j < l2) {
        for (; j < l2; j++) {
            result.push(a2[j]);
        }
    }

    return result;
}

function mergeSort(data) {
    /***
     * 此句为递归结束条件,绝对不能遗漏!!!!
     */
    if (data.length === 1) {
        return data;
    }

    var middle = Math.floor(data.length / 2);
    var left = data.slice(0, middle),
        right = data.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

var data = generateTestData(3000000);
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = mergeSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);

