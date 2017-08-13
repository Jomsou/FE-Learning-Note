/**
 * 283. Move Zeroes
 Given an array nums, write a function to move all 0's to the end of it while
 maintaining the relative order of the non-zero elements.

 For example, given nums = [0, 1, 0, 3, 12], after calling your function,
 nums should be [1, 3, 12, 0, 0].

 Note:
 You must do this in-place without making a copy of the array.
 Minimize the total number of operations.
 * */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

//解法1: 线性时间复杂度,但是使用了额外空间
var moveZeroes = function (nums) {
    if (!nums || !nums.length) {
        return;
    }

    var arr1 = [], arr2 = [];
    for (var i = 0, l = nums.length; i < l; i++) {
        var number = nums.shift();
        if (number !== 0) {
            arr1.push(number);
        } else {
            arr2.push(number);
        }
    }

    for (var i1 = 0, l1 = arr1.length; i1 < l1; i1++) {
        nums.push(arr1[i1]);
    }

    for (var i2 = 0, l2 = arr2.length; i2 < l2; i2++) {
        nums.push(arr2[i2]);
    }
};


//解法2: 记录一个下标，对原数组进行遍历，当非0时，将该数置于该下标内，并将下标值+1,最终从下标到数组尾全部置0.
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function moveZeros2(nums) {
    if (!nums || !nums.length) {
        return;
    }

    var len = nums.length;
    var idx = 0;

    for (var i = 0; i < len; i++) {
        if (nums[i]) {
            nums[idx++] = nums[i];
        }
    }

    for (var j = idx; j < len; j++) {
        nums[j] = 0;
    }
}
