import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/database';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBuBRVXF4wyT9lvVT01OLXSJQkc1y0FMZA",
  authDomain: "todoist-tut-d865d.firebaseapp.com",
  databaseURL: "https://todoist-tut-d865d-default-rtdb.firebaseio.com",
  projectId: "todoist-tut-d865d",
  storageBucket: "todoist-tut-d865d.appspot.com",
  messagingSenderId: "189459832731",
  appId: "1:189459832731:web:232aa3be077e74347b4b3e",
});

export { firebaseConfig as firebase };
