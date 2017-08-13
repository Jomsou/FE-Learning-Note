## Compare Strings

## Question

- lintcode: (55) Compare Strings

```
Compare two strings A and B, determine whether A contains all of the characters in B.
The characters in string A and B are all Upper Case letters.

Example
For A = "ABCD", B = "ABC", return true.
For A = "ABCD" B = "AABC", return false.
```

## 题解

    题 Two Strings Are Anagrams | Data Structure and Algorithm 的变形题。
    题目意思是问B中的所有字符是否都在A中，而不是单个字符。比如B="AABC"包含两个「A」，而A="ABCD"只包含一个「A」，
    故返回false. 做题时注意题意，必要时可向面试官确认。
    既然不是类似 strstr 那样的匹配，直接使用两重循环就不太合适了。
    题目中另外给的条件则是A和B都是全大写单词，理解题意后容易想到的方案就是先遍历 A 和 B 统计各字符出现的频次，
    然后比较频次大小即可。嗯，祭出万能的哈希表。
    
    
## java

	public static boolean compareStrings(String src, String dest) {
		if (src == null || dest == null) {
			return false;
		}

		if (src.length() < dest.length()) {
			return false;
		}

		// 定义长度为26的整型数组
		// java整型数组默认初始值都说0
		int[] letterCount = new int[26];

		for (int i = 0; i < src.length(); i++) {
			letterCount[src.charAt(i) - 'A']++;
		}

		for (int j = 0; j < dest.length(); j++) {
			letterCount[dest.charAt(j) - 'A']--;
			if (letterCount[dest.charAt(j) - 'A'] < 0) {
				return false;
			}
		}
		return true;
	}
	
            
## C++

    class Solution {
    public:
        /**
         * @param A: A string includes Upper Case letters
         * @param B: A string includes Upper Case letter
         * @return:  if string A contains all of the characters in B return true
         *           else return false
         */
        bool compareStrings(string A, string B) {
            if (A.size() < B.size()) {
                return false;
            }
    
            const int AlphabetNum = 26;
            int letterCount[AlphabetNum] = {0};
            for (int i = 0; i != A.size(); ++i) {
                ++letterCount[A[i] - 'A'];
            }
            for (int i = 0; i != B.size(); ++i) {
                --letterCount[B[i] - 'A'];
                if (letterCount[B[i] - 'A'] < 0) {
                    return false;
                }
            }
    
            return true;
        }
    };
    
## 源码解析

1. 异常处理，B 的长度大于 A 时必定返回false, 包含了空串的特殊情况。
2. 使用额外的辅助空间，统计各字符的频次。

## 复杂度分析

    遍历一次 A 字符串，遍历一次 B 字符串，时间复杂度最坏 O(2n), 空间复杂度为 O(26).