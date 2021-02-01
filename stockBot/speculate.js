// // https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method
// const Request = require('node-fetch');
// require('dotenv').config();

// module.exports = {
//     speculateStock: function speculateStock(stock){
//         let cmo, crsi, dpo, ichimoku, macd, obv, pb, rsi, pvar;

//         Promise.all([
//             Request('https://api.twelvedata.com/var?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY),
//             Request('https://api.twelvedata.com/stddev?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY),
//             Request('https://api.twelvedata.com/percent_b?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY),
//             Request('https://api.twelvedata.com/obv?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY),
//             Request('https://api.twelvedata.com/macd?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY),
//             Request('https://api.twelvedata.com/ichimoku?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY),
//             Request('https://api.twelvedata.com/dpo?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY),
//             Request('https://api.twelvedata.com/crsi?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY),
//             Request('https://api.twelvedata.com/cmo?symbol=' + stock +'&interval=1min&outputsize=1&apikey=' + process.env.TWELVE_DATA_API_KEY)
        
//         ]).then(function (responses) {
//             return Promise.all(responses.map(function (response) {
//                 return response.json();
//             }));
//         }).then(function (data) {
//             // console.table(data);
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }
// }


