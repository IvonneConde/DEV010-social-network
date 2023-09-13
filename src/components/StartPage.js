import { signOut } from 'firebase/auth';
import { onNavigate } from '../main.js';
import { auth } from './Firebase.js';
import { showMenssaje } from './ShowMenssaje.js';
import { post } from './Firebase.js';

export const StartPage = () => {
  const section = document.createElement('section');
  const nav = document.createElement('nav');
  const logo = document.createElement('img');
  const header = document.createElement('header');
  const textarea = document.createElement('textarea');
  const buttonSave = document.createElement('button');
  const logOut = document.createElement('button');

  logOut.textContent = 'Log out';
  logo.classList.add('logo');
  textarea.id = 'textDescription';
  textarea.placeholder = 'Write your text here';
  buttonSave.textContent = 'Publish';
  nav.appendChild(logo);

  window.addEventListener('DOMContentLoaded', () => {

  });

  buttonSave.addEventListener('click', (e) => {
    e.preventDefault();
    const textDescription = document.getElementById('textDescription');
    console.log(textDescription.value);
    post(textDescription.value);
  });

  logOut.addEventListener('click', () => {
    signOut(auth).then(() => {
      onNavigate('/');
    }).catch((error) => {
      showMenssaje('error the logout', error);
    });
  });
  section.append(header, nav, logOut, textarea, buttonSave);
  return section;
};
