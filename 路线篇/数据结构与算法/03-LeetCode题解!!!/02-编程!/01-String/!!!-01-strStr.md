## strStr

Question

- leetcode: Implement strStr() | LeetCode OJ
- lintcode: lintcode - (13) strstr

Problem Statement

    Implement strStr().
    Returns the index of the first occurrence of needle in haystack, 
    or -1 if needle is not part of haystack.
    
    Example
    If source = "source" and target = "target", return -1.
    If source = "abcdabcdefg" and target = "bcd", return 1.
    
    Challenge
    O(n2) is acceptable. Can you implement an O(n) algorithm? (hint: KMP)
    
    Clarification
    Do I need to implement KMP Algorithm in a real interview?
    Not necessary. When you meet this problem in a real interview, the interviewer may just
    want to test your basic implementation ability. But make sure your confirm with the 
    interviewer first.

## 题解

对于字符串查找问题，可使用双重 for 循环解决，效率更高的则为 KMP 算法。
双重 for 循环的使用较有讲究，因为这里需要考虑目标字符串比源字符串短的可能。
对目标字符串的循环肯定是必要的，所以可以优化的地方就在于如何访问源字符串了。
简单直观的解法是利用源字符串的长度作为 for 循环的截止索引，这种方法需要处理源字符串中剩余长度不足以
匹配目标字符串的情况，而更为高效的方案则为仅遍历源字符串中有可能和目标字符串匹配的部分索引。


## C++

    class Solution {
    public:
        int strStr(string haystack, string needle) {
            if (haystack.empty() && needle.empty()) return 0;
            if (haystack.empty()) return -1;
            if (haystack.size() < needle.size()) return -1;
    
            for (string::size_type i = 0; i < haystack.size() - needle.size() + 1; i++) {
                string::size_type j = 0;
                for (; j < needle.size(); j++) {
                    if (haystack[i + j] != needle[j]) break;
                }
                if (j == needle.size()) return i;
            }
    
            return -1;
        }
    };
    
## Java

    public class Solution {
        public int strStr(String haystack, String needle) {
            if (haystack == null && needle == null) return 0;
            if (haystack == null) return -1;
            if (needle == null) return 0;
    
            for (int i = 0; i < haystack.length() - needle.length() + 1; i++) {
                int j = 0;
                for (; j < needle.length(); j++) {
                    if (haystack.charAt(i+j) != needle.charAt(j)) break;
                }
                if (j == needle.length()) return i;
            }
    
            return -1;
        }
    }
    
## 源码分析

1. 边界检查：haystack(source)和needle(target)有可能是空串。
2. 边界检查之下标溢出：注意变量i的循环判断条件，如果用的是i < source.length()则在后面的
source.charAt(i + j)时有可能溢出。
3. 代码风格：
```
运算符==两边应加空格
变量名不要起s1``s2这类，要有意义，如target``source
Java 代码的大括号一般在同一行右边，C++ 代码的大括号一般另起一行
int i, j;`声明前有一行空格，是好的代码风格
```
4. 是否在for的条件中声明i,j，这个视情况而定，如果需要在循环外再使用时，则须在外部初始化，否则没有这个必要。
需要注意的是有些题目要求并不是返回索引，而是返回字符串，此时还需要调用相应语言的substring方法。

## 复杂度分析

    双重 for 循环，时间复杂度最坏情况下为 O((n-m)*m).