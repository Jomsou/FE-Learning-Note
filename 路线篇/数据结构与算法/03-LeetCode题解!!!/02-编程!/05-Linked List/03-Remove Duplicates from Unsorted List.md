# Remove Duplicates from Unsorted List

## Question

    Remove duplicates from an unsorted linked list - GeeksforGeeks
    Write a removeDuplicates() function which takes a list and deletes
    any duplicate nodes from the list. The list is not sorted.
    
    For example if the linked list is 12->11->12->21->41->43->21,
    then removeDuplicates() should convert the list to 12->11->21->41->43.
    
    If temporary buffer is not allowed, how to solve it?


## 题解1 - 两重循环

Remove Duplicates 系列题，之前都是已排序链表，这个题为未排序链表。原题出自 CTCI 题2.1。
最容易想到的简单办法就是两重循环删除重复节点了，当前遍历节点作为第一重循环，当前节点的下一节点作为第二重循环。


## C++

    /**
     * Definition of ListNode
     * class ListNode {
     * public:
     *     int val;
     *     ListNode *next;
     *     ListNode(int val) {
     *         this->val = val;
     *         this->next = NULL;
     *     }
     * }
     */
    class Solution {
    public:
        /**
         * @param head: The first node of linked list.
         * @return: head node
         */
        ListNode *deleteDuplicates(ListNode *head) {
            if (head == NULL) return NULL;
    
            ListNode *curr = head;
            while (curr != NULL) {
                ListNode *inner = curr;
                while (inner->next != NULL) {
                    if (inner->next->val == curr->val) {
                        inner->next = inner->next->next;
                    } else {
                        inner = inner->next;
                    }
                }
                curr = curr->next;
            }
    
            return head;
        }
    };

## Java

    /**
     * Definition for ListNode
     * public class ListNode {
     *     int val;
     *     ListNode next;
     *     ListNode(int x) {
     *         val = x;
     *         next = null;
     *     }
     * }
     */
    public class Solution {
        /**
         * @param ListNode head is the head of the linked list
         * @return: ListNode head of linked list
         */
        public static ListNode deleteDuplicates(ListNode head) {
            if (head == null) return null;
    
            ListNode curr = head;
            while (curr != null) {
                ListNode inner = curr;
                while (inner.next != null) {
                    if (inner.next.val == curr.val) {
                        inner.next = inner.next.next;
                    } else {
                        inner = inner.next;
                    }
                }
                curr = curr.next;
            }
    
            return head;
        }
    }

## 源码分析

删除链表的操作一般判断node.next较为合适，循环时注意inner = inner.next和
inner.next = inner.next.next的区别即可。

## 复杂度分析

    两重循环，时间复杂度为 O[(1/2)(n^2)], 空间复杂度近似为 O(1)O(1).

## 题解2 - 万能的 hashtable

使用辅助空间哈希表，节点值作为键，布尔值作为相应的值（是否为布尔值其实无所谓，关键是键）。

## C++

    /**
     * Definition of ListNode
     * class ListNode {
     * public:
     *     int val;
     *     ListNode *next;
     *     ListNode(int val) {
     *         this->val = val;
     *         this->next = NULL;
     *     }
     * }
     */
    class Solution {
    public:
        /**
         * @param head: The first node of linked list.
         * @return: head node
         */
        ListNode *deleteDuplicates(ListNode *head) {
            if (head == NULL) return NULL;
    
            // C++ 11 use unordered_map
            // unordered_map<int, bool> hash;
            map<int, bool> hash;
            hash[head->val] = true;
            ListNode *curr = head;
            while (curr->next != NULL) {
                if (hash.find(curr->next->val) != hash.end()) {
                    ListNode *temp = curr->next;
                    curr->next = curr->next->next;
                    delete temp;
                } else {
                    hash[curr->next->val] = true;
                    curr = curr->next;
                }
            }
    
            return head;
        }
    };

## Java
    
    /**
     * Definition for ListNode
     * public class ListNode {
     *     int val;
     *     ListNode next;
     *     ListNode(int x) {
     *         val = x;
     *         next = null;
     *     }
     * }
     */
    public class Solution {
        /**
         * @param ListNode head is the head of the linked list
         * @return: ListNode head of linked list
         */
        public static ListNode deleteDuplicates(ListNode head) {
            if (head == null) return null;
    
            ListNode curr = head;
            HashMap<Integer, Boolean> hash = new HashMap<Integer, Boolean>();
            hash.put(curr.val, true);
            while (curr.next != null) {
                if (hash.containsKey(curr.next.val)) {
                    curr.next = curr.next.next;
                } else {
                    hash.put(curr.next.val, true);
                    curr = curr.next;
                }
            }
    
            return head;
        }
    }

## 源码分析

    删除链表中某个节点的经典模板在while循环中体现。

## 复杂度分析

    遍历一次链表，时间复杂度为 O(n), 使用了额外的哈希表，空间复杂度近似为 O(n).