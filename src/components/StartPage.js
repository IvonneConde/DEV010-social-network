import { onNavigate } from '../main.js';

export const StartPage = () => {
  const title = document.createElement('h1');
  const div = document.createElement('section');
  const logOut = document.createElement('button');

  title.textContent = 'Bienvenidos';
  logOut.textContent = 'Log out';

  logOut.addEventListener('click', () => {
    onNavigate('/');
  });
  div.append(title, logOut);
  return div;
};
