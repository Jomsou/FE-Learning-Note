/**
 * Given two strings s and t, write a function to determine if t is an anagram of s.

 For example,
 s = "anagram", t = "nagaram", return true.
 s = "rat", t = "car", return false.
 */

//判断两个字符串是否为"相同字母异序词"
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }
    var map = new Map();
    for (var i = 0, l = s.length; i < l; i++) {
        if (map.has(s[i])) {
            map.set(s[i], map.get(s[i]) + 1);
        } else {
            map.set(s[i], 1);
        }
    }

    for (var j = 0, k = t.length; j < k; j++) {
        var ele = t[j];
        if (!map.has(ele)) {
            return false;
        }

        var count = map.get(ele) - 1;
        if (count === 0) {
            map.delete(ele);
        } else {
            map.set(ele, count);
        }
    }

    if (map.keys().length) {
        return false;
    }

    return true;
};

console.log(isAnagram('aacc', 'ccaa'));

