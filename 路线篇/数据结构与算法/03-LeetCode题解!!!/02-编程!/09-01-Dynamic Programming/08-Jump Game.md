# Jump Game

## Question

- lintcode: (116) Jump Game

```
Given an array of non-negative integers, you are initially positioned at the 
first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

Example
A = [2,3,1,1,4], return true.

A = [3,2,1,0,4], return false.
```

## 题解(自顶向下-动态规划)
    
    State: f[i] 从起点出发能否达到i
    Function: f[i] = OR (f[j], j < i && j + A[j] >= i), 状态 j 转移到 i, 
    所有小于i的下标j的元素中是否存在能从j跳转到i得
    Initialization: f[0] = true;
    Answer: 递推到第 N - 1 个元素时，f[N-1]
    这种自顶向下的方法需要使用额外的 O(n) 空间，保存小于N-1时的状态。
    且时间复杂度在恶劣情况下有可能变为 1 + 2 + ... + n = O(n^2), 
    出现 TLE 无法AC的情况，不过工作面试能给出这种动规的实现就挺好的了。

## C++ from top to bottom
    
    class Solution {
    public:
        /**
         * @param A: A list of integers
         * @return: The boolean answer
         */
        bool canJump(vector<int> A) {
            if (A.empty()) {
                return true;
            }
    
            vector<bool> jumpto(A.size(), false);
            jumpto[0] = true;
    
            for (int i = 1; i != A.size(); ++i) {
                for (int j = i - 1; j >= 0; --j) {
                    if (jumpto[j] && (j + A[j] >= i)) {
                        jumpto[i] = true;
                        break;
                    }
                }
            }
    
            return jumpto[A.size() - 1];
        }
    };