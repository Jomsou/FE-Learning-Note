function wordCap(str) {
    var reg = /\b(\w+)\b/g;

    // replace方法第二个参数可以传递一个函数,函数的参数是真这种分组捕获的匹配表达式
    var result = str.replace(reg, function (word) {
        return word.substr(0, 1).toUpperCase() + word.substr(1);
    });

    return result;
}

var result = wordCap("this is a paragraph. hello world! 1234567. haha, hehe , heihei.");
console.log(result);