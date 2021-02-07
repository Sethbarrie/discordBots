require('dotenv').config();
const Request = require('node-fetch');
const Util = require('../util/util');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const PDFDocument = require('pdfkit');


let queryString = "https://finance.yahoo.com/quote/";

let stockURLFront = "https://query1.finance.yahoo.com/v8/finance/chart/"
let stockURLBack = "?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance";
//stockURLFront + symbol + stockURLBack = JSON response with stock summary
let trendingURL = "https://query1.finance.yahoo.com/v1/finance/trending/US?count=5";//Doesn't need symbol
//This gives trending stocks, small blurbs and data for 5

let stockHistoryURLFront = "https://query1.finance.yahoo.com/v7/finance/download/"
let stockHistoryURLBack = "?period1=$$$&period2=@@@&interval=1d&events=history&includeAdjustedClose=true"
let period1 = /\$\$\$/;
let period2 = /\@\@\@/;
let time2 = Math.floor(+ new Date() / 1000);
let time1 = Math.floor(time2 - 31556952);
// stockHistoryURLFront + stock + stockHistoryURLBack.replace(period1,time1).replace(period2, time2)
// This gives a CSV file with all stock history. A bit redundant since the call above gives this too

let financialsURLFront = "https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/";
let financialsURLBack = "?lang=en-US&region=US&symbol=GME&padTimeSeries=true&type=annualTaxEffectOfUnusualItems,trailingTaxEffectOfUnusualItems,annualTaxRateForCalcs,trailingTaxRateForCalcs,annualNormalizedEBITDA,trailingNormalizedEBITDA,annualNormalizedDilutedEPS,trailingNormalizedDilutedEPS,annualNormalizedBasicEPS,trailingNormalizedBasicEPS,annualTotalUnusualItems,trailingTotalUnusualItems,annualTotalUnusualItemsExcludingGoodwill,trailingTotalUnusualItemsExcludingGoodwill,annualNetIncomeFromContinuingOperationNetMinorityInterest,trailingNetIncomeFromContinuingOperationNetMinorityInterest,annualReconciledDepreciation,trailingReconciledDepreciation,annualReconciledCostOfRevenue,trailingReconciledCostOfRevenue,annualEBITDA,trailingEBITDA,annualEBIT,trailingEBIT,annualNetInterestIncome,trailingNetInterestIncome,annualInterestExpense,trailingInterestExpense,annualInterestIncome,trailingInterestIncome,annualContinuingAndDiscontinuedDilutedEPS,trailingContinuingAndDiscontinuedDilutedEPS,annualContinuingAndDiscontinuedBasicEPS,trailingContinuingAndDiscontinuedBasicEPS,annualNormalizedIncome,trailingNormalizedIncome,annualNetIncomeFromContinuingAndDiscontinuedOperation,trailingNetIncomeFromContinuingAndDiscontinuedOperation,annualTotalExpenses,trailingTotalExpenses,annualRentExpenseSupplemental,trailingRentExpenseSupplemental,annualReportedNormalizedDilutedEPS,trailingReportedNormalizedDilutedEPS,annualReportedNormalizedBasicEPS,trailingReportedNormalizedBasicEPS,annualTotalOperatingIncomeAsReported,trailingTotalOperatingIncomeAsReported,annualDividendPerShare,trailingDividendPerShare,annualDilutedAverageShares,trailingDilutedAverageShares,annualBasicAverageShares,trailingBasicAverageShares,annualDilutedEPS,trailingDilutedEPS,annualDilutedEPSOtherGainsLosses,trailingDilutedEPSOtherGainsLosses,annualTaxLossCarryforwardDilutedEPS,trailingTaxLossCarryforwardDilutedEPS,annualDilutedAccountingChange,trailingDilutedAccountingChange,annualDilutedExtraordinary,trailingDilutedExtraordinary,annualDilutedDiscontinuousOperations,trailingDilutedDiscontinuousOperations,annualDilutedContinuousOperations,trailingDilutedContinuousOperations,annualBasicEPS,trailingBasicEPS,annualBasicEPSOtherGainsLosses,trailingBasicEPSOtherGainsLosses,annualTaxLossCarryforwardBasicEPS,trailingTaxLossCarryforwardBasicEPS,annualBasicAccountingChange,trailingBasicAccountingChange,annualBasicExtraordinary,trailingBasicExtraordinary,annualBasicDiscontinuousOperations,trailingBasicDiscontinuousOperations,annualBasicContinuousOperations,trailingBasicContinuousOperations,annualDilutedNIAvailtoComStockholders,trailingDilutedNIAvailtoComStockholders,annualAverageDilutionEarnings,trailingAverageDilutionEarnings,annualNetIncomeCommonStockholders,trailingNetIncomeCommonStockholders,annualOtherunderPreferredStockDividend,trailingOtherunderPreferredStockDividend,annualPreferredStockDividends,trailingPreferredStockDividends,annualNetIncome,trailingNetIncome,annualMinorityInterests,trailingMinorityInterests,annualNetIncomeIncludingNoncontrollingInterests,trailingNetIncomeIncludingNoncontrollingInterests,annualNetIncomeFromTaxLossCarryforward,trailingNetIncomeFromTaxLossCarryforward,annualNetIncomeExtraordinary,trailingNetIncomeExtraordinary,annualNetIncomeDiscontinuousOperations,trailingNetIncomeDiscontinuousOperations,annualNetIncomeContinuousOperations,trailingNetIncomeContinuousOperations,annualEarningsFromEquityInterestNetOfTax,trailingEarningsFromEquityInterestNetOfTax,annualTaxProvision,trailingTaxProvision,annualPretaxIncome,trailingPretaxIncome,annualOtherIncomeExpense,trailingOtherIncomeExpense,annualOtherNonOperatingIncomeExpenses,trailingOtherNonOperatingIncomeExpenses,annualSpecialIncomeCharges,trailingSpecialIncomeCharges,annualGainOnSaleOfPPE,trailingGainOnSaleOfPPE,annualGainOnSaleOfBusiness,trailingGainOnSaleOfBusiness,annualOtherSpecialCharges,trailingOtherSpecialCharges,annualWriteOff,trailingWriteOff,annualImpairmentOfCapitalAssets,trailingImpairmentOfCapitalAssets,annualRestructuringAndMergernAcquisition,trailingRestructuringAndMergernAcquisition,annualSecuritiesAmortization,trailingSecuritiesAmortization,annualEarningsFromEquityInterest,trailingEarningsFromEquityInterest,annualGainOnSaleOfSecurity,trailingGainOnSaleOfSecurity,annualNetNonOperatingInterestIncomeExpense,trailingNetNonOperatingInterestIncomeExpense,annualTotalOtherFinanceCost,trailingTotalOtherFinanceCost,annualInterestExpenseNonOperating,trailingInterestExpenseNonOperating,annualInterestIncomeNonOperating,trailingInterestIncomeNonOperating,annualOperatingIncome,trailingOperatingIncome,annualOperatingExpense,trailingOperatingExpense,annualOtherOperatingExpenses,trailingOtherOperatingExpenses,annualOtherTaxes,trailingOtherTaxes,annualProvisionForDoubtfulAccounts,trailingProvisionForDoubtfulAccounts,annualDepreciationAmortizationDepletionIncomeStatement,trailingDepreciationAmortizationDepletionIncomeStatement,annualDepletionIncomeStatement,trailingDepletionIncomeStatement,annualDepreciationAndAmortizationInIncomeStatement,trailingDepreciationAndAmortizationInIncomeStatement,annualAmortization,trailingAmortization,annualAmortizationOfIntangiblesIncomeStatement,trailingAmortizationOfIntangiblesIncomeStatement,annualDepreciationIncomeStatement,trailingDepreciationIncomeStatement,annualResearchAndDevelopment,trailingResearchAndDevelopment,annualSellingGeneralAndAdministration,trailingSellingGeneralAndAdministration,annualSellingAndMarketingExpense,trailingSellingAndMarketingExpense,annualGeneralAndAdministrativeExpense,trailingGeneralAndAdministrativeExpense,annualOtherGandA,trailingOtherGandA,annualInsuranceAndClaims,trailingInsuranceAndClaims,annualRentAndLandingFees,trailingRentAndLandingFees,annualSalariesAndWages,trailingSalariesAndWages,annualGrossProfit,trailingGrossProfit,annualCostOfRevenue,trailingCostOfRevenue,annualTotalRevenue,trailingTotalRevenue,annualExciseTaxes,trailingExciseTaxes,annualOperatingRevenue,trailingOperatingRevenue&merge=false&period1=493590046&period2=1612321089&corsDomain=finance.yahoo.com";

