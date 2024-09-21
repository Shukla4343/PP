import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdjsa5XBRKHnodg9ZUZ-FeDnqKuli29QA",
  authDomain: "partnerportal-eab2c.firebaseapp.com",
  projectId: "partnerportal-eab2c",
  storageBucket: "partnerportal-eab2c.appspot.com",
  messagingSenderId: "784762574118",
  appId: "1:784762574118:web:3a33085fb60a0da2f0dde7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);
const txtDB = getFirestore(app);
export const auth = getAuth();
export{imgDB, txtDB};