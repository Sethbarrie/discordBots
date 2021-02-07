require('dotenv').config();
const Request = require('node-fetch');
const Formatter = require('../util/format_util');
const { getStockInfo } = require('./stock');

module.exports = {
    getStockInfoWithAnalysis: async function getStockInfoWithAnalysis(message){
        let stockURL = formatURL(message);
        let joinTable = await getStockInfo(message);
        let stockData = await grabStockData(stockURL);
        let response = await formatResponse(stockData, joinTable);
        return await response;
    }
}
function formatResponse(stockJSON, firstTable){
    if(!stockJSON || !stockJSON['Symbol']){
        return 'Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!';
    } else {


        let compStr =        stockJSON["Name"];
        let currencySymbol = stockJSON['Currency'] === 'USD' ? '$' : '€';
        //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        let marketCapStr =         currencySymbol + stockJSON['MarketCapitalization'].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let outStandingSharesStr = stockJSON['SharesOutstanding'].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let floatedSharesStr =     stockJSON['SharesFloat'].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let shortedSharesStr =     stockJSON['SharesShort'].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let shortRatio =           stockJSON['ShortRatio']
        let yearHighStr =          currencySymbol + parseFloat(stockJSON['52WeekHigh']).toFixed(2);
        let yearLowStr =           currencySymbol + parseFloat(stockJSON['52WeekLow']).toFixed(2);
        let lastSplitDateStr =     stockJSON['LastSplitDate'];
        let lastCellStr =          (Math.random() > .5 ? 'Buy' : 'Sell');
        
        let botResponse = [
            marketCapStr, 
            outStandingSharesStr, 
            floatedSharesStr, 
            shortedSharesStr, 
            shortRatio, 
            yearHighStr,
            yearLowStr,
            lastSplitDateStr,
            lastCellStr
        ];

        //Adds the prefix to the columns
        const twinColumns = Formatter.addDescriptorsToTable(botResponse, 'analyzeTable');
        //Deconstruct first table to array
        const firstPartOfTable = Formatter.deconstructTable(firstTable);
        //Joins tables together
        const joinedTables = Formatter.joinTables(firstPartOfTable, twinColumns);
        //Adds the header with spacing to the table
        const tableWithHeader = Formatter.addHeaderToTable(compStr, joinedTables);
        //Creates response string from table with header
        const formattedTable = Formatter.addNewLines(tableWithHeader);
        //Adds ` to turn string into code block;
        const responseTable = Formatter.addTicks(formattedTable);

        return responseTable;
    }    
}
function formatURL(symbol){
    let stockURL = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + symbol.toUpperCase() + '&apikey=' + process.env.ALPHA_VANTAGE_API_KEY 

    return stockURL;
}
async function grabStockData(url){
    let newVar = await Request(url).catch(err => console.log(err));
    let secondVar = await newVar.json().catch(err => console.log(err));
    return await secondVar;
}