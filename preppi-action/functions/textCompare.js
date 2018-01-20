const prettydiff = require("prettydiff");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

 //Returns an array of missed words
module.exports.getDifferenceMissedArray = function  (correctText, speechText){

  var args = {
    source : correctText,
    diff : speechText,
    lang : "text"

  };

  var output = prettydiff.api(args); 

  const htmlOut = new JSDOM(output[0]);
  var missedWordsElem =  htmlOut.window.document.getElementsByClassName('diff-left')[0].querySelectorAll("em"); // .textContent

  var missedWords  = [];
  for (var num in missedWordsElem){
    if (missedWordsElem[num].textContent != '' && missedWordsElem[num].textContent != null){ 
      missedWords.push(missedWordsElem[num].textContent );
    }

  }
 
return missedWords;

}

//Returns an array of added words
module.exports.getDifferenceAddedArray = function (correctText, speechText){
  var args = {
    source : correctText,
    diff : speechText,
    lang : "text"
  };

  var output = prettydiff.api(args); 

  const htmlOut = new JSDOM(output[0]);
  var addedWordElem =  htmlOut.window.document.getElementsByClassName('diff-right')[0].querySelectorAll("em"); // "Hello world"


  var addedWords = [];
  for (var num in addedWordElem){
    if(addedWordElem[num].textContent != '' && addedWordElem[num].textContent != null){
      addedWords.push(addedWordElem[num].textContent );
    }
  }
  
return addedWords; 

}
