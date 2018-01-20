var prettydiff = require("prettydiff");
var DomParser = require('dom-parser');
var parser = new DomParser();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


//Returns all text missed or added between the two given texts
function getDifference (correctText, speechText){

	var args = {
		source : correctText,
		diff : speechText,
		lang : "text"

	};

	var output = prettydiff.api(args); 



	const htmlOut = new JSDOM(output[0]);
	var missedWordsElem =  htmlOut.window.document.getElementsByClassName('diff-left')[0].querySelectorAll("em"); // .textContent
	var addedWordElem =  htmlOut.window.document.getElementsByClassName('diff-right')[0].querySelectorAll("em"); // "Hello world"

	var missedWords  = [];
	var temp;
	for (var num in missedWordsElem){
		if (missedWordsElem[num].textContent != '' && missedWordsElem[num].textContent != null){ 
			missedWords.push(missedWordsElem[num].textContent );
		}

	}


	var addedWords = [];
	for (var num in addedWordElem){
		if(addedWordElem[num].textContent != '' && addedWordElem[num].textContent != null){
			addedWords.push(addedWordElem[num].textContent );
		}
	}

console.log("Words/lines that you missed : " + missedWords);
console.log("Words/lines that you added : " + addedWords);

}

getDifference("hi name is arvinth and i am nice", "hi name arvinth i am nice and i am winning the hackathon ya");