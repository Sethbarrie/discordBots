module.exports = {
    formatNumber: function formatNumber(num){
        if(typeof num !== 'number'){
            num = parseFloat(num);
        }
        num = num.toFixed(2);
        numStr = num.toString();
        numStr = numStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return numStr;
    }
}