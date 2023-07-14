const fetch = require("node-fetch");

const convertCurrency = async (sourceCurrency, targetCurrency, amount) => {
  try {
    const url = `https://currency-converter219.p.rapidapi.com/converter?source=${sourceCurrency}&target=${targetCurrency}&amount=${amount}`;
    const headers = {
      "X-RapidAPI-Key": node.env.API_KEY,
      "X-RapidAPI-Host": "currency-converter219.p.rapidapi.com",
    };

    const config = {
      method: "GET",
      headers,
      compress: true,
    };
    const resp = await fetch(url, config);
    const data = await resp.json();

    return data.results[0];
  } catch (error) {
    return error;
  }
};

module.exports = convertCurrency;
