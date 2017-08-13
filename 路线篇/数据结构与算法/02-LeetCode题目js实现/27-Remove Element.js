/**
 * 27. Remove Element
 *
 Given an array and a value, remove all instances of that value in place and
 return the new length.

 Do not allocate extra space for another array, you must do this in place with constant memory.

 The order of elements can be changed. It doesn't matter what you leave beyond the new length.

 Example:
 Given input array nums = [3,2,2,3], val = 3

 Your function should return length = 2, with the first two elements of nums being 2.
 * */

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

//自己实现的思路:
//    借鉴283-Move Zeros的思路,
//    记录一个下标，对原数组进行遍历，当不为val时，将该数置于该下标内，并将下标值+1,最终返回下标值.
var removeElement = function (nums, val) {
    if (!nums || !nums.length) {
        return 0;
    }

    if (val == null) {
        return nums && nums.length;
    }

    var index = 0;
    for (var i = 0, l = nums.length; i < l; i++) {
        var n = nums[i];
        if (n !== val) {
            nums[index++] = n;
        }
    }

    return index;
};

console.log(removeElement([4, 4, 0, 1, 0, 2, 0], 0));