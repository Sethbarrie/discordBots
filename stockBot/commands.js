require('dotenv').config();

module.exports = {
    STOCKBOT_ID: process.env.DISCORD_BOT_ID,
    AUTHORIZED_CHAR: '$',
    AUTHORIZED_CRYPTO: '#',
    ANALYSIS: '.analyze',
    SPECULATE: '.trend',
    REACTABLE_WORDS: {
        'tsla': ['🚀','🌕'],
        'amc': ['🚀','🍿'],
        'gme': ['💎','🙌'],
        'bb': ['🦍','💰'],
        'nok': ['🦍','🍌'],
        'bbby': ['📈','🌕'],
        'aapl': ['🍋'],
        'amzn': ['🤢'],
        'amd': ['🍆','💦'],
        'intc': ['🚫','❄️'],
        'nvda': ['🤡']
    }
}