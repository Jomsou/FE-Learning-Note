/**
 121. Best Time to Buy and Sell Stock

 Difficulty: Easy
 Say you have an array for which the ith element is the price of a given stock on day i.

 If you were only permitted to complete at most one transaction (ie, buy one and sell one
 share of the stock), design an algorithm to find the maximum profit.

 Example 1:
 Input: [7, 1, 5, 3, 6, 4]
 Output: 5

 max. difference = 6-1 = 5 (not 7-1 = 6, as selling price needs to be larger than 
 buying price)
 Example 2:
 Input: [7, 6, 4, 3, 1]
 Output: 0

 In this case, no transaction is done, i.e. max profit = 0.
 */

/**
 * 给一个数prices[]，prices[i]代表股票在第i天的售价，求出只做一次交易(一次买入和卖出)能得到的最大收益。

 只需要找出最大的差值即可，即 max(prices[j] – prices[i]) ，i < j。
 一次遍历即可，在遍历的时间用遍历low记录 prices[o....i] 中的最小值，就是当前为止的最低售价，
 时间复杂度为 O(n)。

 用类似动态规划的思想，到第i天买入，那么我能赚到的最大利润是多少呢？就是i + 1 ~ n天中最大的股价减去第i天的。
 找最大股价的问题可以在找第i+1~n天的最大利润时顺便记录.
 * */


/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (prices.length === 0) {
        return 0;
    }


    var maxPrice = prices[prices.length - 1];
    var ans = 0;
    for (var i = prices.length - 1; i >= 0; i--) {
        maxPrice = Math.max(maxPrice, prices[i]);
        ans = Math.max(ans, maxPrice - prices[i]);
    }

    return ans;
};