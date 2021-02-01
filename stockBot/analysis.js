require('dotenv').config();
const Request = require('node-fetch');
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
function formatResponse(stockJSON, joinTable){
    if(!stockJSON || !stockJSON['Symbol']){
        return 'Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!';
    } else {

        joinTable = joinTable.slice(6, -4).split('\n');

        let currencySymbol = stockJSON['Currency'] === 'USD' ? '$' : '€';
        //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        let marketCapStr =         ' | Market Cap             | ' + currencySymbol + stockJSON['MarketCapitalization'].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let outStandingSharesStr = ' | Outstanding shares     | ' + stockJSON['SharesOutstanding'].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let floatedSharesStr =     ' | Floated shares         | ' + stockJSON['SharesFloat'].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let shortedSharesStr =     ' | Shorted shares         | ' + stockJSON['SharesShort'].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let shortRatio =           ' | Shorted ratio          | ' + stockJSON['ShortRatio']
        let yearHighStr =          " | 52 Week High           | " + currencySymbol + parseFloat(stockJSON['52WeekHigh']).toFixed(2);
        let yearLowStr =           " | 52 Week High           | " + currencySymbol + parseFloat(stockJSON['52WeekLow']).toFixed(2);
        let lastSplitDateStr =     ' | Last Split Date        | ' + stockJSON['LastSplitDate'];
        let lastCellStr =          ' | Not an Advisor Opinion | ' + (Math.random() > .5 ? 'Buy' : 'Sell');
        
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
        
        let maxWhiteSpaces = botResponse.reduce((acc, ele) => ele.length > acc ? ele.length : acc, 0);
        
        header = new Array(maxWhiteSpaces).fill(' ').join('')
        let spacer = new Array(maxWhiteSpaces).fill('-').join('');
        
        botResponse.splice(0,0,spacer);
        botResponse.splice(0,0,'');
        botResponse.splice(0,0,header);

        let bigTable = [...new Array(12).keys()].map(idx => {
            if(!idx){
                return joinTable[idx];
            } else {
                return  joinTable[idx] + botResponse[idx];
            }
        })
        
        return ( '```\n' + bigTable.join('\n') + '\n```');
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