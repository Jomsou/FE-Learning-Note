# Search Insert Position

## Question

- lintcode: (60) Search Insert Position

```
Problem Statement

Given a sorted array and a target value, return the index if the target is found. 
If not, return the index where it would be if it were inserted in order.
You may assume NO duplicates in the array.

Example
[1,3,5,6], 5 → 2
[1,3,5,6], 2 → 1
[1,3,5,6], 7 → 4
[1,3,5,6], 0 → 0

Challenge
O(log(n)) time
```

## 题解

## Java

    仍然是 Binary Search 中lower_bound的变形，两大关键点：start 和end 的初始化；
    最终插入位置和start 以及end 之间的关系，由于start对应的索引一定是小于目标值的，
    那么start + 1 就是要求的值了，再检查下两端的边界，DONE

    public class Solution {
        /**
         * param A : an integer sorted array
         * param target :  an integer to be inserted
         * return : an integer
         */
        public int searchInsert(int[] A, int target) {
            if (A == null || A.length == 0) {
                return -1;
            }
    
            int start = -1, end = A.length;
            while (start + 1 < end) {
                int mid = start + (end - start) / 2;
                if (A[mid] == target) {
                    return mid; // no duplicates
                } else if (A[mid] < target) {
                    start = mid;
                } else {
                    end = mid;
                }
            }
    
        return start + 1;
        }
    }
    
    
## 源码分析

    分析三种典型情况：
    目标值在数组范围之内，最后返回值一定是start + 1
    目标值比数组最小值还小，此时start 一直为-1, 故最后返回start + 1 也没错，也可以将-1 理解为数组前一个更小的值
    目标值大于等于数组最后一个值，由于循环退出条件为start + 1 == end, 那么循环退出时一定有start = A.length - 1, 
    应该返回start + 1
    
    综上所述，返回start + 1是非常优雅的实现。
    其实以上三种情况都可以统一为一种方式来理解，即索引-1 对应于在数组前方插入一个非常小的数，
    索引end 即对应数组后方插入一个非常大的数，那么要插入的数就一定在start 和end 之间了。
    有时复杂的边界条件处理可以通过『补项』这种优雅的方式巧妙处理。

## 复杂度分析

    时间复杂度 O(logn), 空间复杂度 O(1).