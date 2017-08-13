/**
 * 顺序查找
 */

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 23, 45, 55, 44, 22, 33];

function find(array, data) {
    var l = array.length;
    for (var i = 0; i < l; i++) {
        if (data === array[i]) {
            return i;
        }

    }
    if (i === l) {
        return -1;
    }
}

console.log(find(arr, 2));
console.log(find(arr, 33));
console.log(find(arr, 100));

