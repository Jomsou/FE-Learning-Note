/**
 * 169. Majority Element

 Given an array of size n, find the majority element.
 The majority element is the element that appears more than ⌊ n/2 ⌋ times.

 You may assume that the array is non-empty and the majority element always exist in the array.
 * */


/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    if (!nums || !nums.length) {
        return null;
    }

    var number = 0;
    var count = 0;

    for (var i = 0, l = nums.length; i < l; i++) {
        if (count === 0) {
            number = nums[i];
            count++;
        } else {
            if (nums[i] === number) {
                count++;
            } else {
                count--;
            }
        }
    }

    return number;

};