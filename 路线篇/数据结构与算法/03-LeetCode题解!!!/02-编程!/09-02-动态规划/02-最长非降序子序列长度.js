/**
 * 一个序列有N个数：A[1],A[2],…,A[N]，
 * 求出最长非降子序列的长度(LIS: Longest Increasing Subsequence)。
 * */

/**
 * 假如我们考虑求A[1],A[2],…,A[i]的最长非降子序列的长度，其中i<N，
 那么上面的问题变成了原问题的一个子问题(问题规模变小了，你可以让i=1,2,3等来分析) 然后我们定义d(i)，
 表示前i个数中以A[i]结尾的最长非降子序列的长度。

 OK， 对照“入门”中的简单题，你应该可以估计到这个d(i)就是我们要找的状态。
 如果我们把d(1)到d(N)都计算出来，那么最终我们要找的答案就是这里面最大的那个。
 状态找到了，下一步找出状态转移方程。

 为了方便理解我们是如何找到状态转移方程的，我先把下面的例子提到前面来讲。
 如果我们要求的这N个数的序列是：5，3，4，8，6，7

 根据上面找到的状态，我们可以得到：（下文的最长非降子序列都用LIS表示）

 前1个数的LIS长度d(1)=1(序列：5)
 前2个数的LIS长度d(2)=1(序列：3；3前面没有比3小的)
 前3个数的LIS长度d(3)=2(序列：3，4；4前面有个比它小的3，所以d(3)=d(2)+1)
 前4个数的LIS长度d(4)=3(序列：3，4，8；8前面比它小的有3个数，所以 d(4)=max{d(1),d(2),d(3)}+1=3)
 OK，分析到这，我觉得状态转移方程已经很明显了，如果我们已经求出了d(1)到d(i-1)，
 那么d(i)可以用下面的状态转移方程得到：

 d(i) = max{1, d(j)+1},其中j<i,A[j]<=A[i]

 用大白话解释就是，想要求d(i)，就把i前面的各个子序列中， 最后一个数不大于A[i]的序列长度加1，
 然后取出最大的长度即为d(i)。 当然了，有可能i前面的各个子序列中最后一个数都大于A[i]，那么d(i)=1，
 即它自身成为一个长度为1的子序列。
 * */

/***
 *
 * @param nums
 * @return Number
 */
var LIS = function (nums) {
    if (!nums) {
        return 0;
    }

    var len = nums.length;
    var dp = [];
    var result = 1;

    //初始化dp数组
    for (var n = 0; n < len; n++) {
        dp[n] = 1;
    }

    if (len === 0) {
        return 0;
    }

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < i; j++) {
            if (nums[j] <= nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                if (dp[i] > result) {
                    result = dp[i];
                }
            }
        }
    }
    return result;//dp[len - 1];
}

// console.log(LIS([5]));  //1
// console.log(LIS([5, 3]));  //1
// console.log(LIS([5, 3, 4]));  //2
// console.log(LIS([5, 3, 4, 8])); //3
// console.log(LIS([5, 3, 4, 8, 6])); //3
// console.log(LIS([5, 3, 4, 8, 6, 7])); //4
// console.log(LIS([1, 2, 3, 4])); //4
// console.log(LIS([1, 1, 1])); //4
// console.log(LIS([1, 1, 3, 2])); //4
// console.log(LIS([1, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9]));


function test(nums) {
    var max = nums[0], count = 1;
    for (var i = 1, l = nums.length; i < l; i++) {
        if (nums[i] > max) {
            count++;
            max = nums[i];
        }
    }

    return count;
}

console.log(test([1, 2, 3, 4]));
console.log(test([1, 1, 1]));
console.log(test([1, 1, 3, 2]));
console.log(test([1, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
