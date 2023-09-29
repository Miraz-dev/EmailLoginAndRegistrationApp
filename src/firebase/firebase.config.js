// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBHY36LP01FY8P3WsEXo1I7M-EgXU7ZUs",
  authDomain: "m9-user-email-pass-auth.firebaseapp.com",
  projectId: "m9-user-email-pass-auth",
  storageBucket: "m9-user-email-pass-auth.appspot.com",
  messagingSenderId: "204523685063",
  appId: "1:204523685063:web:75c72f34ca5efc472eeae2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;