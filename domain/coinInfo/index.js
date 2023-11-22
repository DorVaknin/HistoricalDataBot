const { generalInfo: generalInfoApi, cccaggConstituentPairs: cccaggConstituentPairsApi, tradingPairsPerExchange } = require('../../infrastructure/externalApis/cryptoCompareApi');
const { stableCoins } = require('../../infrastructure/utils/consts');

async function getCoinsSymbolsWithUsdPairings() {
    const pairs = await cccaggConstituentPairsApi.getPairs();
    const coinSymbolsWithUsdPairings = Object.keys(pairs).filter(x => Boolean(Object.keys(pairs[x].tsyms).find(x => stableCoins.includes(x))));
 return coinSymbolsWithUsdPairings;
}

async function getPositiveIndicatorCoinSymbolGeneralInfo({ coinSymbol, indicatorsResults, exchange }) {
    const result = await generalInfoApi.getCoinGeneralInfo(coinSymbol);
    if (result.Response === 'Error') {
        return undefined;
    } else {
        coinInformation = Object.values(result.Data)[0];
        return coinInformation ? {
            exchange,
            date: Date.now(),
            coinName: coinInformation.FullName || coinInformation.Name,
            indicatorsResults
        } : undefined;
    }
}

async function getCoinsSymbolsWithUsdPairingsPerExchange(exchange) {
    const pairs = await tradingPairsPerExchange.getPairsForExchange(exchange);
    const coinSymbolsWithUsdPairings = Object.keys(pairs).filter(x => Boolean(Object.keys(pairs[x].tsyms).find(x => stableCoins.includes(x))));
 return coinSymbolsWithUsdPairings;
}



module.exports = {
    getCoinsSymbolsPerExchange: getCoinsSymbolsWithUsdPairingsPerExchange,
    getCoinsSymbols: getCoinsSymbolsWithUsdPairings,
    getGeneralInfo: getPositiveIndicatorCoinSymbolGeneralInfo
}