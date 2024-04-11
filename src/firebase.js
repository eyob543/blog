import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVjR2OjaOXMgfD0X-R0bzYV2sq9S4jFo0",
  authDomain: "blogapp-f8f6f.firebaseapp.com",
  databaseURL: "https://blogapp-f8f6f-default-rtdb.firebaseio.com",
  projectId: "blogapp-f8f6f",
  storageBucket: "blogapp-f8f6f.appspot.com",
  messagingSenderId: "413784176623",
  appId: "1:413784176623:web:b041b5af4d1cd1d927e81a",
  measurementId: "G-1G9Q7JSFN7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;
