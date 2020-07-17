import firebase from 'firebase/app';
import 'firebase/database';

   var firebaseConfig = {
    apiKey: "AIzaSyBurq2YcwUDC53hM0_dPS9aqquMVbpSd0I",
    authDomain: "soueleito-43601.firebaseapp.com",
    databaseURL: "https://soueleito-43601.firebaseio.com",
    projectId: "soueleito-43601",
    storageBucket: "soueleito-43601.appspot.com",
    messagingSenderId: "28875384344",
    appId: "1:28875384344:web:adb3136c56f56034c0c56d",
    measurementId: "G-FMJLREGR1D"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase;