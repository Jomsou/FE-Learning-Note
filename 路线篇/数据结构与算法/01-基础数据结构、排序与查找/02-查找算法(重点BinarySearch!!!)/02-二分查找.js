/**
 * 二分法查找:适用于有序的数据
 */

var arr = [];
for (var m = 1; m <= 100; m++) {
    arr.push(m);
}

//二分查找
function binarySearch(array, data) {
    var l = array.length;
    var low = 0,
        high = l - 1;

    while (low <= high) {
        var middle = Math.floor((low + high) / 2);

        if (data < array[middle]) {
            high = middle - 1;
        } else if (data > array[middle]) {
            low = middle + 1;
        } else {
            return middle;
        }
    }

    return -1;
}

console.log(binarySearch(arr, 50));
console.log(binarySearch(arr, 33));
console.log(binarySearch(arr, 1));
console.log(binarySearch(arr, 100));
console.log(binarySearch(arr, 1000));
