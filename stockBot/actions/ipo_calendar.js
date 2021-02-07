require('dotenv').config();
const Request = require('node-fetch');
const Util = require('../util/util');
const Formatter = require('../util/format_util');
const stockURL = 'https://www.alphavantage.co/query?function=IPO_CALENDAR&apikey=' + process.env.ALPHA_VANTAGE_API_KEY.toString();

module.exports = {
    getIPOCalendar: async function getIPOCalendar(){
        return await grabStockData().then( message => formatResponse(message)).catch(err => console.log(err));
    }
}

function formatResponse(ipoArray){
    if(!ipoArray || !ipoArray.length){
        return "The calendar didn't come in! Looks like you'll have to plan without me.";
    } else {
        ipoArray.pop();
        ipoArray[0][3] = 'Low Price';
        ipoArray[0][4] = 'High Price';

        let spacedCalendar = Formatter.addDescriptorsToCalendar(ipoArray);

        let formattedCalendar = Formatter.addNewLines(spacedCalendar);

        let responseCalendar = Formatter.addTicks(formattedCalendar);
        
        return responseCalendar;
    }
}

function grabStockData(){
    return Request(stockURL).then( res => res.text()).then(body => Util.csvToArray(body))
}