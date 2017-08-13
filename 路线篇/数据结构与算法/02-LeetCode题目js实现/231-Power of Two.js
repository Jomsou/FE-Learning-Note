/**
 * 231. Power of Two
 *
 Given an integer, write a function to determine if it is a power of two.
 * */

/*
 [思路]
 如果是power of two, 则2进制表达中,有且仅有一个1.  可以通过移位来数1的个数,
 这里用了一个巧妙的办法, 即判断   N & (N-1) 是否为0.
 */

var isPowerOfTwo = function (n) {
    return n > 0 && ((n & (n - 1)) == 0 );
};