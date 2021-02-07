// require('dotenv').config();
// const Request = require('node-fetch');
// const Util = require('./util');
// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const PDFDocument = require('pdfkit');

// let queryString = "https://finance.yahoo.com/quote/";
// let JSONSuffix = '&format=json';

// let conjunctions = [
//     "?p=",
//     "key-statistics?p=",
//     "history?p=",
//     "profile?p=",
//     "financials?p=",
//     "analysis?p=",
//     "holders?p="
// ]


// module.exports = {
//     yahooAnalyze: async function yahooAnalyze(stock){
//         return Promise.all(conjunctions.map((joiner, idx) => {
//             if(!idx){
//                 console.log(queryString + stock + joiner + stock + JSONSuffix);
//                 return Request(queryString + stock + joiner + stock + JSONSuffix);
//             } else {
//                 console.log(queryString + stock.toUpperCase() + '/' + joiner + stock.toUpperCase() + JSONSuffix);
//                 return Request(queryString + stock.toUpperCase() + '/' + joiner + stock.toUpperCase() + JSONSuffix);
//             }
//         })).then(function (responses) {
//             return Promise.all(responses.map(function (response) {
//                 return response.json();
//             }));
//         }).then(function (data) {
//             // console.log(data)
//             let bigDataObj = {
//                 stockPrice: '50', 
//                 priceDifference: ['51', 2],
//                 afterHoursPrice: ['55', 2],
//                 afterHoursPriceDifference: ['58', 1], 
//                 yesterdayClose: '98', 
//                 marketOpen: '103',
//                 todayLowHigh: '115',
//                 yearLowHigh: '119',
//                 currentVolume: '124',
//                 averageVolume: '129',
//                 marketCap: '137',
//                 oneYearPriceEstimate: '172',

//                 profitMargin: '115',
//                 revenue: '123',
//                 revenuePerShare: '125',
//                 grossProfit: '129',
//                 totalCash: '139',
//                 totalDebt: '143',
//                 fiftyDayMovingAverage: '65',
//                 twoHundredDayMovingAverage: '67',
//                 sharesOutstanding: '73',
//                 floatNum: '75',
//                 sharesHeldByInsiders: '77',
//                 sharesHeldByInstitutions: '79',
//                 sharesShort: '81',
//                 shortRatio: '83',
//                 shortPercentOfFloat: '85',
//                 shortPercentOfSharesOutstanding: '87',
//                 lastSplitDate: '109',
//                 lastSplitFactor: '107',

//                 completeStockHistory: [],

//                 contactInfo: 0,
//                 sectorData: 1,
//                 companyDescription: 2,
//                 corporateGovernance: 3,
//                 executiveList: []

//             }

            
//             data.forEach((markUpData, idx) => {
//                 const dom = new JSDOM(markUpData.markup);
//                 let document = dom.window.document;
//                 switch(idx){
//                     case 0:
//                         Object.keys(bigDataObj).slice(0,12).forEach(objKey => {
//                             let tempVar = bigDataObj[objKey];
//                             let tempIDX0;
//                             if(typeof tempVar === 'string'){
//                                 tempIDX0 = 0;
//                             } else {
//                                 tempIDX0 = tempVar.pop();
//                                 tempVar = tempVar.pop();
//                             }
//                             let tempStr = `[data-reactid="${tempVar}"]`;
//                             bigDataObj[objKey] = document.querySelectorAll(tempStr)[tempIDX0]?.textContent;
//                         })
//                         break;
//                     case 1:
//                         Object.keys(bigDataObj).slice(12,30).forEach( objKey => {
//                             let tempIDX1 = bigDataObj[objKey];
//                             bigDataObj[objKey] = document.querySelectorAll('#Col1-0-KeyStatistics-Proxy td')[tempIDX1].textContent;
//                         })
//                         break;
//                     case 2:
//                         // let stockURL = document.querySelectorAll('#Col1-1-HistoricalDataTable-Proxy a')[0].href;
//                         // Request(stockURL).then( res => res.text()).then(body => bigDataObj.completeStockHistory = Util.csvToArray(body)).catch(console.error);
//                         // console.log(bigDataObj)
//                         break;
//                     case 3:
//                         Object.keys(bigDataObj).slice(31,35).forEach( (objKey, idx) => {
//                             bigDataObj[objKey] = document.querySelectorAll('#Col1-0-Profile-Proxy p')[idx].textContent;
//                         })
//                         let executiveNodes = Array.from(document.querySelectorAll('#Col1-0-Profile-Proxy > section > section tr'));
//                         executiveList = executiveNodes.map( node => {
//                             return Array.from(node.children).map( childNode => childNode.textContent)
//                         });
//                         console.log(bigDataObj)
//                         break;
//                     case 4:
//                         break;
//                     case 5:
//                         break;
//                     case 6:
//                         break;
//                     case 7:
//                         break;
//                     default:
//                         break;
//                 }
//             })
//             return 'Hope this worked';
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }
// }





