import { signOut } from 'firebase/auth';
import { onNavigate } from '../main.js';
import { auth, post, getPost, onGetPost } from './Firebase.js';
import { showMenssaje } from './ShowMenssaje.js';

export const StartPage = () => {
  const section = document.createElement('section');
  section.classList.add('startPageSection');

  // Crear el elemento <header> y agregar el botón "Log out"
  const header = document.createElement('header');
  header.classList.add('startPageHeader'); // Agrega una clase personalizada
  const logOut = document.createElement('button');
  logOut.classList.add('LogOutButton');
  logOut.textContent = 'Log out';
  header.appendChild(logOut);

  // Crear el elemento <img>
  const logo = document.createElement('img');
  logo.classList.add('logo');
  logo.src = ('../imagenes/logo.png');
  logo.alt = 'Logo'; // Agrega un texto alternativo para accesibilidad
  header.appendChild(logo); // Agregar el logotipo como hijo de header

  // Crear el elemento <textarea> y el botón "Publish"
  const container = document.createElement('container');
  container.id = 'containerPost';
  const textarea = document.createElement('textarea');
  textarea.id = 'textDescription';
  textarea.placeholder = 'Write your text here';
  const buttonSave = document.createElement('button');
  buttonSave.textContent = 'Publish';

  window.addEventListener('DOMContentLoaded', async () => {
    onGetPost((querySnapshot) => { // Publica en tiempo real
      let posthtml = '';
      querySnapshot.forEach(doc => { // Recorre y publica todo lo que está en la base de datos
        const postData = doc.data();
        posthtml += ` 
        <section>
        <p>${postData.textDescription}</p>
        </section>`;
      });

      container.innerHTML = posthtml;
    });
  });

  buttonSave.addEventListener('click', (e) => {
    e.preventDefault();
    const textDescription = document.getElementById('textDescription');
    post(textDescription.value);
    textDescription.value = ' ';
  });

  logOut.addEventListener('click', () => {
    signOut(auth).then(() => {
      onNavigate('/');
    }).catch((error) => {
      showMenssaje('error the logout', error);
    });
  });

  section.append(header, textarea, buttonSave, container);

  return section;
};
