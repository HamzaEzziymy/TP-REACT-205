// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYrk501pfi6wpTR4OQELtjRm8Aa5TG0SI",
  authDomain: "xstore-2023.firebaseapp.com",
  projectId: "xstore-2023",
  storageBucket: "xstore-2023.appspot.com",
  messagingSenderId: "960121759912",
  appId: "1:960121759912:web:de80f52287ae79a920fa9d",
  measurementId: "G-MJKQEJJGXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
