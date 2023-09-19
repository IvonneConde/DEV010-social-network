// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1ELajubLUPKuRqd7BO1OL-Doh40emZfQ",
  authDomain: "prueba-41bf2.firebaseapp.com",
  projectId: "prueba-41bf2",
  storageBucket: "prueba-41bf2.appspot.com",
  messagingSenderId: "82399426981",
  appId: "1:82399426981:web:5fda8d509594688dc7d04c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore();
export const post = (textDescription) => addDoc(collection(db, 'postSave'), { textDescription });
export const getPost = () => getDocs(collection(db, 'postSave'));
export const onGetPost = (callback) => onSnapshot(collection(db, 'postSave'), callback);
export const detelePost = (id) => deleteDoc(doc(db, 'postSave', id));
export const getEdit = (id) => getDoc(doc(db, 'postSave', id));
export const updatePost = (id, newFields) => updateDoc(doc(db, 'postSave', id), newFields);
