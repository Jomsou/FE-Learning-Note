/**
 * 63. Unique Paths II
 *
 Difficulty: Medium
 Follow up for "Unique Paths":

 Now consider if some obstacles are added to the grids.
 How many unique paths would there be?

 An obstacle and empty space is marked as 1 and 0 respectively in the grid.

 For example,
 There is one obstacle in the middle of a 3x3 grid as illustrated below.

 [
 [0,0,0],
 [0,1,0],
 [0,0,0]
 ]
 The total number of unique paths is 2.

 Note: m and n will be at most 100.
 * */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
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
     * */

    if (!obstacleGrid || !obstacleGrid.length) {
        return 0;
    }

    var m = obstacleGrid.length,
        n = obstacleGrid[0].length;

    var f = new Array(m);
    for (var l = 0; l < m; l++) {
        f[l] = new Array(n);
    }

    f[0][0] = obstacleGrid[0][0] == 1 ? 0 : 1;
    for (var i = 1; i < m; i++)
        f[i][0] = obstacleGrid[i][0] == 1 ? 0 : f[i - 1][0];

    for (var j = 1; j < n; j++)
        f[0][j] = obstacleGrid[0][j] == 1 ? 0 : f[0][j - 1];

    for (var p = 1; p < m; p++)
        for (var q = 1; q < n; q++)
            f[p][q] = obstacleGrid[p][q] == 1 ? 0 : f[p - 1][q] + f[p][q - 1];

    return f[m - 1][n - 1];
};