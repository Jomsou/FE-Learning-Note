/**
 * 260. Single Number III
 *
 Difficulty: Medium
 Given an array of numbers nums, in which exactly two elements appear only once and
 all the other elements appear exactly twice. Find the two elements that appear only once.

 For example:
 Given nums = [1, 2, 1, 3, 2, 5], return [3, 5].

 Note:
 The order of the result is not important. So in the above example, [5, 3] is also correct.
 Your algorithm should run in linear runtime complexity.
 Could you implement it using only constant space complexity?
 * */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
//解法一: 最直观的解法,使用一个额外的数据结构来保存
var singleNumber = function (nums) {
    if (!nums || !nums.length) {
        return null;
    }

    var obj = {};

    for (var i = 0, l = nums.length; i < l; i++) {
        var num = nums[i];
        if (!obj.hasOwnProperty(num)) {
            obj[num] = num;
        } else {
            delete obj[num];
        }
    }

    var result = [];
    for (var n in obj) {
        if (obj.hasOwnProperty(n)) {
            result.push(obj[n]);
        }
    }

    return result;
};


//解法二: 使用位运算(参考网上)

console.log(singleNumber([1, 2, 3, 4, 5, 6, 7, 5, 4, 3, 2, 1,8]));