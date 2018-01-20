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
      content_of_doc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
