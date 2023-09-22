import { onNavigate } from '../main.js';

export const Welcome = () => {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonLogin.textContent = 'Sign In';
  buttonRegister.textContent = 'Sign Up';
  title.textContent = 'Welcome';
  title.classList.add('title');
  section.setAttribute('id', 'welcome-section');
  buttonLogin.setAttribute('id', 'button-Login');
  buttonRegister.setAttribute('id', 'button-Register');

  buttonLogin.addEventListener('click', () => {
    onNavigate('/Login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/Register');
  });
  section.append(title, buttonLogin, buttonRegister);
  return section;
};
