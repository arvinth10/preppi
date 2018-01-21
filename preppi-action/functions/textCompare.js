const JsDiff = require("diff");

//Returns a string of text missed with bolding done
module.exports.textMissed = function (correctText, speechText){

  var diff = JsDiff.diffWords(correctText, speechText);

  var stringToReturn = "";

  diff.forEach(function(part){

      if(part.removed == true){
        stringToReturn = stringToReturn.concat(" **");
        var temp = part.value.replaceAll(" ", "");
        stringToReturn = stringToReturn.concat(temp);
        stringToReturn = stringToReturn.concat("** ");
      }else if (part.added == undefined){
        stringToReturn = stringToReturn.concat(part.value);
      }

  });

  return stringToReturn;
}

//Returns a string of added text with bolding done
module.exports.textAdded = function (correctText, speechText){

  var diff = JsDiff.diffWords(correctText, speechText);

  var stringToReturn = "";

  diff.forEach(function(part){

      if(part.added == true){
        stringToReturn = stringToReturn.concat(" **");
        stringToReturn = stringToReturn.concat(part.value);
        stringToReturn = stringToReturn.concat("** ");
      }else if (part.removed == undefined){
        stringToReturn = stringToReturn.concat(part.value);
      }

  });

  return stringToReturn;

}


//Got from: https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



//Returns an array of added words
module.exports.getDifferenceAddedArray = function (correctText, speechText){

  var diff = JsDiff.diffWords(correctText, speechText);

  var arrayToReturn = [];

  diff.forEach(function(part){

    if(part.added == true){
        arrayToReturn.push(part.value);
    }

  });

  return arrayToReturn;

}

//Return an array of missed words
module.exports.getDifferenceMissedArray = function (correctText, speechText){

  var diff = JsDiff.diffWords(correctText, speechText);

  var arrayToReturn = [];

  diff.forEach(function(part){

    if(part.removed == true){
        arrayToReturn.push(part.value);
    }

  });

  return arrayToReturn;

}

// module.export.sendJSONforStats = function (textMissed, textAdded, arrayMissed, arrayAdded){
//   var sendJSON = {"textMissed" : textMissed, "textAdded" : textAdded, "arrayMissed" : arrayMissed, "arrayAdded" : arrayAdded};
//     request.post({
//         url: "http://100.64.214.107/api/stats",
//         json: true,
//         body: sendJSON
//      });
// }
