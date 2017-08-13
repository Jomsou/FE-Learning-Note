# Partition Array

## Question

- lintcode: (31) Partition Array

```
Problem Statement

Given an array nums of integers and an int k, partition the array 
(i.e move the elements in "nums") such that:

All elements < k are moved to the left
All elements >= k are moved to the right
Return the partitioning index, i.e the first index i nums[i] >= k.

Example
If nums = [3,2,2,1] and k=2, a valid answer is 1.

Note
You should do really partition in array nums instead of just counting the numbers 
of integers smaller than k.
If all elements in nums are smaller than k, then return nums.length

Challenge
Can you partition the array in-place and in O(n)?
```

## 题解1 - 自左向右

    容易想到的一个办法是自左向右遍历，使用right保存大于等于 k 的索引，i则为当前遍历元素的索引，
    总是保持i >= right, 那么最后返回的right即为所求。
    
## C++

    class Solution {
    public:
        int partitionArray(vector<int> &nums, int k) {
            int right = 0;
            const int size = nums.size();
            for (int i = 0; i < size; ++i) {
                if (nums[i] < k && i >= right) {
                    int temp = nums[i];
                    nums[i] = nums[right];
                    nums[right] = temp;
                    ++right;
                }
            }
    
            return right;
        }
    };
    
## 源码分析

    自左向右遍历，遇到小于 k 的元素时即和right索引处元素交换，并自增right指向下一个元素，
    这样就能保证right之前的元素一定小于 k. 注意if判断条件中i >= right不能是i > right, 
    否则需要对特殊情况如全小于 k 时的考虑，而且即使考虑了这一特殊情况也可能存在其他 bug. 
    具体是什么 bug 呢？欢迎提出你的分析意见~1

## 复杂度分析

    遍历一次数组，时间复杂度最少为 O(n), 可能需要一定次数的交换。
    
    
## 题解2 - 两根指针

    有了解过 Quick Sort 的做这道题自然是分分钟的事，使用左右两根指针 left, rightleft,
    right 分别代表小于、大于等于 k 的索引，左右同时开工，直至 left>right.
    
## C++

    class Solution {
    public:
        int partitionArray(vector<int> &nums, int k) {
            int left = 0, right = nums.size() - 1;
            while (left <= right) {
                while (left <= right && nums[left] < k) ++left;
                while (left <= right && nums[right] >= k) --right;
                if (left <= right) {
                    int temp = nums[left];
                    nums[left] = nums[right];
                    nums[right] = temp;
                    ++left;
                    --right;
                }
            }
    
            return left;
        }
    };
    
## 源码分析

    大循环能正常进行的条件为 left<=right, 对于左边索引，向右搜索直到找到小于 k 的索引为止；
    对于右边索引，则向左搜索直到找到大于等于 k 的索引为止。注意在使用while循环时务必进行越界检查！
    找到不满足条件的索引时即交换其值，并递增left, 递减right. 紧接着进行下一次循环。
    最后返回left即可，当nums为空时包含在left = 0之中，不必单独特殊考虑，所以应返回left而不是right.

## 复杂度分析

    只需要对整个数组遍历一次，时间复杂度为 O(n), 相比题解1，题解2对全小于 k 的数组效率较高，元素交换次数较少。