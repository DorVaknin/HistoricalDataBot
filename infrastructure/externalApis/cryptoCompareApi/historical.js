const requestService = require('../../requestService');
const Query = require('../../utils/queryBuilder');
const pairMapping = require('./pairMapping');
const baseUrl = 'https://min-api.cryptocompare.com';
const { storeErrorInfo } = require('../../errorManager');

async function getCoinHistoricalOHLCVDailyData(coinSymbol, exchange) {
  let res;
  let coinTsym;
  const method = 'get';
  try {
    coinTsym = await pairMapping.getCoinTsym(coinSymbol, exchange);
  } catch (error) {
    storeErrorInfo('getCoinHistoricalOHLCVDailyDataFirst', error.message);
    return { Response: 'Error', error};
  }
  const query = new Query()
                .addSubDir('data')
                .addSubDir('v2')
                .addSubDir('histoday')
                .addQuery('fsym', coinSymbol)
                .addQuery('tsym', coinTsym)
                .addQuery('e', exchange)
                .get();
  try {
    res = await requestService.sendRequest({ method, baseUrl, query });
  } catch (error) {
    storeErrorInfo('getCoinHistoricalOHLCVDailyDataSecond', error.message);
    res = { Response: 'Error', error};
  }
  return res;
};

module.exports = {
    getCoinHistoricalOHLCVDailyData
};