require('dotenv').config();
const Request = require('node-fetch');
const Util = require('../util/util');
const Format = require('../util/format_util');

module.exports = {
    getCryptoInfo: async function getCryptoInfo(message){
        let stockURL = formatURL(message);
        let stockData = await grabStockData(stockURL);
        let response = await formatResponse(stockData);
        return await response;
    }
}
function formatResponse(stockJSON){
    if(!stockJSON || !stockJSON['2. From_Currency Name']){
        return 'Sorry I couldn\'t find that coin! I\'m sure it\'s there though. Sorry!';
    } else {
        let cryptoStr = stockJSON['2. From_Currency Name'];
        let exchangeRateStr = Util.formatNumber(stockJSON['5. Exchange Rate']);
        let bidPriceStr = Util.formatNumber(stockJSON["8. Bid Price"]);
        let askPriceStr = Util.formatNumber(stockJSON["9. Ask Price"]);
        let dateRecordedStr = new Date().toLocaleString();
        
        let botResponse = [
            exchangeRateStr,
            bidPriceStr,
            askPriceStr,
            dateRecordedStr
        ];
        
        let cryptoTable = Format.addDescriptorsToTable(botResponse, 'cryptoTable');
        let cryptoTableWithHeader = Format.addHeaderToTable(cryptoStr, cryptoTable);
        let joinedCryptoTable = Format.addNewLines(cryptoTableWithHeader);
        let responseCryptoTable = Format.addTicks(joinedCryptoTable);
        return responseCryptoTable;
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