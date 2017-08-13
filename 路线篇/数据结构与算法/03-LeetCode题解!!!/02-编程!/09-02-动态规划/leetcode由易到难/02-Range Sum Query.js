/**
 * 303. Range Sum Query - Immutable
 *
 Difficulty: Easy
 Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j),
 inclusive.

 Example:
 Given nums = [-2, 0, 3, -5, 2, -1]

 sumRange(0, 2) -> 1
 sumRange(2, 5) -> -1
 sumRange(0, 5) -> -3
 Note:
 You may assume that the array does not change.
 There are many calls to sumRange function.
 * */


/**
 * Your NumArray object will be instantiated and called as such:
 * var numArray = new NumArray(nums);
 * numArray.sumRange(0, 1);
 * numArray.sumRange(0, 2);
 */

/**
 * @constructor
 * @param {number[]} nums
 */
var NumArray = function (nums) {
    this.nums = nums || [];
    this.sums = [];

    if (this.nums.length == 0) {
        this.sums = [0];
    } else {
        this.sums[0] = nums[0];
        for (var i = 1; i < nums.length; i++
        ) {
            this.sums[i] = this.sums[i - 1] + nums[i];
        }
    }
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
    //由于会被多次调用,下面这种方法会导致每次重复计算,运行会超时
    //正确的做法是利用DP的思想,把每次计算的结果缓存起来!
    /**
     var sum = 0;
     for (; i <= j; i++) {
        sum += this.nums[i];
    }

     return sum;
     */

    if (!this.nums.length) return 0;

    if (i >= this.sums.length || j >= this.sums.length || i > j) {
        return 0;
    } else if (i == 0) {
        return this.sums[j];
    } else {
        return this.sums[j] - this.sums[i - 1];
    }

};


var numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2));
console.log(numArray.sumRange(2, 5));

