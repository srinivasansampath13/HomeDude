// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDO-80htxQ7TiRZ0vpYyjyohgvZsJjLCmE',
  authDomain: 'homedude-f7c96.firebaseapp.com',
  projectId: 'homedude-f7c96',
  storageBucket: 'homedude-f7c96.firebasestorage.app',
  messagingSenderId: '492851561646',
  appId: '1:492851561646:web:86e88e07f3ad149bc3593f',
  measurementId: 'G-C2H8XB2909',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
