import { onNavigate } from '../main.js';

export const Welcome = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonLogin.textContent = 'Sing In';
  buttonRegister.textContent = 'Sing Up';
  title.textContent = 'WELCOME LA MEJOR RED SOCIAL';

  buttonLogin.addEventListener('click', () => {
    onNavigate('/Login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/Register');
  });
  div.append(title, buttonLogin, buttonRegister);
  return div;
};
