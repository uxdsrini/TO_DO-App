import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCi3WTA4u5CQz39WRwSlXjriPf2zppWE6k",
  authDomain: "to-do-listing-91f43.firebaseapp.com",
  projectId: "to-do-listing-91f43",
  storageBucket: "to-do-listing-91f43.firebasestorage.app",
  messagingSenderId: "598739777633",
  appId: "1:598739777633:web:1b161f36faf9af8a29d220"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);