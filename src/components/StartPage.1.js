import { signOut } from 'firebase/auth';
import { onNavigate } from '../main.js';
import {
  auth, post, onGetPost, detelePost, getEdit, updatePost, updateLike,
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
  textarea.placeholder = 'Ask the pet-loving community';
  const buttonSave = document.createElement('button');
  buttonSave.textContent = 'Publish';

  // window.addEventListener('DOMContentLoaded', async () => {
  onGetPost((querySnapshot) => {
    let posthtml = '';
    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      const postUser = postData.username; // Obtener el nombre de usuario de la publicación
      posthtml += ` 
        <section class='post'>
        <div class='user-info'>
        <p>${postUser}</p>     
        </div>
        <p class='postText' id='post-text-${doc.id}'>${postData.textDescription}</p>
        ${auth.currentUser.email === postData.email
    ? `<div class='btn-container'><button class='btn-delete' data-id = '${doc.id}' data-username = '${postUser}'></button>
          <button class='btn-edit' data-id = '${doc.id}'></button> 
          <button class='btn-update' data-id = '${doc.id}'></button></div>` : ''}
          <div class='like-container'>
          <button class='btn-like' data-postid ='${doc.id}'></button>
          </div>
        </section>`;
    });

    container.innerHTML = posthtml;
    const btnLike = container.querySelectorAll('.btn-like');
    btnLike.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        // console.log(dataset.postid, auth.currentUser.email);
        updateLike(dataset.postid, auth.currentUser.email).then((res) => {
          // console.log('ok');
        });
      });
    });
    const btnDelete = container.querySelectorAll('.btn-delete');
    btnDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        const deletePost = confirm('Are you sure you want to delete this?');
        // const username = btnDelete.getAttribute('data-username');
        if (deletePost) {
          detelePost(dataset.id);
        } else {
          showMenssaje(`ok ${dataset.username}`);
        }
      });
    });
    const btnEdit = container.querySelectorAll('.btn-edit');
    btnEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getEdit(e.target.dataset.id);
        const postE = doc.data();
        const postText = document.getElementById(`post-text-${doc.id}`);
        postText.contentEditable = 'true'; // Hace que el texto sea editable
        postText.focus(); // Coloca el cursor en el texto editable
        editStatus = true;
        id = doc.id;
        buttonSave.innerText = 'Publish';
      });
    });

    const btnUpdate = container.querySelectorAll('.btn-update');
    btnUpdate.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const postIdToUpdate = e.target.dataset.id;
        const postText = document.getElementById(`post-text-${postIdToUpdate}`);
        const textDescriptionToUpdate = postText.innerText;

        // Actualiza el post en Firebase con los datos nuevos
        await updatePost(postIdToUpdate, {
          textDescription: textDescriptionToUpdate,
        });

        // Desactiva la edición y restaura el botón a "Edit"
        postText.contentEditable = 'false';
        editStatus = false;
        id = '';
        buttonSave.innerText = 'Publish';
      });
    });
  });

  buttonSave.addEventListener('click', (e) => {
    e.preventDefault(); // Asegura que el formulario no se envíe ni se recargue la página
    const textDescription = document.getElementById('textDescription');
    if (textDescription.value.trim() === '') {
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
      // Actualizar también el input en lugar del textarea
      const input = document.getElementById(id);
      input.value = textDescription.value;

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
