# Remove Duplicates from Sorted List II

## Question

- leetcode: Remove Duplicates from Sorted List II | LeetCode OJ
- lintcode: (113) Remove Duplicates from Sorted List II

```
Problem Statement

Given a sorted linked list, delete all nodes that have duplicate numbers, 
leaving only distinct numbers from the original list.

Example
Given 1->2->3->3->4->4->5, return 1->2->5.
Given 1->1->1->2->3, return 2->3.
```

## 题解

上题为保留重复值节点的一个，这题删除全部重复节点，看似区别不大，但是考虑到链表头不确定
(可能被删除，也可能保留)，因此若用传统方式需要较多的if条件语句。
这里介绍一个处理链表头节点不确定的方法——引入dummy node.

    ListNode *dummy = new ListNode(0);
    dummy->next = head;
    ListNode *node = dummy;
    
引入新的指针变量dummy，并将其next变量赋值为head，考虑到原来的链表头节点可能被删除，
故应该从dummy处开始处理，这里复用了head变量。考虑链表A->B->C，删除B时，需要处理和考虑的是A和C，
将A的next指向C。如果从空间使用效率考虑，可以使用head代替以上的node，含义一样，node比较好理解点。
与上题不同的是，由于此题引入了新的节点dummy，不可再使用node->val == node->next->val，
原因有二：
此题需要将值相等的节点全部删掉，而删除链表的操作与节点前后两个节点都有关系，故需要涉及三个链表节点。
且删除单向链表节点时不能删除当前节点，只能改变当前节点的next指向的节点。
在判断val是否相等时需先确定node->next和node->next->next均不为空，否则不可对其进行取值。

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
        ListNode* deleteDuplicates(ListNode* head) {
            if (head == NULL) return NULL;
    
            ListNode dummy(0);
            dummy.next = head;
            ListNode *node = &dummy;
            while (node->next != NULL && node->next->next != NULL) {
                if (node->next->val == node->next->next->val) {
                    int val_prev = node->next->val;
                    // remove ListNode node->next
                    while (node->next != NULL && val_prev == node->next->val) {
                        ListNode *temp = node->next;
                        node->next = node->next->next;
                        delete temp;
                    }
                } else {
                    node = node->next;
                }
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
        public ListNode deleteDuplicates(ListNode head) {
            if (head == null) return null;
    
            ListNode dummy = new ListNode(0);
            dummy.next = head;
            ListNode node = dummy;
            while(node.next != null && node.next.next != null) {
                if (node.next.val == node.next.next.val) {
                    int val_prev = node.next.val;
                    while (node.next != null && node.next.val == val_prev) {
                        node.next = node.next.next;
                    }
                } else {
                    node = node.next;
                }
            }
    
            return dummy.next;
        }
    }

## 源码分析

    首先考虑异常情况，head 为 NULL 时返回 NULL
    new一个dummy变量，dummy->next指向原链表头。(C++中最好不要使用 new 的方式生成 dummy, 
    否则会有内存泄露)
    使用新变量node并设置其为dummy头节点，遍历用。
    当前节点和下一节点val相同时先保存当前值，便于while循环终止条件判断和删除节点。注意这一段代码也比较精炼。
    最后返回dummy->next，即题目所要求的头节点。

## 复杂度分析

    两根指针(node.next 和 node.next.next)遍历，时间复杂度为 O(2n). 
    使用了一个 dummy 和中间缓存变量，空间复杂度近似为 O(1).