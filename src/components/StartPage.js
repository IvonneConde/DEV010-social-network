import { signOut } from 'firebase/auth';
import { onNavigate } from '../main.js';
import {
auth, post, getPost, onGetPost, detelePost, getEdit, updatePost,
} from './Firebase.js';
import { showMenssaje } from './ShowMenssaje.js';

export const StartPage = () => {
  const section = document.createElement('section');
  let editStatus = false;
  let id = '';

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

  // window.addEventListener('DOMContentLoaded', async () => {
  onGetPost((querySnapshot) => { // Publica en tiempo real
    let posthtml = '';
    querySnapshot.forEach((doc) => { // Recorre y publica todo lo que está en la base de datos
      const postData = doc.data();
      posthtml += ` 
        <section class='post'>
        <p>${postData.textDescription}</p>

        <button class='btn-delete' data-id = '${doc.id}'>Delete</button>
        <button class='btn-edit' data-id = '${doc.id}'>Edit</button>
        </section>`;
    });

    container.innerHTML = posthtml;
    const btnDelete = container.querySelectorAll('.btn-delete');
    btnDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        detelePost(dataset.id);
      });
    });
    const btnEdit = container.querySelectorAll('.btn-edit');
    btnEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getEdit(e.target.dataset.id);
        const postE = doc.data();
        const textDescription = document.getElementById('textDescription');
        textDescription.value = postE.textDescription;
        editStatus = true;
        id = doc.id;
        buttonSave.innerText = 'Update';
      });
    });
  });
  // });

  buttonSave.addEventListener('click', (e) => {
    e.preventDefault();
    const textDescription = document.getElementById('textDescription');
    // post(textDescription.value);
    if (!editStatus) {
      post(textDescription.value);
      console.log(textDescription);
    } else {
      updatePost(id, {
        textDescription: textDescription.value,
      });

      editStatus = false;
    }

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
