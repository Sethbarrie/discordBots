require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const COMMANDS = require('./commands');
const { getStockInfo } = require('./stock');
const { getStockInfoWithAnalysis } = require('./analysis');
const { getStockInfoWithSpeculate } = require('./speculate');
const { getIPOCalendar } = require('./ipo_calendar');
const { getCryptoInfo } = require('./crypto');

client.on('ready', () => {
    console.log('Logged in successfully')
})

client.on('message', msg => {
    if(msg.author.bot){
        return;
    }

    let returnCallback;
    let message;   

    if(msg.content.includes(COMMANDS.AUTHORIZED_CHAR)){
        message = removeWaste(msg.content);
        if(msg.content.includes(COMMANDS.ANALYSIS)){
            returnCallback = getStockInfoWithAnalysis;
        } else if (msg.content.includes(COMMANDS.SPECULATE)){
            returnCallback = getStockInfoWithSpeculate;
        } else if (msg.content === COMMANDS.IPO_CALENDAR){
            returnCallback = getIPOCalendar;
        }else {
            returnCallback = getStockInfo;
        }
    } else if(msg.content.includes(COMMANDS.AUTHORIZED_CRYPTO)){
        message = removeWaste(msg.content);
        returnCallback = getCryptoInfo;
    }
    if(returnCallback && message){
        returnCallback(message).then(response => msg.reply(response)).catch(console.log);
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

client.login(process.env.BOT_TOKEN);