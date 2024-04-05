// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsoHGDopPslNJ0Ck3U7vkih1uQwdniKw4",
    authDomain: "whatsmap-c8cd1.firebaseapp.com",
    projectId: "whatsmap-c8cd1",
    storageBucket: "whatsmap-c8cd1.appspot.com",
    messagingSenderId: "137120667022",
    appId: "1:137120667022:web:04646a29cbf67e9c4100df",
    measurementId: "G-BNY28ZSLLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
