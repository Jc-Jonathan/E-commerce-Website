
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnZxlRFBLGLUdUbDqpKRONXE9hD7Ny754",
  authDomain: "urben-strides-adminlogin.firebaseapp.com",
  projectId: "urben-strides-adminlogin",
  storageBucket: "urben-strides-adminlogin.firebasestorage.app",
  messagingSenderId: "476781832437",
  appId: "1:476781832437:web:d718e686c9917765453dbc",
  measurementId: "G-J4NYWPMP48"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);