require('dotenv').config();

const Request = require('node-fetch');
const Formatter = require('../util/format_util');

module.exports = {
    getStockInfo: async function getStockInfo(message){
        let stockURL = formatURL(message);
        let stockData = await grabStockData(stockURL);
        let response = await formatResponse(stockData);
        return await response;
    }
}
function formatResponse(stockJSON){
    if(!stockJSON || !stockJSON.symbol){
        return 'Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!';
    } else {
        let currencySymbol = stockJSON.currency === 'USD' ? '$' : '€';
        let compStr = stockJSON.name;
        let openValueStr =     currencySymbol + parseFloat(stockJSON.open).toFixed(2);
        let curValueStr =      currencySymbol + parseFloat(stockJSON.close).toFixed(2);
        let curHighStr =       currencySymbol + parseFloat(stockJSON.high).toFixed(2);
        let curLowStr =        currencySymbol + parseFloat(stockJSON.low).toFixed(2);
            //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        let curVolumeStr =     stockJSON.volume.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let dateRecordedStr =  new Date().toLocaleString().split(',')[1].toString();
        let prevCloseStr =     currencySymbol + parseFloat(stockJSON.previous_close).toFixed(2);
        let yearHighStr =      currencySymbol + parseFloat(stockJSON.fifty_two_week.high).toFixed(2);
        let yearLowStr =       currencySymbol + parseFloat(stockJSON.fifty_two_week.low).toFixed(2);

        let botResponse = [
            openValueStr, 
            curValueStr, 
            curHighStr, 
            curLowStr, 
            curVolumeStr, 
            dateRecordedStr, 
            prevCloseStr, 
            yearHighStr, 
            yearLowStr
        ];
        //Adds the prefix to the columns
        const twinColumns = Formatter.addDescriptorsToTable(botResponse, 'stockTable');
        //Adds the header with spacing to the table
        const tableWithHeader = Formatter.addHeaderToTable(compStr, twinColumns);
        //Creates response string from table with header
        const formattedTable = Formatter.addNewLines(tableWithHeader);
        //Adds ` to turn string into code block;
        const responseTable = Formatter.addTicks(formattedTable);

        return responseTable;
    }    
}
function formatURL(symbol){
    let stockURL = 'https://api.twelvedata.com/quote?symbol=' + symbol +'&apikey=' + process.env.TWELVE_DATA_API_KEY;
    return stockURL;
}
async function grabStockData(url){
    let newVar = await Request(url).catch(err => console.log(err));
    let secondVar = await newVar.json().catch(err => console.log(err));
    return await secondVar;
}








