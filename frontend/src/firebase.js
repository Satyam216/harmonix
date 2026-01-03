// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);