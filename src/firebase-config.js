// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJokvTnLh4dwbHz32Q5WRz3JVaOQ7m0Pw",
  authDomain: "slack-mock-a6c20.firebaseapp.com",
  projectId: "slack-mock-a6c20",
  storageBucket: "slack-mock-a6c20.appspot.com",
  messagingSenderId: "1012340119102",
  appId: "1:1012340119102:web:a948a83cbf169090dae36f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage = getStorage();
export const db = getFirestore(app)