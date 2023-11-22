const requestService = require('../../requestService');
const Query = require('../../utils/queryBuilder');
const baseUrl = 'https://min-api.cryptocompare.com'

async function getAllCoins() {
  const method = 'get';
  const query = new Query()
                .addSubDir('data')
                .addSubDir('all')
                .addSubDir('coinlist')
                .get();
  const res = await requestService.sendRequest({ method, baseUrl, query });
  return res.Data;
};


module.exports = {
  getAllCoins
};