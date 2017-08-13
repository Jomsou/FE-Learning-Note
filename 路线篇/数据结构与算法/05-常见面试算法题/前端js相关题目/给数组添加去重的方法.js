Array.prototype.uniq = function () {
    var resArr = [];
    var flag = true;

    for (var i = 0; i < this.length; i++) {
        if (resArr.indexOf(this[i]) == -1) {
            if (this[i] != this[i]) {   //排除 NaN
                if (flag) {
                    resArr.push(this[i]);
                    flag = false;
                }
            } else {
                resArr.push(this[i]);
            }
        }
    }
    return resArr;
}

var res = [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN].uniq();
console.log(res);

/**
 * 转换变量为驼峰命名形式
 * */
function cssStyle2DomStyle(sName) {
    var arr = sName.split('-');
    if (arr[0] === '') {   //-webkit-border-radius这种形式
        arr = arr.slice(1);
    }

    if (arr.length === 1) {
        return arr[0];
    }

    var res = [];
    res.push(arr[0]);
    for (var i = 1; i < arr.length; i++) {
        var s = arr[i];
        res.push(s.charAt(0).toUpperCase() + s.substr(1));
    }

    return res.join('');
}

console.log(cssStyle2DomStyle('font-size'));
console.log(cssStyle2DomStyle('-webkit-border-radius'));

function count(str) {
    if (!str || !str.length) {
        return {};
    }

    var obj = {};

    for (var i = 0, l = str.length; i < l; i++) {
        var ch = str[i];
        if (ch === ' ') {
            continue;
        } else {
            if (!obj.hasOwnProperty(ch)) {
                obj[ch] = 1;
            } else {
                obj[ch] = obj[ch] + 1;
            }
        }
    }

    return obj;
}

console.log(count('hello world'));
