// Import the functions you need from the SDKs you need
// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe2--AFW1lq2W70MfznG25Na0Lwyjhbfw",
  authDomain: "n24arts1.firebaseapp.com",
  projectId: "n24arts1",
  storageBucket: "n24arts1.firebasestorage.app",
  messagingSenderId: "549702158609",
  appId: "1:549702158609:web:90bfd4d65d4191529024b0",
  measurementId: "G-QYB3GXF1DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 👈 initialize Firestore
const analytics = getAnalytics(app);

export { db, analytics };
