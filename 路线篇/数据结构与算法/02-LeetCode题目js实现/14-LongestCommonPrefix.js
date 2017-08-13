//找出一组字符串的最长公共前缀
var longestCommonPrefix = function (strs/*an array of strings*/) {
    if (strs.length == 0) return "";
    var prefix = strs[0];
    for (var i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) != 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix.length === 0) return "";
        }
    }
    return prefix;
};

console.log(longestCommonPrefix(["leetcode", "let", "leed", "leeds"]));
