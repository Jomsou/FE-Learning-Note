# Binary Tree Inorder Traversal

## Question

- leetcode: Binary Tree Inorder Traversal | LeetCode OJ
- lintcode: (67) Binary Tree Inorder Traversal

```
Problem Statement

Given a binary tree, return the inorder traversal of its nodes' values.

Example
Given binary tree {1,#,2,3},
   1
    \
     2
    /
   3
return [1,3,2].

Challenge
Can you do it without recursion?
```

## 题解1 - 递归版

中序遍历的访问顺序为『先左再根后右』，递归版最好理解，递归调用时注意返回值和递归左右子树的顺序即可。

## C++
    
    /**
     * Definition for a binary tree node.
     * struct TreeNode {
     *     int val;
     *     TreeNode *left;
     *     TreeNode *right;
     *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
     * };
     */
    class Solution {
    public:
        vector<int> inorderTraversal(TreeNode* root) {
            vector<int> result;
            helper(root, result);
            return result;
        }
    
    private:
        void helper(TreeNode *root, vector<int> &ret) {
            if (root != NULL) {
                helper(root->left, ret);
                ret.push_back(root->val);
                helper(root->right, ret);
            }
        }
    };

## Java

    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     *     int val;
     *     TreeNode left;
     *     TreeNode right;
     *     TreeNode(int x) { val = x; }
     * }
     */
    public class Solution {
        public List<Integer> inorderTraversal(TreeNode root) {
            List<Integer> result = new ArrayList<Integer>();
            helper(root, result);
            return result;
        }
    
        private void helper(TreeNode root, List<Integer> ret) {
            if (root != null) {
                helper(root.left, ret);
                ret.add(root.val);
                helper(root.right, ret);
            }
        }
    }

## 源码分析

    通用的方法为在递归函数入口参数中传入返回结果， 也可使用分治的方法替代辅助函数。

## 复杂度分析

    树中每个节点都需要被访问常数次，时间复杂度近似为 O(n). 未使用额外辅助空间。

## 题解2 - 迭代版

    使用辅助栈改写递归程序，中序遍历没有前序遍历好写，其中之一就在于入栈出栈的顺序和限制规则。
    我们采用「左根右」的访问顺序可知主要由如下四步构成。
    首先需要一直对左子树迭代并将非空节点入栈
    节点指针为空后不再入栈
    当前节点为空时进行出栈操作，并访问栈顶节点
    将当前指针p用其右子节点替代
    步骤2,3,4对应「左根右」的遍历结构，只是此时的步骤2取的左值为空。

## C++

    /**
     * Definition of TreeNode:
     * class TreeNode {
     * public:
     *     int val;
     *     TreeNode *left, *right;
     *     TreeNode(int val) {
     *         this->val = val;
     *         this->left = this->right = NULL;
     *     }
     * }
     */
    class Solution {
        /**
         * @param root: The root of binary tree.
         * @return: Inorder in vector which contains node values.
         */
    public:
        vector<int> inorderTraversal(TreeNode *root) {
            vector<int> result;
            stack<TreeNode *> s;
    
            while (!s.empty() || NULL != root) {
                if (root != NULL) {
                    s.push(root);
                    root = root->left;
                } else {
                    root = s.top();
                    s.pop();
                    result.push_back(root->val);
                    root = root->right;
                }
            }
    
            return result;
        }
    };

## Java
    
    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     *     int val;
     *     TreeNode left;
     *     TreeNode right;
     *     TreeNode(int x) { val = x; }
     * }
     */
    public class Solution {
        public List<Integer> inorderTraversal(TreeNode root) {
            List<Integer> result = new ArrayList<Integer>();
            if (root == null) return result;
    
            Deque<TreeNode> stack = new ArrayDeque<TreeNode>();
            while (root != null || (!stack.isEmpty())) {
                if (root != null) {
                    stack.push(root);
                    root = root.left;
                } else {
                    root = stack.pop();
                    result.add(root.val);
                    root = root.right;
                }
            }
    
            return result;
        }
    }

## 源码分析

    使用栈的思想模拟递归，注意迭代的演进和边界条件即可。

## 复杂度分析

    最坏情况下栈保存所有节点，空间复杂度 O(n), 时间复杂度 O(n).