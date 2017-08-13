/**
 * 111. Minimum Depth of Binary Tree
 Given a binary tree, find its minimum depth.

 The minimum depth is the number of nodes along the shortest path from the
 root node down to the nearest leaf node.
 *
 */



/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

//解法1: 深度优先遍历DFS, 使用递归
var minDepth = function (root) {
    if (!root) {
        return 0;
    }

    var l = minDepth(root.left);
    var r = minDepth(root.right);

    if (l === 0 && r === 0) {
        return 1;
    }

    if (l === 0) {
        l = Number.POSITIVE_INFINITY;
    }

    if (r === 0) {
        r = Number.POSITIVE_INFINITY;
    }

    return Math.min(l, r) + 1;
};
