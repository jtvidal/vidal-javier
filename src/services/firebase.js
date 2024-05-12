// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLaZ3hLWw0GNDKxR5SKBlsTGxq_J_SRyY",
  authDomain: "vidal-javier-cwm-parcial-1.firebaseapp.com",
  projectId: "vidal-javier-cwm-parcial-1",
  storageBucket: "vidal-javier-cwm-parcial-1.appspot.com",
  messagingSenderId: "47673900751",
  appId: "1:47673900751:web:d140a3c8ca387cb99241ba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
