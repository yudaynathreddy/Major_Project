import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDD2aY0Z4HM_xPxuQDJk5DaHdhIbyCvth4",
    authDomain: "videomanager-7ee77.firebaseapp.com",
    projectId: "videomanager-7ee77",
    storageBucket: "videomanager-7ee77.appspot.com",
    messagingSenderId: "766603533769",
    appId: "1:766603533769:web:ae3d5b1056482f50591c18",
    measurementId: "G-NEHN7MZFZF"
};
const app = initializeApp(firebaseConfig);
export const imageDB=getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()