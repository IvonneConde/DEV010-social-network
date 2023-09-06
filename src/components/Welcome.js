import { onNavigate } from '../main.js';

export const Welcome = () => {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonLogin.textContent = 'Sing In';
  buttonRegister.textContent = 'Sing Up';
  title.textContent = 'Welcome';
  section.setAttribute('id', 'welcome-section');

  buttonLogin.addEventListener('click', () => {
    onNavigate('/Login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/Register');
  });
  section.append(title, buttonLogin, buttonRegister);
  return section;
};
