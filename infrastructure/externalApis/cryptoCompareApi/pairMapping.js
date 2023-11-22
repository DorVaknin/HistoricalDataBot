const requestService = require('../../requestService');
const Query = require('../../utils/queryBuilder');
const baseUrl = 'https://min-api.cryptocompare.com'
const { has } = require('lodash');
const { storeErrorInfo } = require('../../errorManager');
const stableCoins = require('../../utils/consts/stableCoins');
async function getCoinTsym(coinSymbol, exchange) {
  let res;
  const method = 'get';
  const query = new Query()
                .addSubDir('data')
                .addSubDir('v2')
                .addSubDir('pair')
                .addSubDir('mapping')
                .addSubDir('fsym')
                .addQuery('fsym', coinSymbol)
                .get();
  try {
    res = await requestService.sendRequest({ method, baseUrl, query });
  } catch (error) {
    storeErrorInfo('getCoinTsym', error.message);
    res = { Response: 'Error', error};
  }
  
  const legitPairing = has(res, 'Data.current[0].tsym')  ? res.Data.current.find(x => stableCoins.includes(x.tsym) && x?.exchange === exchange) : false;
  if(legitPairing) {
    return legitPairing.tsym;
  } else {
    throw new Error('no pairing was found');
  }
};

module.exports = {
    getCoinTsym
};