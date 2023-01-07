// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKi7V_U0O9Cj9iqovT60iK96xf_Yow3YE",
  authDomain: "classroom-9a33e.firebaseapp.com",
  projectId: "classroom-9a33e",
  storageBucket: "classroom-9a33e.appspot.com",
  messagingSenderId: "353114882525",
  appId: "1:353114882525:web:7fc1badf4159bdce873634"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage=getStorage()