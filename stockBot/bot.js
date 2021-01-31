require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const CONSTANTS = require('./commands');
const STOCK = require('./stock');
const getStockInfo = STOCK.getStockInfo;
const ANALYSIS = require('./analysis');
const getStockInfoWithAnalysis = ANALYSIS.getStockInfoWithAnalysis;
const SPECULATE = require('./speculate');
const getStockInfoWithSpeculate = SPECULATE.getStockInfoWithSpeculate;

client.on('ready', () => {
    console.log('Logged in successfully')
})

client.on('message', msg => {
    if(msg.author.bot){
        return;
    }

    // if(msg.content.includes(CONSTANTS.AUTHORIZED_CHAR)){
    //     let message = removeWaste(msg.content);
    //     if(msg.content.includes(CONSTANTS.ANALYSIS)){
    //         getStockInfoWithAnalysis(message).then(response => msg.reply(response)).catch(err => console.log(err));
    //     } else if (msg.content.includes(CONSTANTS.SPECULATE)){
    //         getStockInfoWithSpeculate(message).then(response => msg.reply(response)).catch(err => console.log(err));
    //     } else {
    //         getStockInfo(message).then(response => msg.reply(response)).catch(err => console.log(err));
    //     }
    //     // getStockInfo(msg).then(message => channel.send(embedResponse(message))).catch(err => console.log(err))
    // }
    // if(msg.content.includes(CONSTANTS.AUTHORIZED_CRYPTO)){
    //     let message = removeWaste(msg.content);
    //     getCryptoInfo(message).then(response => msg.reply(response)).catch(err => console.log(err))
    // }
    
    let returnCallback;
    let message;   

    if(msg.content.includes(CONSTANTS.AUTHORIZED_CHAR)){
        message = removeWaste(msg.content);
        if(msg.content.includes(CONSTANTS.ANALYSIS)){
            returnCallback = getStockInfoWithAnalysis;
        } else if (msg.content.includes(CONSTANTS.SPECULATE)){
            returnCallback = getStockInfoWithSpeculate;
        } else {
            returnCallback = getStockInfo;
        }
    }

    if(msg.content.includes(CONSTANTS.AUTHORIZED_CRYPTO)){
        message = removeWaste(msg.content);
        returnCallback = getCryptoInfo;
    }

    returnCallback(message).then(response => msg.reply(response)).catch(console.log);

    Object.keys(CONSTANTS.REACTABLE_WORDS).forEach( word => {
        if(msg.content.includes(word) || msg.content.includes(word.toLowerCase())){
            if(msg.author.id !== CONSTANTS.STOCKBOT_ID){
                let emojis = CONSTANTS.REACTABLE_WORDS[word];
                emojis.forEach(emoji => msg.react(emoji))
            }
        }
    })
})

function removeWaste(message){
    message = message.replace(CONSTANTS.AUTHORIZED_CHAR, '')
    message = message.replace(CONSTANTS.ANALYSIS, '')
    message = message.replace(CONSTANTS.SPECULATE, '')
    message = message.replace(/<\/?[^>]+(>|$)/g,'', '')
    return message;
}

client.login(process.env.BOT_TOKEN);