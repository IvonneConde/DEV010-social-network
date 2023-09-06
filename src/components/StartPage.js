import { onNavigate } from '../main.js';

export const StartPage = () => {
  const title = document.createElement('h1');
  const div = document.createElement('section');
  const signOut = document.createElement('button');

  title.textContent = 'Bienvenidos';
  signOut.textContent = 'sign Out';

  signOut.addEventListener('click', () => {
    onNavigate('/');
  });
  div.append(title, signOut);
  return div;
};
