// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjhUpE6OJ7EY62UI0jzpZ6Lrl74E8LcX4",
  authDomain: "promptlibrary-72bd9.firebaseapp.com",
  projectId: "promptlibrary-72bd9",
  storageBucket: "promptlibrary-72bd9.firebasestorage.app",
  messagingSenderId: "579159883750",
  appId: "1:579159883750:web:17a3cd7799a2927df1e027",
  measurementId: "G-2XJJZTM8EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);