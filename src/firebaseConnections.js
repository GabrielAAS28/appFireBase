
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage"


const firebaseConfig = {
  apiKey: "AIzaSyAFIYozjjUAKXhFxCee5KO4eamVWQgynmc",
  authDomain: "devcurso-6964b.firebaseapp.com",
  projectId: "devcurso-6964b",
  storageBucket: "devcurso-6964b.firebasestorage.app",
  messagingSenderId: "326767993907",
  appId: "1:326767993907:web:89cee5c6be12d26b5daf46"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
})

export { db, auth };