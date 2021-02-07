require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const COMMANDS = require('./util/commands');
const { getStockInfo } = require('./actions/stock');
const { getStockInfoWithAnalysis } = require('./actions/analysis');
const { speculateStock } = require('./actions/speculate');
const { getIPOCalendar } = require('./actions/ipo_calendar');
const { getCryptoInfo } = require('./actions/crypto');
const { log } = require('./util/util');
const { yahooAnalyze } = require('./actions/yahoo_finance_parser');

client.on('ready', () => {
    log('Logged in successfully')
})

client.on('message', msg => {
    if(msg.author.bot || msg.author.id === COMMANDS.STOCKBOT_ID){
        return;
    }

    let returnCallback;
    let message;   

    if(msg.content.includes(COMMANDS.AUTHORIZED_CHAR) && !msg.content.includes('```')){
        message = removeWaste(msg.content);
        if(msg.content.includes(COMMANDS.ANALYSIS)){
            returnCallback = getStockInfoWithAnalysis;
        } else if (msg.content.includes(COMMANDS.SPECULATE)){
            returnCallback = speculateStock;
        } else if (msg.content === COMMANDS.IPO_CALENDAR){
            returnCallback = getIPOCalendar;
        }else {
            returnCallback = getStockInfo;
        }
    } else if(msg.content.includes(COMMANDS.AUTHORIZED_CRYPTO)){
        message = removeWaste(msg.content);
        returnCallback = getCryptoInfo;
    } else if(msg.content.slice(0,2) === '??'){
        message = msg.content.slice(2);
        returnCallback = yahooAnalyze
    }
    if(returnCallback && message){
        returnCallback(message).then(response => msg.reply(response)).catch( err => log(err));
    };

    Object.keys(COMMANDS.REACTABLE_WORDS).forEach( word => {
        if(msg.content.includes(word) || msg.content.includes(word.toLowerCase())){
            if(msg.author.id !== COMMANDS.STOCKBOT_ID){
                let emojis = COMMANDS.REACTABLE_WORDS[word];
                emojis.forEach(emoji => msg.react(emoji))
            }
        }
    })
})

function removeWaste(message){
    message = message.replace(COMMANDS.AUTHORIZED_CHAR, '')
    message = message.replace(COMMANDS.AUTHORIZED_CRYPTO, '')
    message = message.replace(COMMANDS.ANALYSIS, '')
    message = message.replace(COMMANDS.SPECULATE, '')
    message = message.replace(/<\/?[^>]+(>|$)/g, '')
    return message;
}

// client.on('debug', console.log)

client.login(process.env.BOT_TOKEN).catch(console.error);