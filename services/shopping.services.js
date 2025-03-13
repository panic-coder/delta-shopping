const moment = require('moment');
const pricesConstant = require('../constants/prices');

/**
 * 
 * @description This service calculates the final price as per the basket provided
 * @param {*} basket It consists of array of fruits in the basket.
 * @returns 
 */
exports.calculateTotal = async (basket) => {
    return new Promise((resolve, reject) => {
        try {
            // Prices in paise (100 paise = 1 rupee)
            const prices = pricesConstant;

            // Counting occurrences of each item
            let itemCounts = {};
            basket.forEach(item => {
                itemCounts[item] = (itemCounts[item] || 0) + 1;
            });

            let totalCost = 0;

            // Calculating cost with offers
            totalCost += (itemCounts.Apple || 0) * prices.Apple;
            totalCost += (itemCounts.Banana || 0) * prices.Banana;

            // Melon: Buy One Get One Free
            let melons = itemCounts.Melon || 0;
            totalCost += Math.ceil(melons / 2) * prices.Melon;

            // Lime: 3 for the price of 2
            let limes = itemCounts.Lime || 0;
            let limeSets = Math.floor(limes / 3);  // Every 3 limes count as 2
            let remainingLimes = limes % 3;  // Extra limes charged fully
            totalCost += (limeSets * 2 * prices.Lime) + (remainingLimes * prices.Lime);

            // Convert paise to rupees
            let totalCostRupees = (totalCost / 100).toFixed(2);
            resolve({success: true, totalCost: totalCostRupees});
        } catch (error) {
            reject({success: false, error})
        }
    })
}
