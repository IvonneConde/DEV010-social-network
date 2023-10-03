//import { auth } from './Firebase.js';
import { verify } from '../services/authVerificar.js';
import { onNavigate } from '../main.js';
import { showMenssaje } from './ShowMenssaje.js';
import { serviceRegister } from '../services/authServices.js';

export const Register = () => {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const welcomeReg = document.createElement('p');
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputUsername = document.createElement('input'); // Campo para el nombre de usuario

  inputPass.type = 'password';
  inputEmail.placeholder = 'Email';
  inputPass.placeholder = 'Password';
  inputUsername.placeholder = 'Username'; // Campo para el nombre de usuario
  inputUsername.id = 'username';
  button.textContent = 'Sign Up';
  button.id = 'button';
  buttonBack.textContent = 'Back';
  title.textContent = 'Create Account';
  welcomeReg.textContent = 'We\'re glad you\'re here';

  button.addEventListener('click', async () => {
    const email = inputEmail.value;
    const password = inputPass.value;
    const username = inputUsername.value; // Obtener el nombre de usuario

    // Verificar que se haya ingresado un nombre de usuario
    if (!username) {
      showMenssaje('Please enter a username', 'error');
      return; // Salir de la función si no se ingresó un nombre de usuario
    }

    try {
      const userCredentials = await serviceRegister(email, password, username);
      showMenssaje(`we send an email ${userCredentials.user.email}`);
      verify(userCredentials.user);
      onNavigate('/StartPage');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMenssaje('User in use', 'error');
      } else if (error.code === 'auth/missing-password') {
        showMenssaje('Enter your password', 'error');
      } else if (error.code === 'auth/weak-password') {
        showMenssaje('password more than 6 characters', 'error');
      } else if (error.code === 'auth/invalid-email') {
        showMenssaje('Email invalid', 'error');
      } else if (error.code === 'auth/invalid-username') {
        showMenssaje('Username invalid', 'error');
      }
    }
  });

  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  section.append(title, welcomeReg, inputEmail, inputPass, inputUsername, button, buttonBack);
  return section;
};
