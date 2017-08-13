function getUrlParam(sUrl, sKey) {
    var paramStr = sUrl.substr(sUrl.indexOf('?') + 1);
    if (paramStr.lastIndexOf('#') !== -1) {
        paramStr = paramStr.substr(0, paramStr.lastIndexOf('#'));
    }

    var arr = paramStr.trim().split('&');
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split('=');
        var key = a[0],
            val = a[1];

        if (!obj.hasOwnProperty(key)) {
            obj[key] = val;
        } else {
            obj[key] = [].concat(obj[key], val);
        }
    }

    if (sKey && sKey.trim().length) {
        if (obj.hasOwnProperty(sKey)) {
            return obj[sKey];
        }
    }

    return obj;
}

console.log(getUrlParam("http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe"));
console.log(getUrlParam("http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe", 'key'));
