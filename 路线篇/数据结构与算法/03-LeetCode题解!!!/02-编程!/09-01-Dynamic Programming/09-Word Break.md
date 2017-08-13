# Word Break

## Question

- leetcode: Word Break | LeetCode OJ
- lintcode: (107) Word Break

```
Given a string s and a dictionary of words dict, determine if s can be
segmented into a space-separated sequence of one or more dictionary words.

For example, given
s = "leetcode",
dict = ["leet", "code"].

Return true because "leetcode" can be segmented as "leet code".
```

## 题解

    单序列(DP_Sequence) DP 题，由单序列动态规划的四要素可大致写出：
    State: f[i] 表示前i个字符能否根据词典中的词被成功分词。
    Function: f[i] = or{f[j], j < i, letter in [j+1, i] can be found in dict}, 
    含义为小于i的索引j中只要有一个f[j]为真且j+1到i中组成的字符能在词典中找到时，f[i]即为真，否则为假。
    具体实现可分为自顶向下或者自底向上。
    Initialization: f[0] = true, 数组长度为字符串长度 + 1，便于处理。
    Answer: f[s.length]
    考虑到单词长度通常不会太长，故在s较长时使用自底向上效率更高。

## C++

    class Solution {
    public:
        bool wordBreak(string s, unordered_set<string>& wordDict) {
            if (s.empty()) return true;
            if (wordDict.empty()) return false;
    
            // get the max word length of wordDict
            int max_word_len = 0;
            for (unordered_set<string>::iterator it = wordDict.begin();
             it != wordDict.end(); ++it) {
    
                max_word_len = max(max_word_len, (*it).size());
            }
    
            vector<bool> can_break(s.size() + 1, false);
            can_break[0] = true;
            for (int i = 1; i <= s.size(); ++i) {
                for (int j = i - 1; j >= 0; --j) {
                    // optimize for too long interval
                    if (i - j > max_word_len) break;
    
                    if (can_break[j] && 
                wordDict.find(s.substr(j, i - j)) != wordDict.end()) {
    
                        can_break[i] = true;
                        break;
                    }
                }
            }
    
            return can_break[s.size()];
        }
    };

## Java
    
    public class Solution {
        public boolean wordBreak(String s, Set<String> wordDict) {
            if (s == null || s.length() == 0) return true;
            if (wordDict == null || wordDict.isEmpty()) return false;
    
            // get the max word length of wordDict
            int max_word_len = 0;
            for (String word : wordDict) {
                max_word_len = Math.max(max_word_len, word.length());
            }
    
            boolean[] can_break = new boolean[s.length() + 1];
            can_break[0] = true;
            for (int i = 1; i <= s.length(); i++) {
                for (int j = i - 1; j >= 0; j--) {
                    // optimize for too long interval
                    if (i - j > max_word_len) break;
    
                    String word = s.substring(j, i);
                    if (can_break[j] && wordDict.contains(word)) {
                        can_break[i] = true;
                        break;
                    }
                }
            }
    
            return can_break[s.length()];
        }
    }

## 源码分析

    使用自底向上的方法求解状态转移，首先遍历一次词典求得单词最大长度以便后续优化。

## 复杂度分析
    
    求解词典中最大单词长度，时间复杂度为词典长度乘上最大单词长度 O(L_D * L_w)
    词典中找单词的时间复杂度为 O(1)(哈希表结构)
    两重 for 循环，内循环在超出最大单词长度时退出，故最坏情况下两重 for 循环的时间复杂度为 O(n L_w).
    故总的时间复杂度近似为 O(n L_w).
    使用了与字符串长度几乎等长的布尔数组和临时单词word，空间复杂度近似为 O(n).