# Zero Sum Subarray

## Question

- lintcode: (138) Subarray Sum
- GeeksforGeeks: Find if there is a subarray with 0 sum - GeeksforGeeks

```
Given an integer array, find a subarray where the sum of numbers is zero.
Your code should return the index of the first number and the index of the last number.

Example
Given [-3, 1, 2, -3, 4], return [0, 2] or [1, 3].

Note
There is at least one subarray that it's sum equals to zero.
```

## 题解1 - 两重 for 循环

    题目中仅要求返回一个子串(连续)中和为0的索引，而不必返回所有可能满足题意的解。
    最简单的想法是遍历所有子串，判断其和是否为0，使用两重循环即可搞定，最坏情况下时间复杂度为 O(n^2), 
    这种方法显然是极其低效的，极有可能会出现 TLE. 下面就不浪费篇幅贴代码了。
    
## 题解2 - 比较子串和(TLE)

    两重 for 循环显然是我们不希望看到的解法，那么我们再来分析下题意，题目中的对象是分析子串和，
    那么我们先从常见的对数组求和出发，子串和为0，也就意味着存在不同的 i_1和 i_2使得 f(i_1) - f(i_2) = 0,
    等价于 f(i_1) = f(i_2). 思路很快就明晰了，使用一 vector 保存数组中从 0 开始到索引i的和，
    在将值 push 进 vector 之前先检查 vector 中是否已经存在，若存在则将相应索引加入最终结果并返回。


## C++

    class Solution {
    public:
        /**
         * @param nums: A list of integers
         * @return: A list of integers includes the index of the first number
         *          and the index of the last number
         */
        vector<int> subarraySum(vector<int> nums){
            vector<int> result;
    
            int curr_sum = 0;
            vector<int> sum_i;
            for (int i = 0; i != nums.size(); ++i) {
                curr_sum += nums[i];
    
                if (0 == curr_sum) {
                    result.push_back(0);
                    result.push_back(i);
                    return result;
                }
    
                vector<int>::iterator iter = find(sum_i.begin(), sum_i.end(), curr_sum);
                if (iter != sum_i.end()) {
                    result.push_back(iter - sum_i.begin() + 1);
                    result.push_back(i);
                    return result;
                }
    
                sum_i.push_back(curr_sum);
            }
    
            return result;
        }
    };
    
## 源码分析

    使用curr_sum保存到索引i处的累加和，sum_i保存不同索引处的和。
    执行sum_i.push_back之前先检查curr_sum是否为0，再检查curr_sum是否已经存在于sum_i中。
    是不是觉得这种方法会比题解1好？错！时间复杂度是一样一样的！根本原因在于find操作的时间复杂度为线性。
    与这种方法类似的有哈希表实现，哈希表的查找在理想情况下可认为是 O(1).

## 复杂度分析

    最坏情况下 O(n^2), 实测和题解1中的方法运行时间几乎一致。
    
    
## 题解3 - 哈希表!!!

    终于到了祭出万能方法时候了，题解2可以认为是哈希表的雏形，而哈希表利用空间换时间的思路争取到了宝贵的时间资源 :)
    
    1. Given A[i]
      A[i] | 2 |  1 | -1 | 0 | 2 | -1 | -1
    -------+---|----|--------|---|----|---
    sum[i] | 2 |  3 |  2 | 2 | 4 |  3 |  2
    
    2. sum[i] = A[0] + A[1] + ...+ A[i]
    3. build a map<Integer, Set>
    4. loop through array sum, and lookup map to get the set and generate set, 
    and push <sum[i], i> into map.
    
    Complexity O(n)
    
## javascript 

    function subarraySumZero(nums) {
        var result = [];
    
        // curr_sum for the first item, index for the second item
        var hash = new Map();
        hash.set(0, 0);
    
        var curr_sum = 0;
        for (var i = 0; i != nums.length; ++i) {
            curr_sum += nums[i];
            if (hash.get(curr_sum) != hash.values()[hash.entries() - 1]) {
                result.push(hash.get(curr_sum));
                result.push(i);
                return result;
            } else {
                hash.set(curr_sum, i + 1);
            }
        }
    
        return result;
    }

    console.log(subarraySumZero([-3, 1, 5, -2, -4, 5, 6]));  //[1,4]

## C++

    class Solution {
    public:
        /**
         * @param nums: A list of integers
         * @return: A list of integers includes the index of the first number
         *          and the index of the last number
         */
        vector<int> subarraySum(vector<int> nums){
            vector<int> result;
            // curr_sum for the first item, index for the second item
            map<int, int> hash;
            hash[0] = 0;
    
            int curr_sum = 0;
            for (int i = 0; i != nums.size(); ++i) {
                curr_sum += nums[i];
                if (hash.find(curr_sum) != hash.end()) {
                    result.push_back(hash[curr_sum]);
                    result.push_back(i);
                    return result;
                } else {
                    hash[curr_sum] = i + 1;
                }
            }
    
            return result;
        }
    };
    
## 源码分析

    为了将curr_sum == 0的情况也考虑在内，初始化哈希表后即赋予 <0, 0>. 给 hash赋值时使用i + 1, 
    push_back时则不必再加1.
    由于 C++ 中的map采用红黑树实现，故其并非真正的「哈希表」，C++ 11中引入的unordered_map用作哈希表效率更高，
    实测可由1300ms 降至1000ms.
    
## 复杂度分析

    遍历求和时间复杂度为 O(n), 哈希表检查键值时间复杂度为 O(logL), 其中 L 为哈希表长度。
    如果采用unordered_map实现，最坏情况下查找的时间复杂度为线性，最好为常数级别。
    
    
## 题解4 - 排序

    除了使用哈希表，我们还可使用排序的方法找到两个子串和相等的情况。这种方法的时间复杂度主要集中在排序方法的实现。
    由于除了记录子串和之外还需记录索引，故引入pair记录索引，最后排序时先按照sum值来排序，
    然后再按照索引值排序。如果需要自定义排序规则可参考sort_pair_second.
    
## C++

    class Solution {
    public:
        /**
         * @param nums: A list of integers
         * @return: A list of integers includes the index of the first number
         *          and the index of the last number
         */
        vector<int> subarraySum(vector<int> nums){
            vector<int> result;
            if (nums.empty()) {
                return result;
            }
    
            const int num_size = nums.size();
            vector<pair<int, int> > sum_index(num_size + 1);
            for (int i = 0; i != num_size; ++i) {
                sum_index[i + 1].first = sum_index[i].first + nums[i];
                sum_index[i + 1].second = i + 1;
            }
    
            sort(sum_index.begin(), sum_index.end());
            for (int i = 1; i < num_size + 1; ++i) {
                if (sum_index[i].first == sum_index[i - 1].first) {
                    result.push_back(sum_index[i - 1].second);
                    result.push_back(sum_index[i].second - 1);
                    return result;
                }
            }
    
            return result;
        }
    };
    
## 源码分析
    
    没啥好分析的，注意好边界条件即可。这里采用了链表中常用的「dummy」节点方法，
    pair排序后即为我们需要的排序结果。这种排序的方法需要先求得所有子串和然后再排序，
    最后还需要遍历排序后的数组，效率自然是比不上哈希表。但是在某些情况下这种方法有一定优势。
    
## 复杂度分析

    遍历求子串和，时间复杂度为 O(n), 空间复杂度 O(n). 排序时间复杂度近似 O(nlogn), 
    遍历一次最坏情况下时间复杂度为 O(n). 总的时间复杂度可近似为 O(nlogn). 空间复杂度 O(n).