require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const Request = require('node-fetch');

client.on('ready', () => {
    console.log('Logged in successfully')
})

client.on('message', msg => {
    //This is how to call for stocks. It looks for the $, if it finds it, then it checks 
    //the API for the company symbol. If it has it, woo party
    if(msg.content.includes('$')){
        let stock = msg.content.slice(1);

        //Simple regex to remove any dangerous characters lol
        stock = stock.replace(/<\/?[^>]+(>|$)/g,'');

        //URL to call to. Fun fact, if the link is built, you can click on it to see the data in the browser.
        let stockURL = 'https://api.twelvedata.com/time_series?symbol=' + stock +',EUR/USD&interval=1min&apikey=' + process.env.TWELVE_DATA_API_KEY;

        //This helps keep the API calls down, since it defaults to 30
        stockURL += '&outputsize=1';

        Request(stockURL).then(promiseHeader => {

            promiseHeader.json().then( res => {
                //res comes back with no response, or it finds the company but doesn't have any data on them
                if(!res[stock] || !res[stock].values){
                    msg.reply('Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!')
                } else {
                    //This gives you access to the numbers of the company
                    let recentData = res[stock].values[0]
                    
                    //This is found in the metadata, simple bool for currency
                    let currencySymbol = res[stock].meta.currency === 'USD' ? '$' : '€';
    
                    
                    //Formatting and parsing data to make it pretty
                    let compStr = 'Company: ' + stock.toUpperCase();
                    //The parseFloat is there because toFixed doesn't work on strings, and for some reason
                    //When you parse the data from this, it comes in as a string, not a number.
                    let curValueStr = 'Stock price: ' + currencySymbol + parseFloat(recentData.open).toFixed(2);

                    //This crazy piece of code comes from StackOverflow
                    //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
                    let curVolumeStr = 'Current volume: ' + recentData.volume.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

                    //Grabs date from browser. Incoming data also has it but this is easier, however
                    //It gives it the current time rather than the requested time. Shouldn't be a big deal
                    let dateRecordedStr = 'Time: ' + new Date().toLocaleString().split(',')[1];
    
                    //Formatting so it isn't a big chunk and has new lines woo
                    let botResponse = [compStr, curValueStr, curVolumeStr, dateRecordedStr].join('\n');
    
                    msg.reply(botResponse);
                }
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
})

client.on('message', msg => {
    if(msg.content.includes('$')){
        if(msg.content.toDowncase().includes('tsla')){
            msg.reply()
        }
    }
})



client.login(process.env.BOT_TOKEN);