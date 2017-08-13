/**
 * 326. Power of Three
 *
 Given an integer, write a function to determine if it is a power of three.

 Follow up:
 Could you do it without using any loop / recursion?
 * */


/**
 *
 *
 这道题让我们判断一个数是不是3的次方数，在LeetCode中，有一道类似的题目Power of Two，
 那道题有个非常简单的方法，由于2的次方数实在太有特点，最高位为1，其他位均为0，所以特别容易，
 而3的次方数没有显著的特点，最直接的方法就是不停地除以3，看最后的余数是否为1，
 要注意考虑输入是负数和0的情况，参见代码如下：

 解法一：
 class Solution {
public:
    bool isPowerOfThree(int n) {
        while (n && n % 3 == 0) {
            n /= 3;
        }
        return n == 1;
    }
};


 题目中的Follow up让我们不用循环，那么有一个投机取巧的方法，由于输入是int，正数范围是0-2^31，
 在此范围中允许的最大的3的次方数为3^19=1162261467，那么我们只要看这个数能否被n整除即可，参见代码如下：

 解法二：
 class Solution {
public:
    bool isPowerOfThree(int n) {
        return (n > 0 && 1162261467 % n == 0);
    }
};


 最后还有一种巧妙的方法，利用对数的换底公式来做，高中学过的换底公式为logab = logcb / logca，
 那么如果n是3的倍数，则log3n一定是整数，我们利用换底公式可以写为log3n = log10n / log103，
 注意这里一定要用10为底数，不能用自然数或者2为底数，否则当n=243时会出错，原因请看这个帖子。
 现在问题就变成了判断log10n / log103是否为整数，在c++中判断数字a是否为整数，我们可以用 a - int(a) == 0 来判断，
 参见代码如下：

 解法三：

 class Solution {
public:
    bool isPowerOfThree(int n) {
        return (n > 0 && int(log10(n) / log10(3)) - log10(n) / log10(3) == 0);
    }
};

 * */

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
    return (n > 0 && parseInt(Math.log10(n) / Math.log10(3)) - Math.log10(n) / Math.log10(3) === 0);
};