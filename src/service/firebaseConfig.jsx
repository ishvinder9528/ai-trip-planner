// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-travel-planner-a358c.firebaseapp.com",
  projectId: "ai-travel-planner-a358c",
  storageBucket: "ai-travel-planner-a358c.firebasestorage.app",
  messagingSenderId: "575815020280",
  appId: "1:575815020280:web:f1d9e2c3dc80669165550d",
  measurementId: "G-XFCSPSF2GL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);