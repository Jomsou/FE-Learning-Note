/**
 * 300. Longest Increasing Subsequence
 *
 Difficulty: Medium
 Given an unsorted array of integers, find the length of longest increasing subsequence.

 For example,
 Given [10, 9, 2, 5, 3, 7, 101, 18],
 The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.
 Note that there may be more than one LIS combination,
 it is only necessary for you to return the length.

 Your algorithm should run in O(n^2) complexity.

 Follow up: Could you improve it to O(n log n) time complexity?
 * */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    if (!nums) {
        return 0;
    }

    var len = nums.length;
    if (len === 0) {
        return 0;
    }

    var maxLen = 1;
    var dp = new Array(len);
    for (var k = 0; k < len; k++) {
        dp[k] = 1;
    }
    for (var i = 1; i < len; i++) {
        for (var j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                if (dp[i] > maxLen) {
                    maxLen = dp[i];
                }
            }
        }
    }

    return maxLen;
};