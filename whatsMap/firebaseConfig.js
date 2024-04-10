import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsoHGDopPslNJ0Ck3U7vkih1uQwdniKw4",
    authDomain: "whatsmap-c8cd1.firebaseapp.com",
    projectId: "whatsmap-c8cd1",
    storageBucket: "whatsmap-c8cd1.appspot.com",
    messagingSenderId: "137120667022",
    appId: "1:137120667022:web:04646a29cbf67e9c4100df",
    measurementId: "G-BNY28ZSLLV"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);