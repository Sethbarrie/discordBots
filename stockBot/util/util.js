const fs = require('fs');

module.exports = {
    formatNumber: function formatNumber(num){
        if(typeof num !== 'number'){
            num = parseFloat(num);
        }
        num = num.toFixed(2);
        numStr = num.toString();
        numStr = numStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return numStr;
    },
    //https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
    csvToArray: function CSVToArray( strData, strDelimiter ){
		strDelimiter = (strDelimiter || ",");
		let objPattern = new RegExp(
			(
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
			);
		let arrData = [[]];
		let arrMatches = null;
		while (arrMatches = objPattern.exec( strData )){
			let strMatchedDelimiter = arrMatches[ 1 ];
			if (
				strMatchedDelimiter.length &&
				(strMatchedDelimiter != strDelimiter)
				){
				arrData.push( [] );
			}
            let strMatchedValue;
			if (arrMatches[ 2 ]){
				strMatchedValue = arrMatches[ 2 ].replace(
					new RegExp( "\"\"", "g" ),
					"\""
					);
			} else {
				strMatchedValue = arrMatches[ 3 ];
			}
			arrData[ arrData.length - 1 ].push( strMatchedValue );
		}
		return( arrData );
    },
    log: function log(message){
        console.log(message);
        fs.writeFile('log.txt', message, err => {
            if(err){
                return console.log(err);
            }
            console.log('File saved successfully');
        });
    }
}
