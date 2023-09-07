// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBW0ufPks5_O3-pFP48qauOLGrXTAutFeg',
  authDomain: 'social-network-hipet.firebaseapp.com',
  projectId: 'social-network-hipet',
  storageBucket: 'social-network-hipet.appspot.com',
  messagingSenderId: '801733192048',
  appId: '1:801733192048:web:4e7f9eac4fcb31500447b5',
  measurementId: 'G-3V4VJBGMZF',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
