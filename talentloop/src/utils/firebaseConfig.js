import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0ujKBDQfjW1p2uGE4ZGxC2fPrWxCwYrQ",
    authDomain: "talentloop-c428e.firebaseapp.com",
    projectId: "talentloop-c428e",
    storageBucket: "talentloop-c428e.firebasestorage.app",
    messagingSenderId: "789052228888",
    appId: "1:789052228888:web:a71ff44fb130ae1de30a6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
