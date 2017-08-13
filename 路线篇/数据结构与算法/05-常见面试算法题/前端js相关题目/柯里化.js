/**
 * 题目描述

 已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
 1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
 2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
 3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
 4、调用 c 之后，返回的结果与调用 fn 的返回值一致
 5、fn 的参数依次为函数 a, b, c 的调用参数
 输入例子:
 var fn = function (a, b, c) {return a + b + c};
 curryIt(fn)(1)(2)(3);   //6
 * */

function curryIt(fn) {
    //获取fn参数的数量
    var n = fn.length;
    //声明一个数组args
    var args = [];
    //返回一个匿名函数
    return function (arg) {
        //将curryIt后面括号中的参数放入数组
        args.push(arg);
        //如果args中的参数个数小于fn函数的参数个数，
        //则执行arguments.callee（其作用是引用当前正在执行的函数，这里是返回的当前匿名函数）。
        //否则，返回fn的调用结果
        if (args.length < n) {
            return arguments.callee;
        } else {
            return fn.apply(null, args);
        }
    }
}

var fn = function (a, b, c) {
    return a + b + c
};
var result = curryIt(fn)(1)(2)(3);   //6
console.log(result);