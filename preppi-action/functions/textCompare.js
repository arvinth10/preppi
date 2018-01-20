const prettydiff = require("prettydiff");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const domtoimage = require('dom-to-image');
const FileSaver = require('file-saver');

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



//Return html string of missed base text including highlight of 
function htmlOfMissed (correctText, speechText){
    var args = {
    source : correctText,
    diff : speechText,
    lang : "text"
  };

  var output = prettydiff.api(args); 

  const htmlOut = new JSDOM(output[0]);

  var htmlContent = htmlOut.window.document.getElementsByClassName('diff-left')[0].getElementsByClassName('replace')[0];
  var stringNeed = htmlContent.innerHTML;

  stringNeed = stringNeed.replaceAll("<em>", "\n **");
  stringNeed = stringNeed.replaceAll("</em>", "**");
  
  return stringNeed;


}

//Got from: https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

htmlOfMissed ("some text good but not bad", "some good not bad");

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


