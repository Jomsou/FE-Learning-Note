/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;

    var p1 = l1, p2 = l2, head = {}, tmp = {};
    if (p1.val <= p2.val) {
        if (!head) {
            head.next = p1;
        }
        tmp.next = p1;
        tmp = p1;
        p1 = p1.next;
    } else {
        if (!head) {
            head.next = p2;
        }
        tmp.next = p2;
        tmp = p2;
        p2 = p2.next;
    }

    if (p1) {
        tmp.next = p1;
    }

    if (p2) {
        tmp.next = p2;
    }

    return head;
};
