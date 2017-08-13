/**
 * 219. Contains Duplicate II
 *
 Difficulty: Easy
 Given an array of integers and an integer k,
 find out whether there are two distinct indices i and j in the array
 such that nums[i] = nums[j] and the difference between i and j is at most k.
 * */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    if (!nums || !nums.length) {
        return false;
    }

    /**
     * 使用map,类似于01-Two Sum
     * */

    var map = new Map();

    for (var i = 0, l = nums.length; i < l; i++) {
        var num = nums[i];

        if (map.get(num) != undefined && i - map.get(num) <= k) {
            return true;
        } else {
            map.set(num, i);
        }
    }

    console.log(map);
    return false;
};

// console.log(containsNearbyDuplicate([1, 2, 3, 4, 2, 5], 5));
// console.log(containsNearbyDuplicate([1, 2, 3, 4, 2, 5], 2));
console.log(containsNearbyDuplicate([-1, -1], 1));