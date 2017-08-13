/***
 * 二叉查找树(二叉排序树)
 *
 * 二叉排序树或者是一棵空树，或者是具有下列性质的二叉树：
 *（1）若左子树不空，则左子树上所有结点的值均小于它的根结点的值；
 *（2）若右子树不空，则右子树上所有结点的值均大于它的根结点的值；
 *（3）左、右子树也分别为二叉排序树；
 *（4）没有键值相等的结点。
 * */

//树节点
var TreeNode = function (data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

//二叉搜索树
function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype = {
    constructor: BinarySearchTree,

    insert: function (data) {
    },

    //中序遍历
    inOrderTraverse: function () {
    },

    //先序遍历
    preOrderTraverse: function () {
    },

    //后序遍历
    postOrderTraverse: function () {
    },

    //查找最大值(右子树)
    findMax: function () {
    },

    //查找最小值(左子树)
    findMin: function () {
    },

    //查找给定值
    find: function (element) {
    },

    //删除元素
    remove: function (element) {
    }
}