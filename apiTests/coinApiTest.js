const axios = require('axios');
async function get() {
  const res = await axios({
      method: 'GET',
      url: 'https://rest.coinapi.io/v1/exchanges/binance',
      headers: {'X-CoinAPI-Key': '9CE0A554-28A3-44EA-9832-8B70D393FD3F'}
  });
  console.log(res);
  console.log(res.length);
}

get();