# Partition Array by Odd and Even

## Question

- lintcode: (373) Partition Array by Odd and Even
- Segregate Even and Odd numbers - GeeksforGeeks

```
Partition an integers array into odd number first and even number second.

Example
Given [1, 2, 3, 4], return [1, 3, 2, 4]

Challenge
Do it in-place.
```

## 题解

    将数组中的奇数和偶数分开，使用『两根指针』的方法最为自然，奇数在前，偶数在后，若不然则交换之。

## Javascript
    
    function partitionArrayByOddAndEven(nums) {
        if (!nums || !nums.length) {
            return [];
        }
    
        var low = 0, high = nums.length - 1;
    
        while (low < high) {
            while (nums[low] % 2 === 1) {
                low++;
            }
    
            while (nums[high] % 2 === 0) {
                high--;
            }
    
            if (low < high) {
                var tmp = nums[low];
                nums[low] = nums[high];
                nums[high] = tmp;
            }
        }
    
        return nums;
    }
    
    console.log(partitionArrayByOddAndEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

## Java

    public class Solution {
        /**
         * @param nums: an array of integers
         * @return: nothing
         */
        public void partitionArray(int[] nums) {
            if (nums == null) return;
    
            int left = 0, right = nums.length - 1;
            while (left < right) {
                // odd number
                while (left < right && nums[left] % 2 != 0) {
                    left++;
                }
                // even number
                while (left < right && nums[right] % 2 == 0) {
                    right--;
                }
                // swap
                if (left < right) {
                    int temp = nums[left];
                    nums[left] = nums[right];
                    nums[right] = temp;
                }
            }
        }
    }

## C++

      void partitionArray(vector<int> &nums) {
            if (nums.empty()) return;
    
            int i=0, j=nums.size()-1;
            while (i<j) {
                while (i<j && nums[i]%2!=0) i++;
                while (i<j && nums[j]%2==0) j--;
                if (i != j) swap(nums[i], nums[j]);
            }
        }

## 源码分析

    注意处理好边界即循环时保证left < right.

## 复杂度分析

    遍历一次数组，时间复杂度为 O(n), 使用了两根指针，空间复杂度 O(1).