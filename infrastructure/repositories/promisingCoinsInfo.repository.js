'use strict';

const { models: dbModels } = require('../database/mongodb');
async function set (positiveIndicatorCoinsGeneralInfo) {
    try {
        if (positiveIndicatorCoinsGeneralInfo.length > 0) {
            console.log(`Setting positiveIndicatorCoins objects, ${JSON.stringify(positiveIndicatorCoinsGeneralInfo)}`);
            await dbModels.positiveIndicatorCoins.insertMany(positiveIndicatorCoinsGeneralInfo);
        } else {
            console.log('no data to store in db');
        }
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    set
};
