import { createUserWithEmailAndPassword } from 'firebase/auth';
import { onNavigate } from '../main.js';
import { auth } from './Firebase.js';

export const Register = () => {
  const section = document.createElement('section');
  const title = document.createElement('h2');
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
      } else if (error.code === 'auth/weak-password') {
        alert('La contraseña debe tener más de 6 carácteres');
      } else if (error.code === 'auth/invalid-email') {
        alert('Email inválido');
      }
    }
  });

  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  section.append(title, inputEmail, inputPass, button, buttonBack);
  return section;
};
