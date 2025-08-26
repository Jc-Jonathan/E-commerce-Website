import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzaMOji8PmbpnfMmOU0CEMe0SWdnB39_U",
  authDomain: "admin-dashboard-b8cca.firebaseapp.com",
  projectId: "admin-dashboard-b8cca",
  storageBucket: "admin-dashboard-b8cca.firebasestorage.app",
  messagingSenderId: "812776606951",
  appId: "1:812776606951:web:6c3f948344deba5d5da642",
  measurementId: "G-RNNYS6SDDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