// // const Request = require('node-fetch');
// // require('dotenv').config();
// // const jsdom = require('jsdom');
// // const { JSDOM } = jsdom;

// // let queryString = "https://finance.yahoo.com/quote/";
// // let JSONSuffix = '&format=json';

// // let smallSummaryConjunction = "?p=";
// // let smallStatisticsConjunction = "key-statistics?p=";
// // let smallHistoryConjunction = "history?p=";
// // let smallProfileConjunction = "profile?p=";
// // let smallFinancialsConjunction = "financials?p=";
// // let smallAnalysisConjunction = "analysis?p=";
// // let smallHoldersConjunction = "holders?p=";

// // let conjunctions = [
// //     "?p=",
// //     "key-statistics?p=",
// //     "history?p=",
// //     "profile?p=",
// //     "financials?p=",
// //     "analysis?p=",
// //     "holders?p="
// // ]


// // module.exports = {
// //     yahooAnalyze: async function yahooAnalyze(stock){
// //         // let cmo, crsi, dpo, ichimoku, macd, obv, pb, rsi, pvar;

// //         return Promise.all([
// //             Request(queryString + stock + smallSummaryConjunction + stock + JSONSuffix),
// //             Request(queryString + stock + smallStatisticsConjunction + stock + JSONSuffix),
// //             Request(queryString + stock + smallHistoryConjunction + stock + JSONSuffix),
// //             Request(queryString + stock + smallProfileConjunction + stock + JSONSuffix),
// //             Request(queryString + stock + smallFinancialsConjunction + stock + JSONSuffix),
// //             Request(queryString + stock + smallAnalysisConjunction + stock + JSONSuffix),
// //             Request(queryString + stock + smallHoldersConjunction + stock + JSONSuffix)
// //         ]).then(function (responses) {
// //             return Promise.all(responses.map(function (response) {
// //                 return response.json();
// //             }));
// //         }).then(function (data) {

// //             let 
// //                 stockPrice, 
// //                 priceDifference, 
// //                 yesterdayClose, 
// //                 marketOpen, 
// //                 todayLowHigh, 
// //                 yearLowHigh, 
// //                 currentVolume, 
// //                 averageVolume,
// //                 marketCap,
// //                 oneYearPriceEstimate,
// //                 profitMargin,
// //                 revenue,
// //                 revenuePerShare,
// //                 grossProfit,
// //                 totalCash,
// //                 totalDebt,
// //                 fiftyDayMovingAverage,
// //                 twoHundredDayMovingAverage,
// //                 sharesOutstanding,
// //                 floatNum,
// //                 sharesHeldByInsiders,
// //                 sharesHeldByInstitutions,
// //                 sharesShort,
// //                 shortRatio,
// //                 shortPercentOfFloat,
// //                 shortPercentOfSharesOutstanding,
// //                 lastSplitDate,
// //                 lastSplitFactor,
// //                 contactInfo,
// //                 sectorData,
// //                 companyDescription,
// //                 corporateGovernance,
// //                 executiveList;

