/**
 * 217. Contains Duplicate
 *
 Given an array of integers, find if the array contains any duplicates.
 Your function should return true if any value appears at least twice in the array,
 and it should return false if every element is distinct.
 * */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
    if (!nums || !nums.length) {
        return false;
    }

    var obj = {};
    for (var i = 0, l = nums.length; i < l; i++) {
        var num = nums[i];
        if (!obj.hasOwnProperty(num)) {
            obj[num] = 1;
        } else {
            return true;
        }
    }

    return false;
};