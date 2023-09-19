import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/Firebase.js';

const serviceLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

export { serviceLogin };
