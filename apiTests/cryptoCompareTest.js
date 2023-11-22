const axios = require('axios');
async function get() {
  const res = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist?api_key=09454a2a69e135db4b6dc0534e0d3d87e23addd18eb53806f9cf6b7c4e9644e1');
  console.log(res);
};

get();