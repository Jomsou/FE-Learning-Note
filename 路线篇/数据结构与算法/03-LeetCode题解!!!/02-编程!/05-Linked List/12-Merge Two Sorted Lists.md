# Merge Two Sorted Lists

## Question

- leetcode: Merge Two Sorted Lists | LeetCode OJ
- lintcode: (165) Merge Two Sorted Lists

```
Problem Statement

Merge two sorted (ascending) linked lists and return it as a new sorted list. 
The new sorted list should be made by splicing together the nodes of the two lists 
and sorted in ascending order.

Example
Given 1->3->8->11->15->null, 2->null , return 1->2->3->8->11->15->null.

题解
此题为两个链表的合并，合并后的表头节点不一定，故应联想到使用dummy节点。
链表节点的插入主要涉及节点next指针值的改变，两个链表的合并操作则涉及到两个节点的next值变化，
若每次合并一个节点都要改变两个节点next的值且要对NULL指针做异常处理，势必会异常麻烦。
嗯，第一次做这个题时我就是这么想的... 下面看看相对较好的思路。
首先dummy节点还是必须要用到，除了dummy节点外还引入一个curr节点充当下一次合并时的头节点。
在l1或者l2的某一个节点为空指针NULL时，退出while循环，并将非空链表的头部链接到curr->next中。
```

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
        ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
            ListNode *dummy = new ListNode(0);
            ListNode *lastNode = dummy;
            while ((NULL != l1) && (NULL != l2)) {
                if (l1->val < l2->val) {
                    lastNode->next = l1;
                    l1 = l1->next;
                } else {
                    lastNode->next = l2;
                    l2 = l2->next;
                }
    
                lastNode = lastNode->next;
            }
    
            // do not forget this line!
            lastNode->next =  (NULL != l1) ? l1 : l2;
    
            return dummy->next;
        }
    };

## Java

    /**
     * Definition for ListNode.
     * public class ListNode {
     *     int val;
     *     ListNode next;
     *     ListNode(int val) {
     *         this.val = val;
     *         this.next = null;
     *     }
     * }
     */ 
    public class Solution {
        /**
         * @param ListNode l1 is the head of the linked list
         * @param ListNode l2 is the head of the linked list
         * @return: ListNode head of linked list
         */
        public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
            ListNode dummy = new ListNode(0);
            ListNode curr = dummy;
    
            while ((l1 != null) && (l2 != null)) {
                if (l1.val > l2.val) {
                    curr.next = l2;
                    l2 = l2.next;
                } else {
                    curr.next = l1;
                    l1 = l1.next;
                }
                curr = curr.next;
            }
    
            // link to non-null list
            curr.next = (l1 != null) ? l1 : l2;
    
            return dummy.next;
        }
    }

## 源码分析

    异常处理，包含在dummy->next中。
    引入dummy和curr节点，此时curr指向的节点为dummy
    对非空l1,l2循环处理，将l1/l2的较小者链接到curr->next，往后递推curr
    最后处理l1/l2中某一链表为空退出while循环，将非空链表头链接到curr->next
    返回dummy->next，即最终的首指针
    注意curr的递推并不影响dummy->next的值，因为lastNode和dummy是两个不同的指针变量。
    链表的合并为常用操作，务必非常熟练，以上的模板非常精炼，有两个地方需要记牢。
    1. 循环结束条件中为条件与操作；2. 最后处理curr->next指针的值。

## 复杂度分析

    最好情况下，一个链表为空，时间复杂度为 O(1). 最坏情况下，curr遍历两个链表中的每一个节点，
    时间复杂度为 O(l1+l2). 空间复杂度近似为 O(1).