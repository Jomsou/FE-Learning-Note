## Two Strings Are Anagrams

## Question

- lintcode: (158) Two Strings Are Anagrams

```
Write a method anagram(s,t) to decide if two strings are anagrams or not.

Example
Given s="abcd", t="dcab", return true.

Challenge
O(n) time, O(1) extra space
```


## 题解1 - hashmap 统计字频

判断两个字符串是否互为变位词，若区分大小写，考虑空白字符时，直接来理解可以认为两个字符串的拥有
各不同字符的数量相同。对于比较字符数量的问题常用的方法为遍历两个字符串，统计其中各字符出现的频次，
若不等则返回false. 有很多简单字符串类面试题都是此题的变形题。

## java

	public static boolean anagrams(String s, String t) {
		if (s == null || t == null) {
			return false;
		}

		if (s.length() != t.length()) {
			return false;
		}

		// ACSII字符总共有256个，所以初始化长度为256的数组！
		// 字符串的处理中，经常使用数组来充当hash表，长度为256的数组即可！！！
		/**
		 * ASCII 码使用指定的7 位或8 位二进制数组合来表示128 或256 种可能的字符。 标准ASCII 码也叫基础ASCII码，使用7
		 * 位二进制数（剩下的1位二进制为0）来表示所有的大写和小写字母，数字0 到9、标点符号， 以及在美式英语中使用的特殊控制字符。 其中：
		 * 0～31及127(共33个)是控制字符或通信专用字符（其余为可显示字符），如控制符：LF（换行）、CR（回车）、FF（换页）、DEL（删除）、
		 * BS（退格)、BEL（响铃）等；通信专用字符：SOH（文头）、EOT（文尾）、ACK（确认）等；ASCII值为8、9、10 和13
		 * 分别转换为退格、制表、换行和回车字符。它们并没有特定的图形显示，但会依不同的应用程序，而对文本显示有不同的影响。
		 * 
		 * 32～126(共95个)是字符(32是空格），其中48～57为0到9十个阿拉伯数字。
		 * 
		 * 65～90为26个大写英文字母，97～122号为26个小写英文字母，其余为一些标点符号、运算符号等。
		 * 
		 * 同时还要注意，在标准ASCII中，其最高位(b7)用作奇偶校验位。所谓奇偶校验，是指在代码传送过程中用来检验是否出现错误的一种方法，
		 * 一般分奇校验和偶校验两种。 奇校验规定：正确的代码一个字节中1的个数必须是奇数，若非奇数，则在最高位b7添1；
		 * 偶校验规定：正确的代码一个字节中1的个数必须是偶数，若非偶数，则在最高位b7添1。
		 * 后128个称为扩展ASCII码。许多基于x86的系统都支持使用扩展（或“高”）ASCII。 扩展ASCII
		 * 码允许将每个字符的第8位用于确定附加的128 个特殊符号字符、外来语字母和图形符号。
		 */
		int[] letterCount = new int[256];

		//下面这句可以不要，java整型数组默认初始值就是0
		// for (int i = 0; i < 256; i++) {
		// letterCount[i] = 0;
		// }

		for (int i = 0; i != s.length(); ++i) {
			// 数组的index是整型，char类型可以自动转换成int型!
			// System.out.println((int) ("hello".charAt(0))); // 104
			++letterCount[s.charAt(i)];
			--letterCount[t.charAt(i)];
		}

		for (int i = 0; i != t.length(); ++i) {
			if (letterCount[t.charAt(i)] != 0) {
				return false;
			}
		}

		return true;
	}

## C++

    class Solution {
    public:
        /**
         * @param s: The first string
         * @param b: The second string
         * @return true or false
         */
        bool anagram(string s, string t) {
            if (s.empty() || t.empty()) {
                return false;
            }
            if (s.size() != t.size()) {
                return false;
            }
    
            int letterCount[256] = {0};
    
            for (int i = 0; i != s.size(); ++i) {
                ++letterCount[s[i]];
                --letterCount[t[i]];
            }
            for (int i = 0; i != t.size(); ++i) {
                if (letterCount[t[i]] != 0) {
                    return false;
                }
            }
    
            return true;
        }
    };

## 源码分析

1. 两个字符串长度不等时必不可能为变位词(需要注意题目条件灵活处理)。
2. 初始化含有256个字符的计数器数组。
3. 对字符串 s 自增，字符串 t 递减，再次遍历判断letterCount数组的值，小于0时返回false.

在字符串长度较长(大于所有可能的字符数)时，还可对第二个for循环做进一步优化，即t.size() > 256时，
使用256替代t.size(), 使用i替代`t[i]`.

## 复杂度分析

    两次遍历字符串，时间复杂度最坏情况下为 O(n), 使用了额外的数组，空间复杂度 O(1).
    
## 题解2 - 排序字符串

另一直接的解法是对字符串先排序，若排序后的字符串内容相同，则其互为变位词。
题解1中使用 hashmap 的方法对于比较两个字符串是否互为变位词十分有效，但是在比较多个字符串时，
使用 hashmap 的方法复杂度则较高。

## C++

    class Solution {
    public:
        /**
         * @param s: The first string
         * @param b: The second string
         * @return true or false
         */
        bool anagram(string s, string t) {
            if (s.empty() || t.empty()) {
                return false;
            }
            if (s.size() != t.size()) {
                return false;
            }
    
            sort(s.begin(), s.end());
            sort(t.begin(), t.end());
    
            if (s == t) {
                return true;
            } else {
                return false;
            }
        }
    };
    
## 源码分析

    对字符串 s 和 t 分别排序，而后比较是否含相同内容。
    对字符串排序时可以采用先统计字频再组装成排序后的字符串，效率更高一点。
    
## 复杂度分析

    C++的 STL 中 sort 的时间复杂度介于 O(n) 和 O(n^2)之间，判断s == t时间复杂度最坏为 O(n).