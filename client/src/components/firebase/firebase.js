var firebase = require("firebase");
  
const config = {
    apiKey: "AIzaSyDQSDfPrKEo3mwSOzTQjK2KxaZlIFEey6E",
    authDomain: "ascent-2982c.firebaseapp.com",
    databaseURL: "https://ascent-2982c.firebaseio.com",
    projectId: "ascent-2982c",
    storageBucket: "ascent-2982c.appspot.com",
    messagingSenderId: "101065531447"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();
  const firestore = firebase.firestore()
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);


module.exports = {auth, firestore,config}