import { onNavigate } from '../main.js';

export const Login = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');

  button.textContent = 'Sing In';
  buttonBack.textContent = 'Back';
  title.textContent = 'Login';
  button.addEventListener('click', () => {
    onNavigate('/');
  });
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });
  div.append(title, inputEmail, inputPass, button, buttonBack);
  return div;
};