// //             data.forEach((markUpData, idx) => {
// //                 let document = markUpData.markup.window.document;
// //                 switch(idx){
// //                     case 0:
// //                         stockPrice = document.querySelectorAll('[data-reactid="50"]')[0].textContent;
// //                         priceDifference = document.querySelectorAll('[data-reactid="51"]')[2].textContent;
// //                         yesterdayClose = document.querySelectorAll('[data-reactid="98"]')[0].textContent;
// //                         marketOpen = document.querySelectorAll('[data-reactid="103"]')[0].textContent;
// //                         todayLowHigh = document.querySelectorAll('[data-reactid="117"]')[0].textContent;
// //                         yearLowHigh = document.querySelectorAll('[data-reactid="121"]')[0].textContent;
// //                         currentVolume = document.querySelectorAll('[data-reactid="126"]')[0].textContent;
// //                         averageVolume = document.querySelectorAll('[data-reactid="131"]')[0].textContent;
// //                         marketCap = document.querySelectorAll('[data-reactid="139"]')[0].textContent;
// //                         oneYearPriceEstimate = document.querySelectorAll('[data-reactid="174"]')[0].textContent;
// //                         break;
// //                     case 1:
// //                         profitMargin = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[115].textContent;
// //                         revenue = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[123].textContent;
// //                         revenuePerShare = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[125].textContent;
// //                         grossProfit = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[129].textContent;
// //                         totalCash = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[139].textContent;
// //                         totalDebt = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[143].textContent;
// //                         fiftyDayMovingAverage = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[65].textContent;
// //                         twoHundredDayMovingAverage = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[67].textContent;
// //                         sharesOutstanding = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[73].textContent;
// //                         floatNum = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[75].textContent;
// //                         sharesHeldByInsiders = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[77].textContent;
// //                         sharesHeldByInstitutions = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[79].textContent;
// //                         sharesShort = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[81].textContent;
// //                         shortRatio = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[83].textContent;
// //                         shortPercentOfFloat = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[85].textContent;
// //                         shortPercentOfSharesOutstanding = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[87].textContent;
// //                         lastSplitDate = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[109].textContent;
// //                         lastSplitFactor = document.querySelectorAll('Col1-0-KeyStatistics-Proxy td')[107].textContent;
// //                         break;
// //                     case 2:
// //                         let url = document.querySelectorAll('#Col1-1-HistoricalDataTable-Proxy a')[0].href;
// //                         //Url downloads a csv file with stock data, use function to format into table
// //                         //Except this is a lot of data and can't all get returned in one message on discord
// //                         break;
// //                     case 3:
// //                         contactInfo = document.querySelectorAll('#Col1-0-Profile-Proxy p')[0].textContent;
// //                         sectorData = document.querySelectorAll('#Col1-0-Profile-Proxy p')[1].textContent;
// //                         companyDescription = document.querySelectorAll('#Col1-0-Profile-Proxy p')[2].textContent;
// //                         corporateGovernance = document.querySelectorAll('#Col1-0-Profile-Proxy p')[3].textContent;
// //                         let executiveNodes = Array.from(document.querySelectorAll('#Col1-0-Profile-Proxy > section > section tr'));

// //                         executiveList = executiveNodes.map( node => {
// //                             return Array.from(node.children).map( childNode => childNode.textContent)
// //                         });
// //                         break;
// //                     case 4:
// //                         break;
// //                     case 5:

// //                     case 6:

// //                     case 7:

// //                     default:
// //                         break;
// //                 }
// //             })

// //             // const dom = new JSDOM(data[0].markup);

// //             // console.log(dom.window.document.querySelectorAll('[data-reactid="50"]')[0].textContent)


// //             // console.log(stockprice, difference, yesterdayClose, open, todayLowHigh, yearLowHigh, volume, averageVolume, marketCap, oneYearPriceEstimate);
// //             return 'Hope this worked';
// //         }).catch(function (error) {
// //             console.log(error);
// //         });
// //     }
// // }




require('dotenv').config();

