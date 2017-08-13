# Add Two Numbers

## Question

- leetcode: Add Two Numbers | LeetCode OJ
- lintcode: Add Two Numbers

```
Problem Statement

You have two numbers represented by a linked list, where each node contains a single digit. 
The digits are stored in reverse order, such that the 1's digit is at the head of the list. 
Write a function that adds the two numbers and returns the sum as a linked list.

Example
Given 7->1->6 + 5->9->2. That is, 617 + 295.
Return 2->1->9. That is 912.
Given 3->1->5 and 5->9->2, return 8->0->8.
```

## 题解

    一道看似简单的进位加法题，实则杀机重重，不信你不看答案自己先做做看。
    首先由十进制加法可知应该注意进位的处理，但是这道题仅注意到这点就够了吗？还不够！
    因为两个链表长度有可能不等长！因此这道题的亮点在于边界和异常条件的处理，
    感谢 @wen 引入的 dummy 节点，处理起来更为优雅！

## C++

    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode(int x) : val(x), next(NULL) {}
     * };
     */
    class Solution {
    public:
        ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
            ListNode dummy(0);
            ListNode *curr = &dummy;
            int carry = 0;
    
            while ((l1 != NULL) || (l2 != NULL) || (carry != 0)) {
                int l1_val = (l1 != NULL) ? l1->val : 0;
                int l2_val = (l2 != NULL) ? l2->val : 0;
                int sum = carry + l1_val + l2_val;
                carry = sum / 10;
                curr->next = new ListNode(sum % 10);
    
                curr = curr->next;
                if (l1 != NULL) l1 = l1->next;
                if (l2 != NULL) l2 = l2->next;
            }
    
            return dummy.next;
        }
    };

## Java

    /**
     * Definition for singly-linked list.
     * public class ListNode {
     *     int val;
     *     ListNode next;
     *     ListNode(int x) { val = x; }
     * }
     */
    public class Solution {
        public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
            ListNode dummy = new ListNode(0);
            ListNode curr = dummy;
            int carry = 0;
    
            while ((l1 != null) || (l2 != null) || (carry != 0)) {
                int l1_val = (l1 != null) ? l1.val : 0;
                int l2_val = (l2 != null) ? l2.val : 0;
                int sum = carry + l1_val + l2_val;
            // update carry
                carry = sum / 10;
                curr.next = new ListNode(sum % 10);
    
                curr = curr.next;
                if (l1 != null) l1 = l1.next;
                if (l2 != null) l2 = l2.next;
            }
    
            return dummy.next;
        }
    }

## 源码分析

    迭代能正常进行的条件为(NULL != l1) || (NULL != l2) || (0 != carry), 缺一不可。
    对于空指针节点的处理可以用相对优雅的方式处理 - int l1_val = (NULL == l1) ? 0 : l1->val;
    生成新节点时需要先判断迭代终止条件 - (NULL == l1) && (NULL == l2) && (0 == carry), 
    避免多生成一位数0。 使用 dummy 节点可避免这一情况。

## 复杂度分析

    没啥好分析的，时间和空间复杂度均为 O(max(L1,L2)).