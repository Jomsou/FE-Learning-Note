/**
 * 237. Delete Node in a Linked List (O(1)时间复杂度删除指定的节点)

 Write a function to delete a node (except the tail) in a singly linked list,
 given only access to that node.

 Supposed the linked list is 1 -> 2 -> 3 -> 4 and you are given the third node with value 3,
 the linked list should become 1 -> 2 -> 4 after calling your function.
 * */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {

    //待删除的节点是末尾节点
    if (!node.next) {
        node = null;
    }

    //O(1)的时间内删除节点,只需要将下一个节点的值赋值到当前节点,然后删除下一个节点就行了!
    node.val = node.next.val;
    node.next = node.next.next;
};