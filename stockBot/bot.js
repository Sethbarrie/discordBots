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
    // CONSTANTS.REACTABLE_WORDS.forEach( obj => {
    //     if(msg.content.includes(obj.word) || msg.content.includes(obj.word.toLowerCase())){
    //         if(msg.author.id !== CONSTANTS.STOCKBOT_ID){
    //             msg.react(obj.emoji);
    //         }
    //     }
    // })

})

async function getStockInfo(message){
    let idx = message.content.slice(1).indexOf(CONSTANTS.AUTHORIZED_CHAR);
    let stock = message.content.slice(1, idx + 1);
    let stockURL = formatURL(stock);
    let stockData = await grabStockData(stockURL);
    let response = await formatResponse(stockData, stock);
    return await response;
}

function formatResponse(message, stock){
    if(!message[stock] || !message[stock].values){
        return 'Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!';
    } else {
        let recentData = message[stock].values[0]
        let currencySymbol = message[stock].meta.currency === 'USD' ? '$' : '€';
        let compStr = 'Company: ' + stock.toUpperCase();
        let curValueStr = 'Stock price: ' + currencySymbol + parseFloat(recentData.open).toFixed(2);
        //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        let curVolumeStr = 'Current volume: ' + recentData.volume.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        let dateRecordedStr = 'Time: ' + new Date().toLocaleString().split(',')[1];
        let botResponse = [compStr, curValueStr, curVolumeStr, dateRecordedStr].join('\n');
        return botResponse;
    }    
}

function formatURL(symbol){
    symbol = symbol.replace(/<\/?[^>]+(>|$)/g,'');
    let stockURL = 'https://api.twelvedata.com/time_series?symbol=' + symbol +',EUR/USD&interval=1min&apikey=' + process.env.TWELVE_DATA_API_KEY;
    stockURL += '&outputsize=1&format=json';
    return stockURL;
}

async function grabStockData(url){
    let newVar = await Request(url).catch(err => console.log(err));
    let secondVar = await newVar.json().catch(err => console.log(err));
    return await secondVar;
}

client.login(process.env.BOT_TOKEN);