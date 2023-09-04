import { onNavigate } from '../main.js';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './Firebase.js';
import { async } from 'regenerator-runtime';

export const Login = () => {
  const div = document.createElement('div');
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

  button.addEventListener('click', () => {
    onNavigate('/');
  });
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });
  buttonGoogle.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)

    try {
      const credentials = await signInWithPopup(auth, provider)
      onNavigate('/StartPage');
    } catch(error) {
      console.log(error)
    }
  });

  div.append(title, buttonGoogle, inputEmail, inputPass, button, buttonBack,);
  return div;
};
