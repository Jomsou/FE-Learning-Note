/**
 * 26. Remove Duplicates from Sorted Array
 *
 Difficulty: Easy
 Given a sorted array, remove the duplicates in place such that each element appear
 only once and return the new length.

 Do not allocate extra space for another array, you must do this in place with
 constant memory.

 For example,
 Given input array nums = [1,1,2],

 Your function should return length = 2, with the first two elements of
 nums being 1 and 2 respectively. It doesn't matter what you leave beyond the new length.
 * */

/**
 * @param {number[]} nums
 * @return {number}
 */


/***
 *
 * 我们只需对对组遍历一次，并设置一个计数器，每当遍历前后元素不相同，计数器加1，
 * 并将计数器对应在数组中位置定位到当前遍历的元素。
 */
var removeDuplicates = function (nums) {
    var len = nums.length;

    if (!nums || !len) {
        return 0;
    }

    var count = 1;

    for (var i = 1; i < len; i++) {
        if (nums[i] === nums[i - 1]) {
            continue;
        } else {
            nums[count] = nums[i];
            count++;
        }
    }

    nums.splice(count - 1, len - count);  //删除最后重复个数的数组项

    return count;
};

removeDuplicates([1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9]);