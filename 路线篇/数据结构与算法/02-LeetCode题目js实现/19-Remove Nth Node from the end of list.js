/**
 * 删除链表的倒数第N个节点
 * Given linked list: 1->2->3->4->5, and n = 2.
 * After removing the second node from the end, the linked list becomes 1->2->3->5.
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    //使用两个指针,同步后移
    var h1 = head, h2 = head;
    //先将h1后移n
    for (var i = 0; i < n; i++) {
        h1 = h1.next;
    }
    if (!h1) {
        head = head.next;
        h2 = null;
        return head;
    }
    //同步后移h1,h2
    while (h1.next !== null) {
        h1 = h1.next;
        h2 = h2.next;
    }

    if (!h2 || !h2.next) {
        head = head.next;
        return head;
    }

    var tmp = h2.next.next;
    h2.next = tmp;
    return head;
};
