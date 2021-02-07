const formats = require('./formats');

module.exports = {
    addDescriptorsToCalendar: function (array){
        //This is grabbing the highest number from each column and returning an array
        let whiteSpaceArray = [...new Array(7).keys()].map(idx => whiteSpaceCount(array.map(subArr => subArr[idx])))
        // whiteSpaceArray = whiteSpaceArray.map(num => num + 2);

        let spacedArr = array.map(subArr => {
            return subArr.map((word, idx) => {
                    return addWhiteSpaces(word, whiteSpaceArray[idx]);
            }).join(' | ')
        })
        let spacerLength = spacedArr[0].length;
        let spacer = new Array(spacerLength > 140 ? 140 : spacerLength).fill('-').join('');
        spacedArr.splice(1,0,spacer);

        //This makes sure you will always get a response under 2000 character limit set by discord
        while((spacedArr.length * spacedArr[0].length) > 2000){
            spacedArr.pop();
        }
        return spacedArr;
    },
    addDescriptorsToTable: function (array, table){
        let joinedArray = array.map((str, idx) => formats[table][idx] + str);
        let maxWhiteSpaces = whiteSpaceCount(joinedArray);
        let formattedArray = joinedArray.map( str => {
            while(str.length < maxWhiteSpaces){
                str += ' ';
            }
            return str;
        })
        return formattedArray;
    },
    addHeaderToTable: function(header, array){
        let maxWhiteSpaces = array[0].length;
        let centeredHeader = centerHeader(header, maxWhiteSpaces);
        let spacer = new Array(maxWhiteSpaces).fill('-').join('');
        array.splice(0,0, spacer);
        array.splice(0,0, centeredHeader);
        return array;
    },
    addNewLines: function(array){
        return array.join('\n');
    },
    addTicks: function(string){
        return '```\n' + string + '\n```';
    },
    joinTables: function( table1, table2){
        console.log(table1)
        console.log(table2)
        return table1.map(( string, idx) => string + table2[idx]);
    },
    deconstructTable: function(string){
        let slicedString = string.slice(5,-4);
        let splitTable = slicedString.split('\n');
        splitTable.shift();
        splitTable.shift();
        return splitTable;
    }
}

function whiteSpaceCount(array){
    return array.reduce((acc, ele) => ele.length > acc ? ele.length : acc, 0);
}
function centerHeader(word, num){
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
function addWhiteSpaces(word, num){
    return word + new Array(num - word.length).fill(' ').join('');
}