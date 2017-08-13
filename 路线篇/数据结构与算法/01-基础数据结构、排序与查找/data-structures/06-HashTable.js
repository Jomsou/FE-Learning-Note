/**
 * 散列表
 * 1. 存储数据的数组长度,通常取为质数,并且为了让散列更均匀,数组长度应该大于100? (why?)
 *
 * 2. 散列函数的选择,依赖于键值得数据类型:
 *  > 若键值是整型,最简单常见的散列函数就是用数组长度对键值取余(除留余数法);
 *  > 键是字符串类型,散列函数选择比较难,需要慎重考虑
 *
 * 3. 碰撞检测。常用的方法:
 *  > 开放寻址法
 *  > 再散列法
 *  > 链地址法(拉链法)
 * */

function HashTable() {
    this._data = new Array(137);
}

HashTable.prototype = {
    constructor: HashTable,

    //键是字符串类型,最简单的hash算法: 将每个字符的ASCII code相加,总和对数组总长度取余
    _simpleHash: function (key) {
        key = key + '';
        var total = 0;
        for (var i = 0, l = key.length; i < l; i++) {
            total += key.charCodeAt(i);
        }

        return total % this._data.length;
    },

    //更好的hash算法:霍纳算法。仍然要取各个字符的ASCII值,不过每次求和时乘以一个质数,
    // 大多数算法书建议一个较小的质数
    _betterHash: function (key) {
        key = key + '';
        const H = 31;
        var total = 0;
        for (var i = 0, l = key.length; i < l; i++) {
            total += H * total + key.charCodeAt(i);
        }

        return total % this._data.length;
    },

    entries: function () {
        var entryArr = [];
        for (var i = 0, l = this._data.length; i < l; i++) {
            if (this._data[i]) {
                entryArr.push(this._data[i]);
            }
        }
        return entryArr;
    },

    keys: function () {
        var keysArr = [];
        for (var i = 0, l = this._data.length; i < l; i++) {
            if (this._data[i]) {
                keysArr.push(this._data[i].key);
            }
        }
        return keysArr;
    },

    values: function () {
        var valuesArr = [];
        for (var i = 0, l = this._data.length; i < l; i++) {
            if (this._data[i]) {
                valuesArr.push(this._data[i].value);
            }
        }
        return valuesArr;
    },

    put: function (key, value) {
        // var hashCode = this._simpleHash(key);
        var hashCode = this._betterHash(key);
        this._data[hashCode] = {key: key, value: value};
    },

    get: function (key) {
        return this._data[this._betterHash(key)];
    }
}


/***
 * 可能产生碰撞,碰撞检测算法暂时还未实现!
 * @type {HashTable}
 */
var hashTable = new HashTable();
hashTable.put('hello', 'world');
hashTable.put('hello2', 'world2');
hashTable.put('foo', 'bar');
hashTable.put('edgar', 'yijianbo');

console.log(hashTable.keys());
console.log(hashTable.values());
console.log(hashTable.entries());