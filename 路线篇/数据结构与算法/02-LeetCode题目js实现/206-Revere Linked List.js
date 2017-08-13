/**
 * 206. Reverse Linked List
 *
 * Reverse a singly linked list.
 *
 * */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

//解法1: 递归
var reverseList = function (head) {
    if (!head) {
        return null;
    }

    if (!head.next) {
        return head;
    }

    var p = head.next;
    var n = reverseList(p);

    head.next = null;
    p.next = head;

    return n;
};