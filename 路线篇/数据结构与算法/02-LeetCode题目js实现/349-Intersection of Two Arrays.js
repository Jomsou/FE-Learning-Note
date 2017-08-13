/**
 * Given two arrays, write a function to compute their intersection.

 Example:
 Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2].

 Note:
 Each element in the result must be unique.
 The result can be in any order.
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    var m = new Map();
    for (var i = 0, l = nums1.length; i < l; i++) {
        if (!m.has(nums1[i])) {
            m.set(nums1[i], 1);
        }
    }

    for (var j = 0, k = nums2.length; j < k; j++) {
        if (m.has(nums2[j])) {
            m.set(nums2[j], m.get(nums2[j]) + 1);
        }
    }

    var result = [];
    for (var key of m.keys()) {
        if (m.get(key) > 1) {
            result.push(key);
        }
    }

    return result;

};

console.log(intersection([1, 2, 2, 3, 1], [2, 2, 3]));
