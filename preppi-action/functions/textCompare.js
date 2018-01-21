const JsDiff = require("diff");

//Returns a string of text missed with bolding done
module.exports.textMissed = function (correctText, speechText){
//function textMissed(correctText, speechText){
  var diff = JsDiff.diffWords(correctText, speechText);

  var stringToReturn = "";

  diff.forEach(function(part){

      if(part.removed == true){
        stringToReturn = stringToReturn.concat(" **");
        var temp = part.value.trim();
        stringToReturn = stringToReturn.concat(temp);
        stringToReturn = stringToReturn.concat("** ");
      }else if (part.added == undefined){
        stringToReturn = stringToReturn.concat(part.value);
      }

  });

  return stringToReturn;
}
//textMissed("one two three four five six", "one two three")
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

  var splitArray = [];
  var arr_words = [];

  if (arrayToReturn.length > 0) {
    for (var i=0; i<arrayToReturn; i++) {
      var words = arrayToReturn[i];
      arr_words = words.split(" ");
      for (var j=0; j<arr_words.length-1; j++){
        splitArray.push(arr_words[j]);
      }
    }
  }
  // else {
  //   var words = arrayToReturn[0];
  //   arr_words = words.split(" ");
  //   for (var j=0; j<arr_words.length-1; j++){
  //     splitArray.push(arr_words[j]);
  //   }
  //}


  return splitArray;

}

//Return an array of missed words
module.exports.getDifferenceMissedArray = function (correctText, speechText){
// function getDifferenceMissedArray(correctText, speechText) {
  var diff = JsDiff.diffWords(correctText, speechText);

  var arrayToReturn = [];

  diff.forEach(function(part){

    if(part.removed == true){
        arrayToReturn.push(part.value);
    }

  });

  var splitArray = [];
  var arr_words = [];

  if (arrayToReturn.length > 0) {
    for (var i=0; i<arrayToReturn.length; i++) {
      var words = arrayToReturn[i];
      arr_words = words.split(" ");
      for (var j=0; j<arr_words.length-1; j++){
        splitArray.push(arr_words[j]);
      }
    }
  }
  // else {
  //   var words = arrayToReturn[0];
  //   arr_words = words.split(" ");
  //   for (var j=0; j<arr_words.length; j++){
  //     splitArray.push(arr_words[j]);
  //   }
  //}


  return splitArray;

}

// getDifferenceMissedArray("My name is shiv", "My name is not mat");

// module.export.sendJSONforStats = function (textMissed, textAdded, arrayMissed, arrayAdded){
//   var sendJSON = {"textMissed" : textMissed, "textAdded" : textAdded, "arrayMissed" : arrayMissed, "arrayAdded" : arrayAdded};
//     request.post({
//         url: "http://100.64.214.107/api/stats",
//         json: true,
//         body: sendJSON
//      });
// }
