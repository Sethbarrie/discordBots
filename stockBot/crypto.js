require('dotenv').config();
const Request = require('node-fetch');
const Util = require('./util');

module.exports = {
    getCryptoInfo: async function getCryptoInfo(message){
        let stockURL = formatURL(message);
        let stockData = await grabStockData(stockURL);
        let response = await formatResponse(stockData);
        return await response;
    }
}
function formatResponse(stockJSON){
    console.log('in the crypto.js')
    console.log(stockJSON)
    if(!stockJSON || !stockJSON['2. From_Currency Name']){
        return 'Sorry I couldn\'t find that coin! I\'m sure it\'s there though. Sorry!';
    } else {
        let cryptoStr = 'Crypto: ' + stockJSON['2. From_Currency Name'];

        let exchangeRateStr = 'Exchange Rate: $' + Util.formatNumber(stockJSON['5. Exchange Rate']);
        let bidPriceStr = 'Bid Price: $' + Util.formatNumber(stockJSON["8. Bid Price"]);
        let askPriceStr = 'Ask Price: $' + Util.formatNumber(stockJSON["9. Ask Price"]);


        let dateRecordedStr = 'Time: ' + new Date().toLocaleString();

        let botResponse = [
            cryptoStr,
            exchangeRateStr,
            bidPriceStr,
            askPriceStr,
            dateRecordedStr
        ].join('\n');
        
        return botResponse;
    }    
}
function formatURL(symbol){
    let stockURL = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + symbol.toUpperCase() + '&to_currency=USD&apikey=' + process.env.ALPHA_VANTAGE_API_KEY.toString();

    return stockURL;
}
async function grabStockData(url){
    let newVar = await Request(url).catch(err => console.log(err));
    let secondVar = await newVar.json().catch(err => console.log(err));
    return await secondVar['Realtime Currency Exchange Rate'];
}