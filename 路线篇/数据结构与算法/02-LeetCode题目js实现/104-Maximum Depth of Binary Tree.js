/**
 * 104. Maximum Depth of Binary Tree
 Given a binary tree, find its maximum depth.

 The maximum depth is the number of nodes along the longest path
 from the root node down to the farthest leaf node.*
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
 * @return {number}
 */


//解法1: 采用深度优先遍历DFS的思想,使用递归
var maxDepth = function (root) {
    if (!root)
        return 0;

    var l = maxDepth(root.left);
    var r = maxDepth(root.right);

    return l > r ? l + 1 : r + 1;
    //以上这两种方式有一种更简便的方法
    //return 1 + max(maxDepth(root.left), maxDepth(root.right));
};


//解法2: 采用广度优先遍历BFS的思想,引入队列
function maxDepth(root) {
    if (!root) {
        return 0;
    }

    var que = [];   //js使用数组模拟队列
    var nCount = 1;
    var nDepth = 0;// 记录队列里面每一层上的元素

    que.push(root);
    while (que.length) {
        var pTemp = que.shift();
        nCount--;

        if (pTemp.left)
            que.push(pTemp.left);
        if (pTemp.right)
            que.push(pTemp.right);

        if (nCount == 0) {
            nDepth++;
            nCount = que.length;
        }
    }
    return nDepth;
}