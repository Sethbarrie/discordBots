require('dotenv').config();

module.exports = {
    STOCKBOT_ID: process.env.DISCORD_BOT_ID,
    AUTHORIZED_CHAR: '$',
    AUTHORIZED_CRYPTO: '#',
    IPO_CALENDAR: '$ipo',
    ANALYSIS: '.analyze',
    SPECULATE: '.trend',
    //Super bias incoming
    REACTABLE_WORDS: {
        //Good
        'tsla': ['🚀','🌕'],
        'amc': ['🚀','🍿'],
        'gme': ['💎','🙌'],
        'bb': ['🦍','💰'],
        'nok': ['🦍','🍌'],
        'bbby': ['📈','🌕'],

        //bad
        'aapl': ['🍋'],
        'amzn': ['🤢'],
        'amd': ['🍆','💦'],
        'intc': ['🚫','❄️'],
        'nvda': ['🤡'],

        //bad
        'BTC': ['🔰'],
        'BitUSD': ['👎🏻'],
        'BUSD': ['⚓'],
        'CANN': ['🌿'],
        'DOGE': ['💩'],
        'ETH': ['♿'],
        
        //good
        'SHIBA':['🧑🏻‍🚀'],
        'AKITA': ['🤷‍♂️'],
    }
}

let possibles = [
    '👨‍🚀',
    '👍🏻',
    '🕳️',
    '🐋',
    '✈️',
    '🌌',
    '🏆',
    '🎰',
    '💰',
    '💹',
    '💲',
]