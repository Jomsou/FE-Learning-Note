# Single Number III

## Question

- lintcode: (84) Single Number III

```
Given 2*n + 2 numbers, every numbers occurs twice except two, find them.

Example
Given [1,2,2,3,4,4,5,3] return 1 and 5

Challenge
O(n) time, O(1) extra space.
```

## 题解

    题 Single Number 的 follow up, 不妨设最后两个只出现一次的数分别为 x1, x2. 
    那么遍历数组时根据两两异或的方法可得最后的结果为 x1 ^ x2, 如果我们要分别求得 x1 和 x2, 
    我们可以根据 x1 ^ x2 ^ x1 = x2 求得 x2, 同理可得 x_1. 
    
    那么问题来了，如何得到x1和x2呢？看起来似乎是个死循环。大多数人一般也就能想到这一步(比如我...)。
    这道题的巧妙之处在于利用x1 ^ x2的结果对原数组进行了分组，进而将x1和x2分开了。
    具体方法则是利用了x1 ^ x2不为0的特性，如果x1 ^ x2不为0，那么x1 ^ x2的结果必然存在某一二进制位不为0（即为1），
    我们不妨将最低位的1提取出来，由于在这一二进制位上x1和x2必然相异，
    即x1, x2中相应位一个为0，另一个为1，所以我们可以利用这个最低位的1将x1和x2分开。
    又由于除了x1和x2之外其他数都是成对出现，故与最低位的1异或时一定会抵消，十分之精妙！

## Java

    public class Solution {
        /**
         * @param A : An integer array
         * @return : Two integers
         */
        public List<Integer> singleNumberIII(int[] A) {
            ArrayList<Integer> nums = new ArrayList<Integer>();
            if (A == null || A.length == 0) return nums;
    
            int x1xorx2 = 0;
            for (int i : A) {
                x1xorx2 ^= i;
            }
    
            // get the last 1 bit of x1xorx2, e.g. 1010 ==> 0010
            int last1Bit = x1xorx2 - (x1xorx2 & (x1xorx2 - 1));
            int single1 = 0, single2 = 0;
            for (int i : A) {
                if ((last1Bit & i) == 0) {
                    single1 ^= i;
                } else {
                    single2 ^= i;
                }
            }
    
            nums.add(single1);
            nums.add(single2);
            return nums;
        }
    }

## 源码分析
    
    求一个数二进制位1的最低位方法为 x1 xor x2 - (x1 xor x2 & (x1 xor x2 - 1)), 
    其他位运算的总结可参考 Bit Manipulation。
    利用last1Bit可将数组的数分为两组，一组是相应位为0，另一组是相应位为1.

## 复杂度分析

    两次遍历数组，时间复杂度 O(n), 使用了部分额外空间，空间复杂度 O(1).
    
    
## javascript 

    /**
     * 数组中只出现一次的两个数
     * */
    function onlyAppearOnceTwoNumbers(arr) {
        var val = 0;
        //先对整个数组做异或操作,得到的结果即是两个只出现一次的数字异或的结果
        for (var i = 0; i < arr.length; i++) {
            val ^= arr[i];
        }
    
        //判断结果中从右往左为1的第k位数
        var count = 0;
        while (val & 1 === 0) {
            count++;
            val = val >> 1;
        }
    
        //根据第一个为1的那个位将原数组分拆分为为两个数组
        //两个只出现一次的数字被分散到两个不同的数组中去了
        var arr1 = [], arr2 = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] & 1 === 1) {
                arr1.push(arr[i]);
            } else {
                arr2.push(arr[i]);
            }
        }
    
        console.log(arr1);
        console.log(arr2);
    
        //再分别对两个数组做异或操作,得到结果
        var result = [], val1 = 0, val2 = 0;
        for (var i = 0; i < arr1.length; i++) {
            val1 ^= arr1[i];
        }
        for (var j = 0; j < arr1.length; j++) {
            val2 ^= arr2[j];
        }
    
        result.push(val1, val2);
        return result;
    }
    
    console.log(onlyAppearOnceTwoNumbers([1, 2, 3, 4, 5, 6, 7, 8, 6, 5, 4, 3, 2, 1]));