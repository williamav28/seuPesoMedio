// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Esses dados você pega no console do Firebase, em "Configurações do projeto"
const firebaseConfig = {
  apiKey: "AIzaSyBJxqLPEBB-sErOvYtjOC1UQDI9CnR8P4c",
  authDomain: "calculadorapesomedio.firebaseapp.com",
  projectId: "calculadorapesomedio",
  storageBucket: "calculadorapesomedio.firebasestorage.app",
  messagingSenderId: "346625128876",
  appId: "1:346625128876:web:9bebc9e0ccab28e7332209",
  measurementId: "G-DS4Q72C3DB",
};

const app = initializeApp(firebaseConfig);

// Exporta os serviços que você vai usar
export const auth = getAuth(app);
export const db = getFirestore(app);
