# Backpack

## Question

- lintcode: (92) Backpack

```
Problem Statement

Given n items with size A_i, an integer m denotes the size of a backpack. 
How full you can fill this backpack?

Example
If we have 4 items with size [2, 3, 5, 7], the backpack size is 11, 
we can select [2, 3, 5], so that the max size we can fill this backpack is 10. 
If the backpack size is 12. we can select [2, 3, 7] so that we can fulfill the backpack.
You function should return the max size we can fill in the given backpack.

Note
You can not divide any item into small pieces.

Challenge
O(n x m) time and O(m) memory.
O(n x m) memory is also acceptable if you do not know how to optimize memory.
```

## 题解1

    本题是典型的01背包问题，每种类型的物品最多只能选择一件。
    参考前文 Knapsack 中总结的解法，这个题中可以将背包的 size 理解为传统背包中的重量；
    题目问的是能达到的最大 size, 故可将每个背包的 size 类比为传统背包中的价值。
    
    考虑到数组索引从0开始，故定义状态bp[i + 1][j]为前 i 个物品中选出重量不超过j时总价值的最大值。
    状态转移方程则为分A[i] > j 与否两种情况考虑。初始化均为0，相当于没有放任何物品。

## Java

    public class Solution {
        /**
         * @param m: An integer m denotes the size of a backpack
         * @param A: Given n items with size A[i]
         * @return: The maximum size
         */
        public int backPack(int m, int[] A) {
            if (A == null || A.length == 0) return 0;
    
            final int M = m;
            final int N = A.length;
            int[][] bp = new int[N + 1][M + 1];
    
            for (int i = 0; i < N; i++) {
                for (int j = 0; j <= M; j++) {
                    if (A[i] > j) {
                        bp[i + 1][j] = bp[i][j];
                    } else {
                        bp[i + 1][j] = Math.max(bp[i][j], bp[i][j - A[i]] + A[i]);
                    }
                }
            }
    
            return bp[N][M];
        }
    }

## 源码分析

    注意索引及初始化的值，尤其是 N 和 M 的区别，内循环处可等于 M。

## 复杂度分析

    两重 for 循环，时间复杂度为 O(m×n), 二维矩阵的空间复杂度为 O(m×n), 
    一维矩阵的空间复杂度为 O(m).
