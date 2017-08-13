/**
 * 189. Rotate Array
 *
 Difficulty: Easy
 Rotate an array of n elements to the right by k steps.

 For example, with n = 7 and k = 3, the array [1,2,3,4,5,6,7] is rotated to [5,6,7,1,2,3,4].

 Note:
 Try to come up as many solutions as you can, there are at least 3 different ways
 to solve this problem.
 * */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    if (!nums) {
        return;
    }

    var len = nums.length;

    if (k > len) {
        nums = nums.reverse();
    } else {
        var tmp = [];

        for (var i = len - k; i < len; i++) {
            tmp.push(nums[i]);
        }

        for (var j = 0; j < len - k; j++) {
            tmp.push(nums[j]);
        }

        for (var m = 0; m < len; m++) {
            nums[m] = tmp[m];
        }
    }

    console.log(nums);
};

rotate([1, 2, 3, 4, 5, 6, 7], 3);
rotate([1, 2, 3], 4);

//不通过: LeetCode上输入[1,2,3],4 期望返回[3,1,2] ???