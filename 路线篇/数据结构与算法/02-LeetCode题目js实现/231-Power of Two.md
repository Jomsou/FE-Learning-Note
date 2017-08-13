## Power of Two, 判断一个数是不是2的整数次方

这道题让我们判断一个数是否为2的次方数，而且要求时间和空间复杂度都为常数，那么对于这种玩数字的题，
我们应该首先考虑位操作 Bit Operation。
在LeetCode中，位操作的题有很多，比如比如Repeated DNA Sequences 求重复的DNA序列， 
Single Number 单独的数字,   Single Number II 单独的数字之二 ，
 Grey Code 格雷码， Reverse Bits 翻转位，Bitwise AND of Numbers Range 数字范围位相与，
 Number of 1 Bits 位1的个数 和 Divide Two Integers 两数相除等等。
 那么我们来观察下2的次方数的二进制写法的特点：
```
1     2       4         8         16 　　....

1    10    100    1000    10000　....
```

那么我们很容易看出来2的次方数都只有一个1，剩下的都是0，所以我们的解题思路就有了，
我们只要每次判断最低位是否为1，然后向右移位，最后统计1的个数即可判断是否是2的次方数，代码如下：

### 解法一：
```
class Solution {
public:
    bool isPowerOfTwo(int n) {
        int cnt = 0;
        while (n > 0) {
            cnt += (n & 1);
            n >>= 1;
        }
        return cnt == 1;
    } 
};
```
 

这道题还有一个技巧，如果一个数是2的次方数的话，根据上面分析，那么它的二进数必然是最高位为1，
其它都为0，那么如果此时我们减1的话，则最高位会降一位，其余为0的位现在都为变为1，
那么我们把两数相与，就会得到0，用这个性质也能来解题，而且只需一行代码就可以搞定，如下所示：

### 解法二：
```
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return (n > 0) && (!(n & (n - 1)));
    } 
};
```