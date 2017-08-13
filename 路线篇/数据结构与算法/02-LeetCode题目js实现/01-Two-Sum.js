function twoSum(nums, target) {
    var length = nums.length;
    var m = new Map();
    for (var i = 0; i < length; i++) {
        m.set(nums[i], i);    //以值为key来存储
    }
    for (var j = 0; j < length; j++) {
        var v = target - nums[j];
        if (m.has(v) && m.get(v) !== j) {
            return [j, m.get(v)];
        }
    }
}
var result = twoSum([1, 2, 4, 5], 6);
console.log(result);