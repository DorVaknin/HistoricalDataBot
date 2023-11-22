const { isNil } = require('lodash');

function filterCoinsWithErrors(coinsStats) {
    return coinsStats.filter(x => x !== undefined);
}

function filterNegativeIndicators(coinsStats) {
    return coinsStats.filter(x => x.isPositive);
}


function filterNullOrUndefined(arr) {
    return arr.filter(x => !isNil(x));
}

function filterRecordsWithNoData(coinDataResponse) {
    return coinDataResponse.filter(record => record.high != 0 || record.low != 0 || record.open != 0);
}

module.exports = {
    filterCoinsWithErrors,
    filterNegativeIndicators,
    filterNullOrUndefined,
    filterRecordsWithNoData
};