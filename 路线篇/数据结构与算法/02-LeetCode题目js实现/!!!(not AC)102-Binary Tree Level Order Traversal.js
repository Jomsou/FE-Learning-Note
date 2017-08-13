/**
 * 102. Binary Tree Level Order Traversal
 *
 Given a binary tree, return the level order traversal of its nodes' values.
 (ie, from left to right, level by level).

 For example:
 Given binary tree [3,9,20,null,null,15,7],
 3
 / \
 9  20
 /  \
 15   7

 return its level order traversal as:
 [
 [3],
 [9,20],
 [15,7]
 ]
 * */



/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

//树的层次遍历,需要引入队列

var levelOrder = function (root) {
    if (!root) {
        return [];
    }

    var queue = [];

    var result = [];  //最终返回的结果

    queue.push(root);
    var a = [];
    a.push(root.val);
    result.push(a);

    while (queue.length) {
        var arr = [];
        var node = queue.shift();

        if (node.left) {
            queue.push(node.left);
            arr.push(node.left.val);
        }

        if (node.right) {
            queue.push(node.right);
            arr.push(node.right.val);
        }

        if (arr.length) {
            result.push(arr);
        }
    }

    return result;
};