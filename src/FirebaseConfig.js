// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASl7cIuJZZvcKwreiBRgLlMiCpLOeG2uY",
  authDomain: "transportapp-ae8aa.firebaseapp.com",
  projectId: "transportapp-ae8aa",
  storageBucket: "transportapp-ae8aa.appspot.com",
  messagingSenderId: "11190984744",
  appId: "1:11190984744:web:9965e736005c837d2d151d",
  measurementId: "G-EHWFQLQP2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);

export {app, database};