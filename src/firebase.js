import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/database';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCPUIivn7FQPmOT8EP6ZvDVtr6vsrfOo1A",
  authDomain: "todoist-tut-cb5e4.firebaseapp.com",
  projectId: "todoist-tut-cb5e4",
  storageBucket: "todoist-tut-cb5e4.appspot.com",
  messagingSenderId: "935527516755",
  appId: "1:935527516755:web:4c6c4f83e588b072e794a6"
});

export { firebaseConfig as firebase };
