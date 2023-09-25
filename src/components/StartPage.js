import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';
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

  // Crear un elemento <div> para mostrar el nombre de usuario
  const usernameDiv = document.createElement('div');
  usernameDiv.id = 'usernameDiv'; // Asignar un ID para actualizar su contenido
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
      const postUser = postData.username; // Obtener el nombre de usuario de la publicación
      posthtml += ` 
        <section class='post'>
        <div class='user-info'>
        <p>User: ${postUser}</p>
        <input class= 'prueba' type='text' id= '${doc.id}'/>       
        </div>
        <p>${postData.textDescription}</p>
        ${
  auth.currentUser.email === postData.email ? `<button class='btn-delete' data-id = '${doc.id}'>Delete</button>
          <button class='btn-edit' data-id = '${doc.id}'>Edit</button> 
          <button class='btn-update' data-id = '${doc.id}'>update</button>` : ''
}
       
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
        const input = document.getElementById(e.target.dataset.id);
        const doc = await getEdit(e.target.dataset.id);
        const postE = doc.data();
        const textDescription = document.getElementById('textDescription');
        textDescription.value = postE.textDescription;
        input.value = postE.textDescription;
        editStatus = true;
        id = doc.id;
        buttonSave.innerText = 'Update';
      });
    });
  });
  // });

  buttonSave.addEventListener('click', (e) => {
    e.preventDefault(); // Asegura que el formulario no se envíe ni se recargue la página
    const textDescription = document.getElementById('textDescription');
    if (textDescription === '') {
      showMenssaje('Please write a post');
      return; // Salir de la función sin realizar la publicación o actualización
    }

    if (!editStatus) {
      const user = auth.currentUser; // Aquí se obtiene el objeto de usuario actualmente autenticado
      const username = user ? user.displayName : 'Anonymous'; // Se verifica si hay un usuario autenticado (user) y, si es así, se obtiene su nombre de usuario (displayName)
      post(textDescription.value, username); // Llama a la función post con dos argumentos
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
