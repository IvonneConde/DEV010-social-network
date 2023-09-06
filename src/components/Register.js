import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { onNavigate } from '../main.js';
import { auth } from './Firebase.js';
import { showMenssaje } from './ShowMenssaje.js';

export const Register = () => {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const welcomeReg = document.createElement('p');
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');

  inputPass.type = 'Password';
  inputEmail.placeholder = 'Email';
  inputPass.placeholder = 'Password';
  button.textContent = 'Sing Up';
  buttonBack.textContent = 'Back';
  title.textContent = 'Create Account';
  welcomeReg.textContent = 'We\'re glad you\'re here';

  button.addEventListener('click', async () => {
    const email = inputEmail.value;
    const password = inputPass.value;
    // console.log(email.value, password.value);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      //console.log(userCredentials);
      showMenssaje(`we send an email ${userCredentials.user.email}`);
      sendEmailVerification(auth.currentUser);
      // onNavigate('/StartPage');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // El correo electrónico ya está en uso, muestra un mensaje al usuario
        showMenssaje('Email already in use', 'error');
      } else if (error.code === 'auth/weak-password') {
        showMenssaje('password more than 6 characters', 'error');
      } else if (error.code === 'auth/invalid-email') {
        showMenssaje('Email invalid', 'error');
      }
    }
  });

  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  section.append(title, welcomeReg, inputEmail, inputPass, button, buttonBack);
  return section;
};
