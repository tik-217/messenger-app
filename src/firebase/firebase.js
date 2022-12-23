// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOsvPPHVdu3h5Rwr0QMnBPiiUVs5SLtR0",
  authDomain: "messanger-1367f.firebaseapp.com",
  projectId: "messanger-1367f",
  storageBucket: "messanger-1367f.appspot.com",
  messagingSenderId: "987899909534",
  appId: "1:987899909534:web:d9329c6b21de6fb3b2728f",
  measurementId: "G-SH3TKXDE5F"
};

console.log(getApp);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;