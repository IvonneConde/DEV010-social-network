import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/Firebase';

const serviceRegister = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export { serviceRegister };
