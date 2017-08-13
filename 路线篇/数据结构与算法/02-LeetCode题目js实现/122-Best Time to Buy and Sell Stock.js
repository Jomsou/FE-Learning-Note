/**
 * 122. Best Time to Buy and Sell Stock II
 *
 Difficulty: Medium
 Say you have an array for which the i-th element is the price of a given stock on day i.

 Design an algorithm to find the maximum profit.
 You may complete as many transactions as you like (ie, buy one and sell one share of
 the stock multiple times).
 However, you may not engage in multiple transactions at the same time (ie, you must sell
 the stock before you buy again).
 * */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (!prices || !prices.length) {
        return 0;
    }

    var ret = 0;
    var buy = prices[0];
    var last = prices[0];
    for (var i = 1, l = prices.length; i < l; i++) {
        if (prices[i] < last) {
            ret += (last - buy);
            buy = prices[i];
        }
        last = prices[i];
    }
    ret += (last - buy);
    return ret;
};

console.log(maxProfit([1,2,3,4,5,2,5,1]));