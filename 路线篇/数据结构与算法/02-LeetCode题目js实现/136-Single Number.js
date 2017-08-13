/**
 * 136. Single Number
 *
 Difficulty: Medium
 Given an array of integers, every element appears twice except for one. Find that single one.

 Note:
 Your algorithm should have a linear runtime complexity.
 Could you implement it without using extra memory?
 * */



// 思路:使用异或的性质
/***
 * 异或是一种基于二进制的位运算，用符号XOR或者 ^ 表示，其运算法则是对运算符两侧数的每一个二进制位，
 * 同值取0，异值取1。它与布尔运算的区别在于，当运算符两侧均为1时，布尔运算的结果为1，异或运算的结果为0。

 简单理解就是不进位加法，如1+1=0，,0+0=0,1+0=1。

 性质
 1、交换律
 2、结合律（即(a^b)^c == a^(b^c)）
 3、对于任何数x，都有x^x=0，x^0=x
 4、自反性 A XOR B XOR B = A xor  0 = A


 1 ^ 2 ^ 1 = 1 ^ 1 ^ 2 = 0 ^ 2 = 2
 * */

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    if (!nums || !nums.length) {
        return null;
    }

    var result = nums[0];

    for (var i = 1, l = nums.length; i < l; i++) {
        result = result ^ nums[i];
    }

    return result;
};

console.log(singleNumber([1,2,3,4,5,6,5,4,3,2,1]));