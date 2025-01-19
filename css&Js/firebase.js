import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);
 const db = getFirestore(app);

 export {
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     auth,
     doc,
     setDoc,
     getDoc,
     db,
     onAuthStateChanged,
     addDoc,
     collection,
     getDocs,
     updateDoc,
     deleteDoc,
     query,
     where
 }