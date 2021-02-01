require('dotenv').config();

const Request = require('node-fetch');

module.exports = {
    getStockInfo: async function getStockInfo(message){
        let stockURL = formatURL(message);
        let stockData = await grabStockData(stockURL);
        let response = await formatResponse(stockData);
        return await response;
    }
}
function formatResponse(stockJSON){
    console.log('in the stock.js')
    if(!stockJSON || !stockJSON.symbol){
        return 'Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!';
    } else {
        let currencySymbol = stockJSON.currency === 'USD' ? '$' : '€';
        let compStr = stockJSON.name;
        let openValueStr =    ' Opening price           | ' + currencySymbol + parseFloat(stockJSON.open).toFixed(2);
        let curValueStr =     ' Current price           | ' + currencySymbol + parseFloat(stockJSON.close).toFixed(2);
        let curHighStr =      " Today's high            | " + currencySymbol + parseFloat(stockJSON.high).toFixed(2);
        let curLowStr =       " Today's low             | " + currencySymbol + parseFloat(stockJSON.low).toFixed(2);
            //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        let curVolumeStr =    ' Current volume          | ' + stockJSON.volume.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let dateRecordedStr = ' Time                    |' + new Date().toLocaleString().split(',')[1];
        let prevCloseStr =    " Yesterday's close price | " + currencySymbol + parseFloat(stockJSON.previous_close).toFixed(2);
        let yearHighStr =     " 52 Week High            | " + currencySymbol + parseFloat(stockJSON.fifty_two_week.high).toFixed(2);
        let yearLowStr =      " 52 Week High            | " + currencySymbol + parseFloat(stockJSON.fifty_two_week.low).toFixed(2);

        let botResponse = [
            compStr, 
            openValueStr, 
            curValueStr, 
            curHighStr, 
            curLowStr, 
            prevCloseStr, 
            curVolumeStr, 
            dateRecordedStr, 
            yearHighStr, 
            yearLowStr
        ];

        let maxWhiteSpaces = botResponse.reduce((acc, ele) => {
            if(ele.length > acc){
                return ele.length;
            } else {
                return acc;
            }
        }, 0);

        let spacer = new Array(maxWhiteSpaces).fill('-').join('');

        let compStrLength = maxWhiteSpaces - compStr.length;

        compStr = ( 
            new Array(Math.floor(compStrLength / 2)).fill(' ').join('') + 
            compStr + 
            new Array(Math.floor(compStrLength / 2)).fill(' ').join('') +
            '\n'
        );

        botResponse = botResponse.map(str => {
            let tempStr = str.slice(0);
            while(tempStr.length < maxWhiteSpaces){
                tempStr += ' ';
            }
            return tempStr;
        })

        botResponse[0] = compStr;

        botResponse.splice(1,0,spacer);

        return ('```\n' + botResponse.join('\n') + '\n```');
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








