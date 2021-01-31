require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const Request = require('node-fetch');
const CONSTANTS = require('./commands');

client.on('ready', () => {
    console.log('Logged in successfully')
})


client.on('message', msg => {
    if(msg.content.slice(0,2) === '<@'){
        return;
    }
    if(msg.content.includes(CONSTANTS.AUTHORIZED_CHAR)){
        getStockInfo(msg).then(message => msg.reply(message)).catch(err => console.log(err));
    }
    Object.keys(CONSTANTS.REACTABLE_WORDS).forEach( word => {
        if(msg.content.includes(word) || msg.content.includes(word.toLowerCase())){
            if(msg.author.id !== CONSTANTS.STOCKBOT_ID){
                let emojis = CONSTANTS.REACTABLE_WORDS[word];
                emojis.forEach(emoji => msg.react(emoji))
            }
        }
    })
})

async function getStockInfo(message){
    let idx = message.content.slice(1).indexOf(CONSTANTS.AUTHORIZED_CHAR);
    let stock = message.content.slice(1, idx + 1);
    let stockURL = formatURL(stock);
    let stockData = await grabStockData(stockURL);
    let response = await formatResponse(stockData);
    return await response;
}

// function formatResponse(dataset1, dataset2, stock){
//     if(!dataset1[stock] || !dataset1[stock].values){
//         return 'Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!';
//     } else {
//         let recentData = dataset1[stock].values[0]
//         let currencySymbol = dataset1[stock].meta.currency === 'USD' ? '$' : '€';
//         let compStr = 'Company: ' + stock.toUpperCase();
//         //Add market open price if possible
//         let openValueStr = 'Opening price: ' + currencySymbol + parseFloat(recentData.open).toFixed(2);
//         let curValueStr = 'Current price: ' + currencySymbol + parseFloat(recentData.open).toFixed(2);
//         //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
//         let curVolumeStr = 'Current volume: ' + recentData.volume.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//         let dateRecordedStr = 'Time: ' + new Date().toLocaleString().split(',')[1];
//         let botResponse = [compStr, curValueStr, curVolumeStr, dateRecordedStr].join('\n');
//         return botResponse;
//     }    
// }

function formatResponse(dataset1){
    if(!dataset1){
        return 'Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!';
    } else {
        let currencySymbol = dataset1.currency === 'USD' ? '$' : '€';
        let compStr = 'Company: ' + dataset1.name;
        //Add market open price if possible
        let openValueStr = 'Opening price: ' + currencySymbol + parseFloat(dataset1.open).toFixed(2);
        let curValueStr = 'Current price: ' + currencySymbol + parseFloat(dataset1.close).toFixed(2);

        let curHighStr = "Today's high: " + currencySymbol + parseFloat(dataset1.high).toFixed(2);
        let curLowStr = "Today's low: " + currencySymbol + parseFloat(dataset1.low).toFixed(2);

        //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        
        let curVolumeStr = 'Current volume: ' + dataset1.volume.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        let dateRecordedStr = 'Time: ' + new Date().toLocaleString().split(',')[1];

        let prevCloseStr = "Yesterday's close price: " + currencySymbol + parseFloat(dataset1.previous_close).toFixed(2);
        let yearHighStr = "52 Week High: " + currencySymbol + parseFloat(dataset1.fifty_two_week.high).toFixed(2);
        let yearLowStr = "52 Week High: " + currencySymbol + parseFloat(dataset1.fifty_two_week.low).toFixed(2);



        let botResponse = [compStr, openValueStr, curValueStr, curHighStr, curLowStr, prevCloseStr, curVolumeStr, dateRecordedStr, yearHighStr, yearLowStr].join('\n');
        return botResponse;
    }    
}

// function formatURL1(symbol){
//     // symbol = symbol.replace(/<\/?[^>]+(>|$)/g,'');
//     let stockURL = 'https://api.twelvedata.com/time_series?symbol=' + symbol +',EUR/USD&interval=1min&apikey=' + process.env.TWELVE_DATA_API_KEY;
//     stockURL += '&outputsize=1&format=json';
//     return stockURL;
// }

function formatURL(symbol){
    symbol = symbol.replace(/<\/?[^>]+(>|$)/g,'');
    let stockURL = 'https://api.twelvedata.com/quote?symbol=' + symbol +'&apikey=' + process.env.TWELVE_DATA_API_KEY;
    return stockURL;
}

async function grabStockData(url){
    let newVar = await Request(url).catch(err => console.log(err));
    let secondVar = await newVar.json().catch(err => console.log(err));
    return await secondVar;
}

client.login(process.env.BOT_TOKEN);