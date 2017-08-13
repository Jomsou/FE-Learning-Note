/**
 * Write a function that takes a string as input and reverse only the vowels of a string.

 Example 1:
 Given s = "hello", return "holle".

 Example 2:
 Given s = "leetcode", return "leotcede".
 */

var reverseVowels = function (s) {
    var vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    var m = new Map();
    var arr = s.split('');
    //将输入字符串中的元音字母存放在一个map中
    for (var i = 0, l = arr.length; i < l; i++) {
        var v = arr[i];
        if (vowels.indexOf(v) !== -1) {
            //map的key是长度索引
            m.set(m.size++, {
                index: i,
                value: v
            });
        }
    }

    var length = m.size;
    for (var j = 0; j < Math.floor(length / 2); j++) {
        var obj1 = m.get(j), obj2 = m.get(length - j - 1);
        arr[obj1.index] = obj2.value;
        arr[obj2.index] = obj1.value;
    }

    return arr.join('');
};

console.log(reverseVowels("leetcode"));
console.log(reverseVowels("hello"));
