// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMyQSLcUTA0Yx8_1kLAfn7Bnr4dm2VrzU",
  authDomain: "leadsextractor-8d297.firebaseapp.com",
  projectId: "leadsextractor-8d297",
  storageBucket: "leadsextractor-8d297.appspot.com",
  messagingSenderId: "305069341219",
  appId: "1:305069341219:web:ac9871096ad0e519fbcf96",
  measurementId: "G-MMK7TQ754B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);