const requestService = require('../../requestService');
const Query = require('../../utils/queryBuilder');
const baseUrl = 'https://min-api.cryptocompare.com'

async function getPairsForExchange({ exchange = 'Binance' }) {
  const method = 'get';
  const query = new Query()
                .addSubDir('data')
                .addSubDir('v4')
                .addSubDir('all')
                .addSubDir('exchanges')
                .get();
  const res = await requestService.sendRequest({ method, baseUrl, query });
  return res.Data.exchanges[exchange].pairs;
};


module.exports = {
  getPairsForExchange
};