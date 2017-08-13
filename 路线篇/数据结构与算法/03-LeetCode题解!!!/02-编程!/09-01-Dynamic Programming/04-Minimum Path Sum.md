# Minimum Path Sum

## Question

- lintcode: (110) Minimum Path Sum

```
Given a (m x n) grid filled with non-negative numbers, 
find a path from top left to bottom right which minimizes the sum of all numbers 
along its path.

Note
You can only move either down or right at any point in time.
```

## 题解

    State: f[x][y] 从坐标(0,0)走到(x,y)的最短路径和
    Function: f[x][y] = (x, y) + min{f[x-1][y], f[x][y-1]}
    Initialization: f[0][0] = A[0][0], f[i][0] = sum(0,0 -> i,0), f[0][i] = sum(0,0 -> 0,i)
    Answer: f[m-1][n-1]
    注意最后返回为f[m-1][n-1]而不是f[m][n].

使用迭代思想进行求解的正确实现：

## C++ Iterative

    class Solution {
    public:
        /**
         * @param grid: a list of lists of integers.
         * @return: An integer, minimizes the sum of all numbers along its path
         */
        int minPathSum(vector<vector<int> > &grid) {
            if (grid.empty() || grid[0].empty()) {
                return 0;
            }
    
            const int M = grid.size();
            const int N = grid[0].size();
            vector<vector<int> > ret(M, vector<int> (N, 0));
    
            ret[0][0] = grid[0][0];
            for (int i = 1; i != M; ++i) {
                ret[i][0] = grid[i][0] + ret[i - 1][0];
            }
            for (int i = 1; i != N; ++i) {
                ret[0][i] = grid[0][i] + ret[0][i - 1];
            }
    
            for (int i = 1; i != M; ++i) {
                for (int j = 1; j != N; ++j) {
                    ret[i][j] = grid[i][j] + min(ret[i - 1][j], ret[i][j - 1]);
                }
            }
    
            return ret[M - 1][N - 1];
        }
    };

## 源码分析

    异常处理，不仅要对grid还要对grid[0]分析
    对返回结果矩阵进行初始化，注意ret[0][0]须单独初始化以便使用ret[i-1]
    递推时i和j均从1开始
    返回结果ret[M-1][N-1]，注意下标是从0开始的
    此题还可进行空间复杂度优化，和背包问题类似，使用一维数组代替二维矩阵也行，
    具体代码可参考 水中的鱼: [LeetCode] Minimum Path Sum 解题报告
    优化空间复杂度，要么对行遍历进行优化，要么对列遍历进行优化，通常我们习惯先按行遍历再按列遍历，
    有状态转移方程 f[x][y] = (x, y) + min{f[x-1][y], f[x][y-1]} 知，想要优化行遍历，
    那么f[y]保存的值应为第x行第y列的和。
    由于无行下标信息，故初始化时仅能对第一个元素初始化，分析时建议画图理解。

## C++ 1D vector
    
    class Solution {
    public:
        /**
         * @param grid: a list of lists of integers.
         * @return: An integer, minimizes the sum of all numbers along its path
         */
        int minPathSum(vector<vector<int> > &grid) {
            if (grid.empty() || grid[0].empty()) {
                return 0;
            }
    
            const int M = grid.size();
            const int N = grid[0].size();
            vector<int> ret(N, INT_MAX);
    
            ret[0] = 0;
    
            for (int i = 0; i != M; ++i) {
                ret[0] =  ret[0] + grid[i][0];
                for (int j = 1; j != N; ++j) {
                    ret[j] = grid[i][j] + min(ret[j], ret[j - 1]);
                }
            }
    
            return ret[N - 1];
        }
    };
    
```
初始化时需要设置为INT_MAX，便于i = 0时取ret[j].
```