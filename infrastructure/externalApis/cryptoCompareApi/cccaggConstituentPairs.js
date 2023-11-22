const requestService = require('../../requestService');
const Query = require('../../utils/queryBuilder');
const baseUrl = 'https://min-api.cryptocompare.com'

async function getPairs() {
  const method = 'get';
  const query = new Query()
                .addSubDir('data')
                .addSubDir('v2')
                .addSubDir('cccagg')
                .addSubDir('pairs')
                .get();
  const res = await requestService.sendRequest({ method, baseUrl, query });
  return res.Data.pairs;
};


module.exports = {
    getPairs
};