const Request = require('node-fetch');
let stockURLFront = "https://query1.finance.yahoo.com/v8/finance/chart/";
let stockURLBack = "?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance";
let trendingURL = "https://query1.finance.yahoo.com/v1/finance/trending/US?count=5";//Doesn't need symbol
let stockHistoryURLFront = "https://query1.finance.yahoo.com/v7/finance/download/"
let stockHistoryURLBack = "?period1=$$$&period2=@@@&interval=1d&events=history&includeAdjustedClose=true"
let financialsURLFront = "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/";
let financialsURLBack = "?lang=en-US&region=US&symbol=GME&padTimeSeries=true&type=annualTaxEffectOfUnusualItems,trailingTaxEffectOfUnusualItems,annualTaxRateForCalcs,trailingTaxRateForCalcs,annualNormalizedEBITDA,trailingNormalizedEBITDA,annualNormalizedDilutedEPS,trailingNormalizedDilutedEPS,annualNormalizedBasicEPS,trailingNormalizedBasicEPS,annualTotalUnusualItems,trailingTotalUnusualItems,annualTotalUnusualItemsExcludingGoodwill,trailingTotalUnusualItemsExcludingGoodwill,annualNetIncomeFromContinuingOperationNetMinorityInterest,trailingNetIncomeFromContinuingOperationNetMinorityInterest,annualReconciledDepreciation,trailingReconciledDepreciation,annualReconciledCostOfRevenue,trailingReconciledCostOfRevenue,annualEBITDA,trailingEBITDA,annualEBIT,trailingEBIT,annualNetInterestIncome,trailingNetInterestIncome,annualInterestExpense,trailingInterestExpense,annualInterestIncome,trailingInterestIncome,annualContinuingAndDiscontinuedDilutedEPS,trailingContinuingAndDiscontinuedDilutedEPS,annualContinuingAndDiscontinuedBasicEPS,trailingContinuingAndDiscontinuedBasicEPS,annualNormalizedIncome,trailingNormalizedIncome,annualNetIncomeFromContinuingAndDiscontinuedOperation,trailingNetIncomeFromContinuingAndDiscontinuedOperation,annualTotalExpenses,trailingTotalExpenses,annualRentExpenseSupplemental,trailingRentExpenseSupplemental,annualReportedNormalizedDilutedEPS,trailingReportedNormalizedDilutedEPS,annualReportedNormalizedBasicEPS,trailingReportedNormalizedBasicEPS,annualTotalOperatingIncomeAsReported,trailingTotalOperatingIncomeAsReported,annualDividendPerShare,trailingDividendPerShare,annualDilutedAverageShares,trailingDilutedAverageShares,annualBasicAverageShares,trailingBasicAverageShares,annualDilutedEPS,trailingDilutedEPS,annualDilutedEPSOtherGainsLosses,trailingDilutedEPSOtherGainsLosses,annualTaxLossCarryforwardDilutedEPS,trailingTaxLossCarryforwardDilutedEPS,annualDilutedAccountingChange,trailingDilutedAccountingChange,annualDilutedExtraordinary,trailingDilutedExtraordinary,annualDilutedDiscontinuousOperations,trailingDilutedDiscontinuousOperations,annualDilutedContinuousOperations,trailingDilutedContinuousOperations,annualBasicEPS,trailingBasicEPS,annualBasicEPSOtherGainsLosses,trailingBasicEPSOtherGainsLosses,annualTaxLossCarryforwardBasicEPS,trailingTaxLossCarryforwardBasicEPS,annualBasicAccountingChange,trailingBasicAccountingChange,annualBasicExtraordinary,trailingBasicExtraordinary,annualBasicDiscontinuousOperations,trailingBasicDiscontinuousOperations,annualBasicContinuousOperations,trailingBasicContinuousOperations,annualDilutedNIAvailtoComStockholders,trailingDilutedNIAvailtoComStockholders,annualAverageDilutionEarnings,trailingAverageDilutionEarnings,annualNetIncomeCommonStockholders,trailingNetIncomeCommonStockholders,annualOtherunderPreferredStockDividend,trailingOtherunderPreferredStockDividend,annualPreferredStockDividends,trailingPreferredStockDividends,annualNetIncome,trailingNetIncome,annualMinorityInterests,trailingMinorityInterests,annualNetIncomeIncludingNoncontrollingInterests,trailingNetIncomeIncludingNoncontrollingInterests,annualNetIncomeFromTaxLossCarryforward,trailingNetIncomeFromTaxLossCarryforward,annualNetIncomeExtraordinary,trailingNetIncomeExtraordinary,annualNetIncomeDiscontinuousOperations,trailingNetIncomeDiscontinuousOperations,annualNetIncomeContinuousOperations,trailingNetIncomeContinuousOperations,annualEarningsFromEquityInterestNetOfTax,trailingEarningsFromEquityInterestNetOfTax,annualTaxProvision,trailingTaxProvision,annualPretaxIncome,trailingPretaxIncome,annualOtherIncomeExpense,trailingOtherIncomeExpense,annualOtherNonOperatingIncomeExpenses,trailingOtherNonOperatingIncomeExpenses,annualSpecialIncomeCharges,trailingSpecialIncomeCharges,annualGainOnSaleOfPPE,trailingGainOnSaleOfPPE,annualGainOnSaleOfBusiness,trailingGainOnSaleOfBusiness,annualOtherSpecialCharges,trailingOtherSpecialCharges,annualWriteOff,trailingWriteOff,annualImpairmentOfCapitalAssets,trailingImpairmentOfCapitalAssets,annualRestructuringAndMergernAcquisition,trailingRestructuringAndMergernAcquisition,annualSecuritiesAmortization,trailingSecuritiesAmortization,annualEarningsFromEquityInterest,trailingEarningsFromEquityInterest,annualGainOnSaleOfSecurity,trailingGainOnSaleOfSecurity,annualNetNonOperatingInterestIncomeExpense,trailingNetNonOperatingInterestIncomeExpense,annualTotalOtherFinanceCost,trailingTotalOtherFinanceCost,annualInterestExpenseNonOperating,trailingInterestExpenseNonOperating,annualInterestIncomeNonOperating,trailingInterestIncomeNonOperating,annualOperatingIncome,trailingOperatingIncome,annualOperatingExpense,trailingOperatingExpense,annualOtherOperatingExpenses,trailingOtherOperatingExpenses,annualOtherTaxes,trailingOtherTaxes,annualProvisionForDoubtfulAccounts,trailingProvisionForDoubtfulAccounts,annualDepreciationAmortizationDepletionIncomeStatement,trailingDepreciationAmortizationDepletionIncomeStatement,annualDepletionIncomeStatement,trailingDepletionIncomeStatement,annualDepreciationAndAmortizationInIncomeStatement,trailingDepreciationAndAmortizationInIncomeStatement,annualAmortization,trailingAmortization,annualAmortizationOfIntangiblesIncomeStatement,trailingAmortizationOfIntangiblesIncomeStatement,annualDepreciationIncomeStatement,trailingDepreciationIncomeStatement,annualResearchAndDevelopment,trailingResearchAndDevelopment,annualSellingGeneralAndAdministration,trailingSellingGeneralAndAdministration,annualSellingAndMarketingExpense,trailingSellingAndMarketingExpense,annualGeneralAndAdministrativeExpense,trailingGeneralAndAdministrativeExpense,annualOtherGandA,trailingOtherGandA,annualInsuranceAndClaims,trailingInsuranceAndClaims,annualRentAndLandingFees,trailingRentAndLandingFees,annualSalariesAndWages,trailingSalariesAndWages,annualGrossProfit,trailingGrossProfit,annualCostOfRevenue,trailingCostOfRevenue,annualTotalRevenue,trailingTotalRevenue,annualExciseTaxes,trailingExciseTaxes,annualOperatingRevenue,trailingOperatingRevenue&merge=false&period1=493590046&period2=1612321089&corsDomain=finance.yahoo.com";
let reccommendationsByURL = "https://query1.finance.yahoo.com/v6/finance/recommendationsbysymbol/";


let period1 = /\$\$\$/;
let period2 = /\@\@\@/;

let time2 = Math.floor(+ new Date() / 1000);
let time1 = Math.floor(time2 - 31556952);



module.exports = {
    yahooAnalyze: async function yahooAnalyze(message){
        let stockURL = stockURLFront + message + stockURLBack;
        let stockData = await grabStockData(stockURL);
        let response = await formatResponse(stockData);
        return await response;
    }
}
function formatResponse(stockJSON){
    console.log('in the yahoo_finance_parser.js')
    if(false){
        return 'Sorry I couldn\'t find that stock! I\'m sure it\'s there though. Sorry!';
    } else {
        console.log(stockJSON)
        return 'This is wayy easier'
    }    
}
async function grabStockData(url){
    let newVar = await Request(url).catch(err => console.log(err));
    let secondVar = await newVar.json().catch(err => console.log(err));
    return await secondVar.chart.result[0];
}









