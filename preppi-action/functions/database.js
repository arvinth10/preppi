const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyD-CTDOADr08VDMKAVvfH-icq8yE20rr88",
  authDomain: "preppi-15d29.firebaseapp.com",
  databaseURL: "https://preppi-15d29.firebaseio.com",
  projectId: "preppi-15d29",
  storageBucket: "preppi-15d29.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();


module.exports.setupSessionsTable = function () {
//function setupSessionsTable (){
  console.log("Enterssdfsd");
  database.ref('/').set({
    documents: {
      name: "My Life",
      content_of_doc: "Hello My name is Mathusan What is yours",
      sessions: []
    }
  });
}

module.exports.findDocName = function (docName) {

  return new Promise(function (resolve, reject){

    var ref = database.ref("/documents");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
      if (snapshot.val().name == docName) {
        resolve(snapshot.val().content_of_doc);
      }
    }, function (errorObject) {
      reject("The read failed: " + errorObject.code);
    });

  });
}
