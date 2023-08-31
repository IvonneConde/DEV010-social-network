import { onNavigate } from '../main.js';

export const Register = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const firstName = document.createElement('input');
  const lastName = document.createElement('input');
  const email = document.createElement('input');
  const password = document.createElement('input');
  const confirmPassword = document.createElement('input');
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');

  firstName.placeholder = 'First Name';
  lastName.placeholder = 'Last Name';
  email.placeholder = 'Email';
  password.placeholder = 'Password';
  confirmPassword.placeholder = 'Confirm Password';
  title.textContent = 'Register';
  button.textContent = 'Sing In';
  buttonBack.textContent = 'Back';
  button.addEventListener('click', () => {
    onNavigate('/');
  });
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });
  div.append(title, firstName, lastName, email, password, confirmPassword, button, buttonBack);
  return div;
};