// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7W_yZBkV18UxFVU0PLfMGPoNsNXPsePo",
  authDomain: "harmonix-b285b.firebaseapp.com",
  projectId: "harmonix-b285b",
  storageBucket: "harmonix-b285b.firebasestorage.app",
  messagingSenderId: "92974828228",
  appId: "1:92974828228:web:26931395fe0de6601a1791",
  measurementId: "G-PX1NV2TZVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);