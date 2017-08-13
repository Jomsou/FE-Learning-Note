/**
 * Find the contiguous subarray within an array (containing at least one number)
 * which has the largest sum.

 For example, given the array [−2,1,−3,4,−1,2,1,−5,4],
 the contiguous subarray [4,−1,2,1] has the largest sum = 6.
 * /

 /**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    var length = nums.length;
    if (!nums || !length) {
        return 0;
    }

    var result = 0;
    var largestNumber = nums[0];   //保存最大数,初始化为数组第一个数
    //逐个往后累加,如果前面的累加和小于0,则舍弃(因为前面的负数与当前数相加后和肯定会变小,小于当前数),从当前数再开始累加;否则一直累加。 过程中还得记录每次的最大数
    for (var i = 0; i < length; i++) {
        if (result <= 0) {
            result = nums[i];
        } else {
            result += nums[i];
        }

        if (result > largestNumber) {
            largestNumber = result;   //更新当前最大数
        }
    }

    return largestNumber;
};

var array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// var array = [-1];
console.log(maxSubArray(array));
