# Valid Palindrome

## Question

- leetcode: Valid Palindrome | LeetCode OJ
- lintcode: (415) Valid Palindrome

```
Given a string, determine if it is a palindrome,
considering only alphanumeric characters and ignoring cases.

Example
"A man, a plan, a canal: Panama" is a palindrome.
"race a car" is not a palindrome.

Note
Have you consider that the string might be empty?
This is a good question to ask during an interview.
For the purpose of this problem,
we define empty string as valid palindrome.

Challenge
O(n) time without extra memory.
```

## 题解

    字符串的回文判断问题，由于字符串可随机访问，故逐个比较首尾字符是否相等最为便利，
    即常见的『两根指针』技法。此题忽略大小写，并只考虑字母和数字字符。
    链表的回文判断总结见 Check if a singly linked list is palindrome.

## C++

    class Solution {
    public:
        /**
         * @param s A string
         * @return Whether the string is a valid palindrome
         */
        bool isPalindrome(string& s) {
            if (s.empty()) return true;
    
            int l = 0, r = s.size() - 1;
            while (l < r) {
                // find left alphanumeric character
                if (!isalnum(s[l])) {
                    ++l;
                    continue;
                }
                // find right alphanumeric character
                if (!isalnum(s[r])) {
                    --r;
                    continue;
                }
                // case insensitive compare
                if (tolower(s[l]) == tolower(s[r])) {
                    ++l;
                    --r;
                } else {
                    return false;
                }
            }
    
            return true;
        }
    };
    
## Java

    public class Solution {
        /**
         * @param s A string
         * @return Whether the string is a valid palindrome
         */
        public boolean isPalindrome(String s) {
            if (s == null || s.isEmpty()) return true;
    
            int l = 0, r = s.length() - 1;
            while (l < r) {
                // find left alphanumeric character
                if (!Character.isLetterOrDigit(s.charAt(l))) {
                    l++;
                    continue;
                }
                // find right alphanumeric character
                if (!Character.isLetterOrDigit(s.charAt(r))) {
                    r--;
                    continue;
                }
                // case insensitive compare
                if (Character.toLowerCase(s.charAt(l)) == Character.toLowerCase(s.charAt(r))) {
                    l++;
                    r--;
                } else {
                    return false;
                }
            }
    
            return true;
        }
    }
    
## 源码分析
两步走：

1. 找到最左边和最右边的第一个合法字符(字母或者字符)
2. 一致转换为小写进行比较
字符的判断尽量使用语言提供的 API

## 复杂度分析

    两根指针遍历一次，时间复杂度 O(n), 空间复杂度 O(1).