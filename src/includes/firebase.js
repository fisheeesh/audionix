import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCNCnwKIHoQ48zI66yerXWtqSYUQPmkzAQ",
  authDomain: "music-b055.firebaseapp.com",
  projectId: "music-b055",
  storageBucket: "music-b055.firebasestorage.app",
  messagingSenderId: "1032242163454",
  appId: "1:1032242163454:web:528b88f4cf4aa24dddbfaf"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth }
