/***
 * 字典
 *
 * js中的Object就是以字典的形式实现的
 * */

function Dictionary() {
    this._data = {};
}

Dictionary.prototype = {
    constructor: Dictionary,

    add: function (key, value) {
        this._data[key] = value;
    },

    find: function (key) {
        return this._data[key];
    },

    remove: function (key) {
        delete this._data[key];
    },

    showAll: function () {
        for (var key in this._data) {
            if (this._data.hasOwnProperty(key)) {
                console.log([key, this._data[key]]);
            }
        }
    },

    count: function () {
        var count = 0;
        for (var key in this._data) {
            if (this._data.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    },

    clear: function () {
        this._data = {};
    }
}

/*
 var dict = new Dictionary();
 dict.add('one', 1);
 dict.add('two', 2);
 dict.add('three', 3);
 dict.add('four', 4);
 dict.showAll();

 dict.remove('two');
 dict.showAll();
 console.log(dict.count());
 */

module.exports = Dictionary;