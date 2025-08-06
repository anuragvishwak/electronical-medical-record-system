// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7R4cyZWexzChjO2RmKjuxCiz8eWD6KQ0",
  authDomain: "medical-emr-system.firebaseapp.com",
  projectId: "medical-emr-system",
  storageBucket: "medical-emr-system.firebasestorage.app",
  messagingSenderId: "802019450578",
  appId: "1:802019450578:web:3c9b5091736e75f6fe170b",
  measurementId: "G-860DSDCS5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const auth = getAuth(app);

export { app, database, auth };