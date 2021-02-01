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
    formatCalendar: function formatCalendar(array){
        let maxWhiteSpacesArray = maxWhiteSpaces(array);
        maxWhiteSpacesArray.map(num => num + 2);
        let spacedArr = array.map(subArr => {
            return subArr.map((word, idx) => {
                return addWhiteSpaces(word, maxWhiteSpacesArray[idx]);
            }).join(' | ')
        })
        //Necessary to keep spacing for the front since you only want to add one to the front
        //Because it doesn't get a front and back space
        maxWhiteSpacesArray[0]--;

        maxWhiteSpacesArray = maxWhiteSpacesArray.map( num => new Array(num + 2).fill('-').join('')).join('|');
        spacedArr.splice(1,0,maxWhiteSpacesArray);

        let formattedTable = spacedArr.join('\n');
        return ('```\n' + formattedTable + '\n```');
    }
}
//IPO Calendar table
function maxWhiteSpaces(twoDArray){
    let maxWhiteSpaces = maxCharArr(twoDArray[0]);
    twoDArray.forEach(subArr => {
        let tempArr = maxCharArr(subArr);
        for(let i = 0; i < tempArr.length; i++){
            if(tempArr[i] > maxWhiteSpaces[i]){
                maxWhiteSpaces[i] = tempArr[i];
            }
        }
    })
    return maxWhiteSpaces;
}

function maxCharArr(array){
    return array.map(word => word.length);
}

function addWhiteSpaces(word, num){
    let newWord = word.slice(0);
    let spot = true;
    while(newWord.length < num){
        if(spot){
            newWord = ' ' + newWord;
            spot = false;
        } else {
            newWord = newWord + ' ';
            spot = true;
        }
    };
    return newWord;   
}