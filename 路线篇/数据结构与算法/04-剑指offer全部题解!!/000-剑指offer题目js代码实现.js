//03. 二维数组中的查找
/*
 function findNumber(arr, number) {
 var i = 0, j = arr[0].length;

 while (i < arr.length && j >= 0) {
 if (arr[i][j] === number) {
 return [i, j];
 } else if (arr[i][j] < number) {
 i++;
 } else {
 j--;
 }
 }

 return [-1, -1];  //not found
 }


 var arr = [
 [1, 2, 8, 9],
 [2, 4, 9, 12],
 [4, 7, 10, 13],
 [6, 8, 11, 15]
 ];

 console.log(findNumber(arr, 15));
 console.log(findNumber(arr, 65));*/


// 04. 替换空格
/*
 function replaceSpaces(str) {
 var arr = str.split('');
 var spaceCount = 0;
 var len = arr.length;

 //先遍历一次,得到空格字符的个数
 for (var i = 0, l = len; i < l; i++) {
 if (arr[i] === ' ') {
 spaceCount += 2;
 }
 }

 //从后往前遍历,避免元素的多次移动
 var totalLength = len + spaceCount;
 var index = totalLength - 1;  //从后往前的指针
 for (var j = len - 1; j >= 0; j--) {
 if (arr[j] !== ' ') {
 arr[index] = arr[j];
 index--;
 } else {
 arr[index--] = '0';
 arr[index--] = '2';
 arr[index--] = '%';
 }
 }

 return arr.join('');
 }

 console.log(replaceSpaces('This is a sentence for testing.'));*/

// 14. 调整数组元素,使奇数位于偶数前面
function adjustArray(arr) {
    var low = 0, high = arr.length - 1;

    while (low <= high) {
        while (arr[low] % 2 === 1) {
            low++;
        }

        while (arr[high] % 2 === 0) {
            high--;
        }

        var tmp = arr[low];
        arr[low] = arr[high];
        arr[high] = tmp;
        low++;
        high--;
    }

    return arr;
}

console.log(adjustArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));