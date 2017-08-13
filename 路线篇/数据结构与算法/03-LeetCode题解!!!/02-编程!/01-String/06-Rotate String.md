# Rotate String

## Question

- lintcode: (8) Rotate String

```
Problem Statement

Given a string and an offset, rotate string by offset. (rotate from left to right)

Example
Given "abcdefg".
offset=0 => "abcdefg"
offset=1 => "gabcdef"
offset=2 => "fgabcde"
offset=3 => "efgabcd"

Challenge
Rotate in-place with O(1) extra memory.
```

## 题解

    常见的翻转法应用题，仔细观察规律可知翻转的分割点在从数组末尾数起的offset位置。
    先翻转前半部分，随后翻转后半部分，最后整体翻转。

## C++

    class Solution {
    public:
      /**
         * param A: A string
         * param offset: Rotate string with offset.
         * return: Rotated string.
         */
        string rotateString(string A, int offset) {
            if (A.empty() || A.size() == 0) {
                return A;
            }
    
            int len = A.size();
            offset %= len;
            reverse(A, 0, len - offset - 1);
            reverse(A, len - offset, len - 1);
            reverse(A, 0, len - 1);
            return A;
        }
    
    private:
        void reverse(string &str, int start, int end) {
            while (start < end) {
                char temp = str[start];
                str[start] = str[end];
                str[end] = temp;
                start++;
                end--;
            }
        }
    };
    
## Java

    public class Solution {
        /*
         * param A: A string
         * param offset: Rotate string with offset.
         * return: Rotated string.
         */
        public char[] rotateString(char[] A, int offset) {
            if (A == null || A.length == 0) {
                return A;
            }
    
            int len = A.length;
            offset %= len;
            reverse(A, 0, len - offset - 1);
            reverse(A, len - offset, len - 1);
            reverse(A, 0, len - 1);
    
            return A;
        }
    
        private void reverse(char[] str, int start, int end) {
            while (start < end) {
                char temp = str[start];
                str[start] = str[end];
                str[end] = temp;
                start++;
                end--;
            }
        }
    };
    
## 源码分析

1. 异常处理，A为空或者其长度为0
2. offset可能超出A的大小，应模len后再用

## 复杂度分析

    翻转一次时间复杂度近似为 O(n), 原地交换的空间复杂度为 O(1), 非原地交换的空间复杂度为 O(n). 
    总共翻转3次，所以总的时间复杂度为 O(n), 空间复杂度为 O(1) 或者 O(n).