/**
 * 226. Invert Binary Tree(二叉树镜像)
 Invert a binary tree.
 4
 /   \
 2     7
 / \   / \
 1   3 6   9

 to

 4
 /   \
 7     2
 / \   / \
 9   6 3   1
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
 * @return {TreeNode}
 */

//解法1: 递归解法
var invertTree = function (root) {
    if (!root) {
        return null;
    }

    var tmpNode = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(tmpNode);

    return root;
};


//解法2: 非递归解法
function invertTree2(root) {
    if (!root) {
        return null;
    }
    var queue = [];
    queue.push(root);

    while (queue.length) {
        var pNode = queue.shift();

        //交换左右子树
        var pLeft = pNode.left;
        pNode.left = pNode.right;
        pNode.right = pLeft;

        if (pNode.left)
            queue.push(pNode.left);
        if (pNode.right)
            queue.push(pNode.right);
    }

    return root;
}