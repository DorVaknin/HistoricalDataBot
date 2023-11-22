const indicators = require('../domain/indicators');
const { getGeneralInfo, getCoinsSymbolsPerExchange } = require('../domain/coinInfo');
const { filterCoinsWithErrors, filterNullOrUndefined } = require('../infrastructure/filters');
const positiveIndicatorCoinsRepository = require('../infrastructure/repositories/promisingCoinsInfo.repository');
const { getErrorsInfo } = require('../infrastructure/errorManager');
const { allAreTrue } = require('./../infrastructure/utils/helperFunctions');
const { exchanges, indicatorTypesToRunOn } = require('./../infrastructure/utils/consts');

async function onStartDataHistoricalBot () {
    await iterateOverExchanges(exchanges)
}

async function iterateOverExchanges(exchanges) {
    for(exchange of exchanges) {
        await testIndicatorsOnExchangeCoins(exchange);
    }
}

async function testIndicatorsOnExchangeCoins(exchange) {
    try {
        const coinsSymbols = await getCoinsSymbolsPerExchange(exchange);
        let positiveIndicatorsCoinsDetails = [];
        // let i = 0
        for(coinSymbol of coinsSymbols) {
            // if(i === 3) {
            //     break;
            // }
            let indicatorsResults = [];
            for(let indicatorType of indicatorTypesToRunOn) {
                indicatorsResults.push(await indicators[indicatorType].useIndicator(coinSymbol, exchange));
                // if(i==2) {
                //     indicatorsResults = [{isPositive: true, equationResult: 7, coinSymbol: 'mina', indicatorType, exchange }, {isPositive: true, equationResult: 0.5, coinSymbol: 'mina2', indicatorType, exchange}]
                // }
            }
            if(isPositive(indicatorsResults)) positiveIndicatorsCoinsDetails.push(getPositiveIndicatorsCoinsDetails(indicatorsResults, coinSymbol, exchange)); //TODO make it generic when you have more indicators
            // i++;
        };
        positiveIndicatorsCoinsDetails = filterCoinsWithErrors(positiveIndicatorsCoinsDetails);
        const positiveIndicatorCoinsGeneralInfo = await Promise.all(positiveIndicatorsCoinsDetails.map(getGeneralInfo));
        await positiveIndicatorCoinsRepository.set(filterNullOrUndefined(positiveIndicatorCoinsGeneralInfo));
        console.log(`errorsInfo: ${JSON.stringify(getErrorsInfo())}`);
        console.log(`Amount of coins being tested: ${coinsSymbols.length}`);
    } catch (err) {
        console.log(err);
    }
}

function isPositive(indicatorsResults) {
    return allAreTrue(indicatorsResults.map(x => x?.isPositive));
}

function getPositiveIndicatorsCoinsDetails (indicatorsResults, coinSymbol, exchange) {
    return { exchange, coinSymbol, indicatorsResults: getIndicatorTypeToIndicatorResultMapping(indicatorsResults) }     
}

function getIndicatorTypeToIndicatorResultMapping(indicatorsResults) {
    return indicatorsResults.reduce((acc, indicatorResult) => {
        return {...acc, [indicatorResult.indicatorType]: indicatorResult.equationResult }
    }, {})   
}

module.exports = {
    onStartDataHistoricalBot
}