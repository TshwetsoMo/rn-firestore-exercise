// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJkF4cG9D0k7IWy5rnI9egs_wgunjzdps",
  authDomain: "bucketlistapp-b4ac4.firebaseapp.com",
  projectId: "bucketlistapp-b4ac4",
  storageBucket: "bucketlistapp-b4ac4.firebasestorage.app",
  messagingSenderId: "143538895797",
  appId: "1:143538895797:web:18d93e2ab08a50996d37fc",
  measurementId: "G-SL0BKSL2LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db = getFirestore(app);
