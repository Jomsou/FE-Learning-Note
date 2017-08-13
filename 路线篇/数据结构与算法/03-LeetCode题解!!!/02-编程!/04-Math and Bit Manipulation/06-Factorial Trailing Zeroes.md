# Factorial Trailing Zeroes

## Question

- leetcode: Factorial Trailing Zeroes | LeetCode OJ
- lintcode: (2) Trailing Zeros

```
Write an algorithm which computes the number of trailing zeros in n factorial.

Example
11! = 39916800, so the out should be 2

Challenge
O(log N) time
```

## 题解1 - Iterative

    找阶乘数中末尾的连零数量，容易想到的是找相乘能为10的整数倍的数，如 2×5, 1×10 等，
    遥想当初做阿里笔试题时遇到过类似的题，当时想着算算5和10的个数就好了，可万万没想到啊，
    25可以变为两个5相乘！真是蠢死了... 根据数论里面的知识，任何正整数都可以表示为它的质因数的乘积wikipedia。
    所以比较准确的思路应该是计算质因数5和2的个数，取小的即可。
    质因数2的个数显然要大于5的个数，故只需要计算给定阶乘数中质因数中5的个数即可。
    原题的问题即转化为求阶乘数中质因数5的个数，首先可以试着分析下100以内的数，再试试100以上的数，
    聪明的你一定想到了可以使用求余求模等方法 :)


## C++

    class Solution {
    public:
        int trailingZeroes(int n) {
            if (n < 0) {
                return -1;
            }
    
            int count = 0;
            for (; n > 0; n /= 5) {
                count += (n / 5);
            }
    
            return count;
        }
    };

## Java

    public class Solution {
        public int trailingZeroes(int n) {
            if (n < 0) {
                return -1;
            }
    
            int count = 0;
            for (; n > 0; n /= 5) {
                count += (n / 5);
            }
    
            return count;
        }
    }

## 源码分析

    异常处理，小于0的数返回-1.
    先计算5的正整数幂都有哪些，不断使用 n / 5 即可知质因数5的个数。
    在循环时使用 n /= 5 而不是 i *= 5, 可有效防止溢出。

## 复杂度分析

    关键在于n /= 5执行的次数，时间复杂度 log5N(以5为底的对数)，使用了count作为返回值，空间复杂度 O(1).


## 题解2 - Recursive

    可以使用迭代处理的程序往往用递归，而且往往更为优雅。递归的终止条件为n <= 0.


## C++

    class Solution {
    public:
        int trailingZeroes(int n) {
            if (n == 0) {
                return 0;
            } else if (n < 0) {
                return -1;
            } else {
                return n / 5 + trailingZeroes(n / 5);
            }
        }
    };

## Java

    public class Solution {
        public int trailingZeroes(int n) {
            if (n == 0) {
                return 0;
            } else if (n < 0) {
                return -1;
            } else {
                return n / 5 + trailingZeroes(n / 5);
            }
        }
    }

## 源码分析

    这里将负数输入视为异常，返回-1而不是0. 注意使用递归时务必注意收敛和终止条件的返回值。
    这里递归层数最多不超过log5n(5为底的对数), 因此效率还是比较高的。

## 复杂度分析

    递归层数最大为 log5n(5为底的对数), 返回值均在栈上，可以认为没有使用辅助的堆空间。