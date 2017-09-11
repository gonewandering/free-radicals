import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCBR2el-lzq7LZvXG7bZJ7ivYNY1Ui3tYc",
  authDomain: "free-radicals-4ca3a.firebaseapp.com",
  databaseURL: "https://free-radicals-4ca3a.firebaseio.com",
  projectId: "free-radicals-4ca3a",
  storageBucket: "free-radicals-4ca3a.appspot.com",
  messagingSenderId: "767523430935"
};

firebase.initializeApp(config);

export default firebase;
