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
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");
		// Create a regular expression to parse the CSV values.
		let objPattern = new RegExp(
			(
				// Delimiters.
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
				// Standard fields.
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
			);
		// Create an array to hold our data. Give the array
		// a default empty first row.
		let arrData = [[]];
		// Create an array to hold our individual pattern
		// matching groups.
		let arrMatches = null;
		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec( strData )){
			// Get the delimiter that was found.
			let strMatchedDelimiter = arrMatches[ 1 ];
			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				(strMatchedDelimiter != strDelimiter)
				){
				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push( [] );
			}
			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
            // captured (quoted or unquoted).
            let strMatchedValue;
			if (arrMatches[ 2 ]){
				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				strMatchedValue = arrMatches[ 2 ].replace(
					new RegExp( "\"\"", "g" ),
					"\""
					);
			} else {
				// We found a non-quoted value.
				strMatchedValue = arrMatches[ 3 ];
			}
			// Now that we have our value string, let's add
			// it to the data array.
			arrData[ arrData.length - 1 ].push( strMatchedValue );
		}
		// Return the parsed data.
		return( arrData );
    },
    formatTable: function formatTable(array){
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