import { signOut } from 'firebase/auth';
import { onNavigate } from '../main.js';
import { auth } from './Firebase.js';
import { showMenssaje } from './ShowMenssaje.js';

export const StartPage = () => {
  const title = document.createElement('h1');
  const div = document.createElement('section');
  const logOut = document.createElement('button');

  title.textContent = 'Bienvenidos';
  logOut.textContent = 'Log out';

  logOut.addEventListener('click', () => {
    signOut(auth).then(() => {
      onNavigate('/');
    }).catch((error) => {
      showMenssaje('error the logout', error);
    });
  });
  div.append(title, logOut);
  return div;
};
