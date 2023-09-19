import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { onNavigate } from '../main.js';
import { auth } from './Firebase.js';
import { showMenssaje } from './ShowMenssaje.js';
import { serviceLogin } from '../services/authLogin.js';

export const Login = () => {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonGoogle = document.createElement('button');

  inputPass.type = 'Password';
  inputEmail.placeholder = 'Email';
  inputPass.placeholder = 'Password';
  button.textContent = 'Sing In';
  buttonBack.textContent = 'Back';
  title.textContent = 'Login';
  buttonGoogle.textContent = 'Google';

  button.addEventListener('click', async () => {
    const email = inputEmail.value;
    const password = inputPass.value;

    try {
      await serviceLogin(email, password);
      onNavigate('/StartPage');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        // El correo electrónico ya está en uso, muestra un mensaje al usuario
        showMenssaje('Incorrect password', 'error');
      } else if (error.code === 'auth/invalid-email') {
        showMenssaje('invalid Email', 'error');
      }
    }
  });

  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  buttonGoogle.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    //signInWithPopup(auth, provider);

    try {
      await signInWithPopup(auth, provider);
      onNavigate('/StartPage');
    } catch (error) {
      showMenssaje('Error Popup', 'error');
    }
  });

  section.append(title, buttonGoogle, inputEmail, inputPass, button, buttonBack);
  return section;
};
