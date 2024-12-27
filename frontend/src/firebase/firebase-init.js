// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMLFNILQEYv5XbJjBj_JDOjGWwuj8MyCw",
  authDomain: "neonrun-d9e96.firebaseapp.com",
  projectId: "neonrun-d9e96",
  storageBucket: "neonrun-d9e96.firebasestorage.app",
  messagingSenderId: "550495057678",
  appId: "1:550495057678:web:6372d9a38530346284895f",
  measurementId: "G-2FRCMRDCS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);