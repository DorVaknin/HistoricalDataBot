const historicalRepository = require('../../../infrastructure/externalApis/cryptoCompareApi/historical');
const { filterRecordsWithNoData } = require('../../../infrastructure/filters');
const { isNil } = require('lodash');
const { calculationPeriod: T, volumeEquationConstant } = require('../../../infrastructure/utils/consts');
const { indicatorType } = require('../../../enums');
async function isPositiveIndicator(coin, exchange) {
    let coinData = await historicalRepository.getCoinHistoricalOHLCVDailyData(coin, exchange);
    let isPositive = false;
    if (coinData.Response === 'Error') {
        return undefined;
    } else {
        coinData = filterRecordsWithNoData(coinData.Data.Data);
        const averageTradingVolumeFromBeginningUntilLastTDaysAgo = calculateAverageTradingVolumeFromBeginningUntilLastTDaysAgo(coinData);
        const averageOfLastTDaysExcludingToday = calculateAverageOfLastTDaysExcludingToday(coinData);
        const volumeEquationResult = averageOfLastTDaysExcludingToday/averageTradingVolumeFromBeginningUntilLastTDaysAgo;
        if(averageOfLastTDaysExcludingToday === 0) {
            return undefined;
        }
        isPositive = volumeEquationResult > volumeEquationConstant
        printCoinInformation(coin, volumeEquationResult, averageOfLastTDaysExcludingToday, averageTradingVolumeFromBeginningUntilLastTDaysAgo, isPositive, exchange);
        return {
            coinSymbol: coin,
            isPositive,
            equationResult: volumeEquationResult,
            indicatorType: indicatorType.volume
        }
    }
}

function calculateAverageTradingVolumeFromBeginningUntilLastTDaysAgo(coinData) {
    const numOfAvailableDailyHistoryRecordsFromBeginningUntilLastTDaysAgo = coinData.length - T - 2;
    let sumOfDailyTradingVolume = 0;
    let numberOfDays = 0;
    for (let i = 0; i <= numOfAvailableDailyHistoryRecordsFromBeginningUntilLastTDaysAgo; i++) {
        if(isNil(coinData[i].volumeto)) {
            continue;
        }
        sumOfDailyTradingVolume += coinData[i].volumeto;
        numberOfDays += 1;
    }

    return sumOfDailyTradingVolume/numberOfDays;
}

function calculateAverageOfLastTDaysExcludingToday (coinData) {
    const isValidLength = validateLength(coinData);
    if(!isValidLength) return 0;
    const numberOfHistoryRecordsExcludingToday = coinData.length - 2;
    const numberOfHistoryRecordsBeforeTDaysAgoExcludingToday = coinData.length - T - 2;
    let sumOfDailyTradingVolume = 0;
    let numberOfDays = 0;
    for (let i = numberOfHistoryRecordsExcludingToday; i > numberOfHistoryRecordsBeforeTDaysAgoExcludingToday; i--) {
        if(isNil(coinData[i].volumeto)) {
            continue;
        }
        sumOfDailyTradingVolume += coinData[i].volumeto;
        numberOfDays += 1;
    }

    return sumOfDailyTradingVolume/numberOfDays;
}

function printCoinInformation(coin, volumeEquationResult, averageOfLastTDaysExcludingToday, averageTradingVolumeFromBeginningUntilLastTDaysAgo, isGoingToExplode, exchange) {
    console.log(`${'-'.repeat(50)}`);
    console.log(`indicatorType: ${indicatorType.volume}`);
    console.log(`CoinName: ${coin} \n${indicatorType.volume}EquationResult: ${volumeEquationResult} \naverageOfLastTDaysExcludingToday: ${averageOfLastTDaysExcludingToday} \naverageTradingVolumeFromBeginningUntilLastTDaysAgo: ${averageTradingVolumeFromBeginningUntilLastTDaysAgo}`);
    console.log(`indicator results: ${isGoingToExplode}`);
    console.log(`exchange: ${exchange}`);
}

function validateLength(coinData) {
    return coinData.length - T - 2 > T + 10;
}

module.exports = {
    useIndicator: isPositiveIndicator
}