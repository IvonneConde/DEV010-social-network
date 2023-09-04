import { createUserWithEmailAndPassword } from 'firebase/auth';
import { onNavigate } from '../main.js';
import { auth } from './Firebase.js';

export const Register = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const firstName = document.createElement('input');
  const lastName = document.createElement('input');
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');

  inputPass.type = 'Password';
  inputEmail.placeholder = 'Email';
  inputPass.placeholder = 'Password';
  button.textContent = 'Sing Up';
  buttonBack.textContent = 'Back';
  title.textContent = 'Registrar';
  firstName.placeholder = 'First Name';
  lastName.placeholder = 'Last Name';

  button.addEventListener('click', async () => {
    const email = inputEmail.value;
    const password = inputPass.value;
    // console.log(email.value, password.value);

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredentials);
      onNavigate('/StartPage');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // El correo electrónico ya está en uso, muestra un mensaje al usuario
        alert('El correo electrónico ya está en uso. Por favor, utilice otro correo electrónico.');
      } else {
        // Otro error, muestra un mensaje de error genérico o registra el error en la consola
        console.error(error);
      }
    }
  });

  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  div.append(title, firstName, lastName, inputEmail, inputPass, button, buttonBack);
  return div;
};
