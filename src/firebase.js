// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3wFN0sRXr6386vq5ipccELI8_boFBqu0",
  authDomain: "chat-57348.firebaseapp.com",
  projectId: "chat-57348",
  storageBucket: "chat-57348.appspot.com",
  messagingSenderId: "711108553727",
  appId: "1:711108553727:web:b4be3afedaa183d9cb15ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();