# Wildcard Matching

## Question

- leetcode: Wildcard Matching | LeetCode OJ
- lintcode: (192) Wildcard Matching

```
Implement wildcard pattern matching with support for '?' and '*'.

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

Example
isMatch("aa","a") → false
isMatch("aa","aa") → true
isMatch("aaa","aa") → false
isMatch("aa", "*") → true
isMatch("aa", "a*") → true
isMatch("ab", "?*") → true
isMatch("aab", "c*a*b") → false
```

## 题解1 - DFS

    字符串的通配实现。'?'表示匹配单一字符，'*'可匹配任意多字符串(包含零个)。
    要匹配的字符串设为s, 模式匹配用的字符串设为p，那么如果是普通字符，两个字符串索引向前推进一位即可，
    如果p中的字符是?也好办，同上处理，向前推进一位。
    所以现在的关键就在于如何处理'*', 因为*可匹配0, 1, 2...个字符，所以遇到*时，s应该尽可能的向前推进，
    注意到p中*后面可能跟有其他普通字符，故s向前推进多少位直接与p中*后面的字符相关。
    同时此时两个字符串的索引处即成为回溯点，如果后面的字符串匹配不成功，则s中的索引向前推进，
    向前推进的字符串即表示和p中*匹配的字符个数。
    
## Java

    public class Solution {
        /**
         * @param s: A string
         * @param p: A string includes "?" and "*"
         * @return: A boolean
         */
        public boolean isMatch(String s, String p) {
            if (s == null || p == null) return false;
            if (s.length() == 0|| p.length() == 0) return false;
    
            return helper(s, 0, p, 0);
        }
    
        private boolean helper(String s, int si, String p, int pj) {
            // index out of range check
            if (si == s.length() || pj == p.length()) {
                if (si == s.length() && pj == p.length()) {
                    return true;
                } else {
                    return false;
                }
            }
    
            if (p.charAt(pj) == '*') {
                // remove coninuous *
                while (p.charAt(pj) == '*') {
                    pj++;
                    // index out of range check
                    if (pj == p.length()) return true;
                }
    
                // compare remaining part of p after * with s
                while (si < s.length() && !helper(s, si, p, pj)) {
                    si++;
                }
                // substring of p equals to s
                return si != s.length();
            } else if (s.charAt(si) == p.charAt(pj) || p.charAt(pj) == '?') {
                return helper(s, si + 1, p, pj + 1);
            } else {
                return false;
            }
        }
    }
    
## 源码分析

    其中对*的处理和递归回溯是这段代码的精华。
    
    
## 复杂度分析

    最坏情况下需要不断回溯，时间复杂度 O(n!)×O(m!), 空间复杂度 O(1)(不含栈空间)。
    
    
## 题解2

## C++

    bool isMatch(string s, string p) {
        int star = 0, ss = 0, i = 0, j = 0;
        while (s[i]) {
            if (p[j] == '?' || p[j] == s[i]) {j++; i++; continue;}
            if (p[j] == '*') {star = ++j; ss = i; continue;}
            if (star) {j = star; i = ++ss; continue;}
            return false;
        }
        while (p[j] == '*') j++;
        return !p[j];
    }