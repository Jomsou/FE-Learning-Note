/**
 * 88. Merge Sorted Array
 *
 Difficulty: Easy
 Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

 Note:
 You may assume that nums1 has enough space (size that is greater or equal to m + n)
 to hold additional elements from nums2.
 The number of elements initialized in nums1 and nums2 are m and n respectively.
 * */

/**
 * 思路:
 * 从前往后比较会导致元素重复移动,可以从后往前比较!
 * */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    var index = m + n - 1;

    var idx1 = m - 1,
        idx2 = n - 1;

    while (idx1 >= 0 && idx2 >= 0) {
        if (nums1[idx1] > nums2[idx2]) {
            nums1[index--] = nums1[idx1--];
        } else {
            nums1[index--] = nums2[idx2--];
        }
    }

    while (idx1 >= 0) {
        nums1[index--] = nums1[idx1--];
    }

    while (idx2 >= 0) {
        nums1[index--] = nums2[idx2--];
    }

    console.log(nums1);
};

merge([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3);