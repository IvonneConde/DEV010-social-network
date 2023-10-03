import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
  button.textContent = 'Sign In';
  buttonBack.textContent = 'Back';
  title.textContent = 'Login';
  buttonGoogle.textContent = 'Sign in with Google';
  buttonGoogle.classList.add('btnGoogle');

  button.addEventListener('click', async () => {
    const email = inputEmail.value;
    const password = inputPass.value;

    try {
      await serviceLogin(email, password);
      onNavigate('/StartPage');
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/wrong-password') {
        // El correo electrónico ya está en uso, muestra un mensaje al usuario
        showMenssaje('Incorrect password', 'error');
      } else if (error.code === 'auth/invalid-email') { // auth/invalid-login-credentials
        showMenssaje('invalid Email', 'error');
      } else if (error.code === 'auth/invalid-login-credentials') { //
        showMenssaje('invalid Login Credentials', 'error');
      }
    }
  });

  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  buttonGoogle.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();

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