let reccommendationsByURL = "https://query1.finance.yahoo.com/v6/finance/recommendationsbysymbol/";
// ReccommendationsByURL + stock = Stocks other people are watching that also watch this stock


let JSONSuffix = '&format=json';

let smallStatisticsConjunction = "key-statistics?p=";
let smallProfileConjunction = "profile?p=";
let smallFinancialsConjunction = "financials?p=";
let smallAnalysisConjunction = "analysis?p=";
let smallHoldersConjunction = "holders?p=";

let optionsURL = "/options?p="

let conjunctions = [
    "key-statistics?p=",
    "profile?p=",
    "financials?p=",
    "analysis?p=",
    "holders?p="
]    


module.exports = {
    yahooAnalyze: async function yahooAnalyze(stock){
        // let cmo, crsi, dpo, ichimoku, macd, obv, pb, rsi, pvar;

        let queryData = [
            Request(stockURLFront + stock),
            Request(queryString + stock + smallStatisticsConjunction + stock + JSONSuffix),
            Request(queryString + stock + smallProfileConjunction + stock + JSONSuffix),
            Request(queryString + stock + smallFinancialsConjunction + stock + JSONSuffix),
            Request(queryString + stock + smallAnalysisConjunction + stock + JSONSuffix),
            Request(queryString + stock + smallHoldersConjunction + stock + JSONSuffix),
        ];

        //This gets all the available dates for options, neccessary for the later call;    
        let optionsData = await getOptionsDate(stock);
        let dateArr = await optionsData.map(date => {
            return Request("https://finance.yahoo.com/quote/TSLA/options?date=" + date +"&p=" + stock + "&straddle=true")
        }); 
        console.log(queryData)
        return Promise.all([ ...queryData, ...dateArr ]).then((responses) => {
            return Promise.all(responses.map((response, idx) => {
                if(!idx){
                    return response.json();
                } else {
                    return response.text();
                }
            }))   
        }).then((data) => {
            data.forEach((htmlData, idx) => {
                let document;
                if(idx){
                    const dom = new JSDOM(htmlData);
                    document = dom.window.document;
                    // console.log('This is the console.log',document.querySelector('span').textContent);
                }
                switch(idx){
                    case 0: //Summary overview, comes from JSON file
                        let summaryJSON = htmlData.chart.result;
                        // console.log('summaryJSON',summaryJSON);
                        break;
                    case 1: //Statistics, parse from text

                        let statsText = document.querySelector('#Col1-0-KeyStatistics-Proxy').children[0].children[2].innerText;
                        console.log('statsText', statsText)
                        break;
                    case 2: //History, comes from csv file    
                        // let url = document.querySelectorAll('#Col1-1-HistoricalDataTable-Proxy a')[0].href;

                        break;
                    case 3: //Profile, parse from text    
                        let profileText = document.querySelector('#Col1-0-Profile-Proxy').innerText;
                        console.log('profileText', profileText)
                        break;
                    case 4:// Financials, parse from text    
                        let financialsText = document.querySelector('#Col1-1-Financials-Proxy').children[0].children[3].innerText;
                        console.log('financialsText', financialsText);
                        break;
                    case 5: //Analysis, parse from text    
                        let analysisText = document.querySelector('#Main').innerText;
                        console.log('AnalysisText', analysisText);
                        break;
                    case 6:// Options, parse from text    
                        let optionText = document.querySelector('#Col1-1-OptionContracts-Proxy').children[0].children[1].innerText;
                        console.log('optionsText', optionText);
                        break;
                    case 7:

                    default:
                        break;
                }        
            })    

            // const dom = new JSDOM(data[0].markup);

            // console.log(dom.window.document.querySelectorAll('[data-reactid="50"]')[0].textContent)


            // console.log(stockprice, difference, yesterdayClose, open, todayLowHigh, yearLowHigh, volume, averageVolume, marketCap, oneYearPriceEstimate);
            return 'Hope this worked';
        }).catch(function (error) {
            console.log(error);
        });    
    }    
}    






async function getOptionsDate(stock){
    return Request(queryString + stock + optionsURL + stock)
        .then(response => response.text()).then(data => {
        const dom = new JSDOM(data.markup);
        let document = dom.window.document;
        return Array.from(document.querySelectorAll('#Col1-1-OptionContracts-Proxy option')).map(node => node.value);
    })
}