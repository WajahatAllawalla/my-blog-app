
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { doc, setDoc, getFirestore, getDoc, collection, addDoc, getDocs, updateDoc, deleteDoc, query, where  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB5pkWQab_fvSsIzaG9lg93Ff12OC6w5N4",
    authDomain: "wajahatjs.firebaseapp.com",
    projectId: "wajahatjs",
    storageBucket: "wajahatjs.firebasestorage.app",
    messagingSenderId: "281239937673",
    appId: "1:281239937673:web:b028a54e8642dfbf3a9c58",
    measurementId: "G-324EHHK4K7"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    app,
    getAuth,
    createUserWithEmailAndPassword,
    auth,
    doc, setDoc,
    db,
    signInWithEmailAndPassword,
    getDoc,
    onAuthStateChanged,
    collection, addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where
}