/**
 * 100. Same Tree
 *
 Given two binary trees, write a function to check if they are equal or not.

 Two binary trees are considered equal if they are structurally identical and the
 nodes have the same value.
 * */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    if (!p && !q) {
        return true;
    } else if (!p || !q) {
        return false;
    } else {
        //两树相等的条件是: 根节点的值相等,左右子树都相等!
        var result = (p.val === q.val ? true : false);
        var result1 = isSameTree(p.left, q.left);
        var result2 = isSameTree(p.right, q.right);

        if (result && result1 && result2) {
            return true;
        } else {
            return false;
        }
    }
};