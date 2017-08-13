/**
 * Given a non-empty array of integers, return the k most frequent elements.
 * For example,
 * Given [1,1,1,2,2,3] and k = 2, return [1,2].
 */
var topKFrequent = function (nums, k) {
    //先使用map存放数组中的元素
    var map = new Map();
    for (var i = 0, l = nums.length; i < l; i++) {
        var ele = nums[i];
        if (!map.get(ele)) {
            map.set(ele, 1);
        } else {
            map.set(ele, map.get(ele) + 1);
        }
    }

    //从map中找出前五个最大值
    var result = [];
    for (var j = 0; j < k; j++) {
        var max = 0, kk = 0;
        for (var entry of map.entries()) {   //leetCode不支持for(let [key,value] of map.entries())写法
            var key = entry[0], value = entry[1];
            if (value > max) {
                max = value;
                kk = key;
            }
        }
        result.push(kk);
        map.delete(kk);
    }

    return result;
};

console.log(topKFrequent([1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 5], 3));
