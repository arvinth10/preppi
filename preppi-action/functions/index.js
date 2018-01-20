// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const fb_database = require('./database.js');
const prettydiff = require("prettydiff");
const jsdom = require("jsdom");
const domtoimage = require('dom-to-image');
const { JSDOM } = jsdom;

// a. the action name from the make_name Dialogflow intent
  // const NAME_ACTION = 'make_name';
const LOAD_ACTION = 'load_document';
const SPEECH_ACTION = 'get_userText';
// b. the parameters that are parsed from the make_name intent
  // const COLOR_ARGUMENT = 'color';
  // const NUMBER_ARGUMENT = 'number';
const DOC_NAME_ARGUMENT = 'given-name';
const SPEECH_ARGUMENT = 'userText';
const TEST_SPEECH_TEXT = "";
fb_database.setupSessionsTable();

exports.preppi = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  // console.log('Request headers: ' + JSON.stringify(request.headers));
  // console.log('Request body: ' + JSON.stringify(request.body));

// c. The function that generates the silly name
  function loadDocument (app) {
    let doc_name = app.getArgument(DOC_NAME_ARGUMENT);

    fb_database.findDocName(doc_name).then(function(response){
      TEST_SPEECH_TEXT = response;
      app.ask(response);
    });
  }

  function processSpeech (app) {
    let text = app.getArgument(SPEECH_ARGUMENT);
    let response = compareSpeech(text);

    app.ask(app.buildRichResponse()
      // Create a basic card and add it to the rich response
        .addSimpleResponse(response)
        .addBasicCard(app.buildBasicCard('SHOW HTML TABLE HERE')
        .setTitle('Results From Current Session')
        .setImage('https://example.google.com/42.png', 'Session Results')
        .setImageDisplay('CROPPED')
      )
    );

  }

  function compareSpeech (text) {
    if (text == TEST_SPEECH_TEXT) {
      return "Correct! Would you like to change documents?"
    }
    else {
      return "Wrong! Would you like to retry?"
    }
  }


  //Returns an array of missed words
function getDifferenceMissedArray (correctText, speechText){

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
function getDifferenceAddedArray (correctText, speechText){
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

  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(LOAD_ACTION, loadDocument);
  actionMap.set(SPEECH_ACTION, processSpeech);


app.handleRequest(actionMap);
});
