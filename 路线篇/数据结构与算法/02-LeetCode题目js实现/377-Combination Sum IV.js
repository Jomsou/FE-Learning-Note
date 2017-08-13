/**
 * 377. Combination Sum IV
 *
 Difficulty: Medium
 Given an integer array with all positive numbers and no duplicates,
 find the number of possible combinations that add up to a positive integer target.

 Example:

 nums = [1, 2, 3]
 target = 4

 The possible combination ways are:
 (1, 1, 1, 1)
 (1, 1, 2)
 (1, 2, 1)
 (1, 3)
 (2, 1, 1)
 (2, 2)
 (3, 1)

 Note that different sequences are counted as different combinations.

 Therefore the output is 7.
 Follow up:
 What if negative numbers are allowed in the given array?
 How does it change the problem?
 What limitation we need to add to the question to allow negative numbers?
 * */


/**
 * 思路：

 dp，dp[i]表示当target为i 时，有多少种组合。

 状态转移方程：dp[i]=Σdp[i-nums[k]]  0<=k<=nums.length

 当然，需要考虑当i-nums[k]为0时，表示数组中有target，则此时dp[i]为1,

 时间复杂度O(n^2).


 这道题的真正解法应该是用DP来做，解题思想有点像之前爬梯子的那道题Climbing Stairs，
 我们需要一个一维数组dp，其中dp[i]表示目标数为i的解的个数，然后我们从1遍历到target，
 对于每一个数i，遍历nums数组，如果i>=x, dp[i] += dp[i - x]。
 这个也很好理解，比如说对于[1,2,3] 4，这个例子，当我们在计算dp[3]的时候，3可以拆分为1+x，而x即为dp[2]，
 3也可以拆分为2+x，此时x为dp[1]，3同样可以拆为3+x，此时x为dp[0]，我们把所有的情况加起来就是组成3的所有情况了
 * */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    if (!nums || !nums.length) {
        return 0;
    }

    //初始化
    var dp = []; //new Array(target + 1);
    for (var n = 0; n < target + 1; n++) {
        dp[n] = 0;
    }

    for (var i = 0; i <= target; i++) {
        for (var k = 0; k < nums.length; k++) {
            if (i - nums[k] > 0) {
                dp[i] += dp[i - nums[k]];
            } else if (i - nums[k] == 0) {
                dp[i] += 1;
            }

        }
    }
    return dp[target];
};

console.log(combinationSum4([1, 2, 3], 4));