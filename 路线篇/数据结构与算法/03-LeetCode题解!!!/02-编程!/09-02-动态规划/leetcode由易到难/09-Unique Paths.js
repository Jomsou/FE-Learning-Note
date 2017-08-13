/**
 * 62. Unique Paths
 *
 Difficulty: Medium
 A robot is located at the top-left corner of a m x n grid.

 The robot can only move either down or right at any point in time.
 The robot is trying to reach the bottom-right corner of the grid .

 How many possible unique paths are there?

 Above is a 3 x 7 grid. How many possible unique paths are there?

 Note: m and n will be at most 100.
 * */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    /**
     * 寻求最短路径，从左上走到右下，保证每次只能往左走或往下走（不可以斜着走）。
     * 其中数字1是障碍，表示“此路不通”，求总共的路线数


     思路
     1. 如果没有障碍

     val[i][0] = 1
     val[0][j] = 1
     val[i][j] = val[i-1][j] + val[i][j-1]

     2. 有了障碍后
     如果obstacle[i][j] = 1
     val[i][j] = 1
     否则
     tmp = obstacle[i-1][j] == 1 ? 0 : val[i-1][j]
     tmp = obstacle[i][j-1] == 1 ? tmp : tmp + val[i-1][j-1]
     　　　val[i][j] = tmp


     动态规划，定义一个二维数组 A[M][N]，从左上开始依次计算每一行的值，最后返回 A[M-1][N-1]即可，
     递推方程是：
     A[I][J]=A[I-1][J]+A[I][J-1]；
     * */

    var a = new Array(m);
    for (var l = 0; l < m; l++) {
        a[l] = new Array(n);
    }

    //初始化
    for (var i = 0; i < m; i++) {
        a[i][0] = 1;
    }
    for (var j = 0; j < n; j++) {
        a[0][j] = 1;
    }

    for (var p = 1; p < m; p++) {
        for (var q = 1; q < n; q++) {
            a[p][q] = a[p - 1][q] + a[p][q - 1];
        }
    }
    return a[m - 1][n - 1];
};