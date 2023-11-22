const requestService = require('../../requestService');
const Query = require('../../utils/queryBuilder');
const baseUrl = 'https://min-api.cryptocompare.com'
const { storeErrorInfo } = require('../../errorManager');
async function getCoinGeneralInfo(coinSymbol) {
  const method = 'get';
  const query = new Query()
                .addSubDir('data')
                .addSubDir('all')
                .addSubDir('coinlist')
                .addQuery('fsym', coinSymbol)
                // .addQuery('fsym', 'MINA')
                .get();
  try {
    res = await requestService.sendRequest({ method, baseUrl, query });
  } catch (error) {
    storeErrorInfo('getCoinGeneralInfo', error.message);
    res = { Response: 'Error', error};
  }
  return res;
};

module.exports = {
  getCoinGeneralInfo
};