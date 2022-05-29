// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlkukwKtIYvE8AMvw7zwSNAnMhkxUM6nI",
  authDomain: "gojim-1d589.firebaseapp.com",
  projectId: "gojim-1d589",
  storageBucket: "gojim-1d589.appspot.com",
  messagingSenderId: "264932508644",
  appId: "1:264932508644:web:5b8f9fda9f02ec0c7b3df1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)