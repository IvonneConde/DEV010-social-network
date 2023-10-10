/**
 * @jest-environment jsdom
 */

import { fireEvent, waitFor } from '@testing-library/dom';
import { StartPage } from '../src/components/StartPage.1';
import { auth } from '../src/components/Firebase';
import * as Fire from '../src/components/Firebase';

jest.mock('../src/main.js', () => ({ onNavigate: jest.fn() }));
jest.mock('../src/components/ShowMenssaje.js', () => ({ showMenssaje: jest.fn() }));
jest.mock('firebase/firestore', () => ({
  __esModule: true,
  query: jest.fn(),
  collection: jest.fn(),
  getFirestore: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn((query, callback) => {
    const onSnapshot = [
      {
        id: '1',
        data: () => ({
          username: 'cyntia',
          photoURL: 'url1',
          textDescription: 'hola mi perrito no come',
          email: 'cyntia@gmail.com',
          like: ['cyntia@gmail.com'],
        }),
      },
    ];
    return callback(onSnapshot);
  }),
}));

test('debería crear la sección principal con la clase "startPageSection"', () => { // prueba para verificar si crea correcto el elemnto
  const startPage = StartPage(); // Llama a la función StartPage para obtener el elemento
  expect(startPage.classList.contains('startPageSection')).toBe(true);
});

describe('test unlike o SaveLike', () => {
  test('test unlike o savelike', async () => {
    const starpage = StartPage();
    document.body.appendChild(starpage);
    // Espera a que el botón con la clase '.btn-like' esté en el DOM
    const buttonToLike = await waitFor(() => document.getElementsByClassName('btn-like')[0]);
    // Accede al atributo data-postid del botón
    buttonToLike.dataset.postid = '1';
    // Configura el usuario actual autenticado
    auth.currentUser = { email: 'cyntia@gmail.com' };
    // Espía la función saveLike del módulo Firebase
    const saveLikeSpy = jest.spyOn(Fire, 'saveLike').mockResolvedValue({});
    const unLikeSpy = jest.spyOn(Fire, 'unlike').mockResolvedValue({});
    // Realiza la acción en el botón like
    fireEvent.click(buttonToLike);
    // Verifica si la función saveLike se ha llamado con los argumentos correctos
    expect(saveLikeSpy).not.toEqual(unLikeSpy);
    // Restaura la función espía después de la prueba
    saveLikeSpy.mockRestore();
    unLikeSpy.mockRestore();
  });
});

describe('Delete post', () => {
  test('delete post', async () => {
    const starpage = StartPage();
    document.body.appendChild(starpage);
    // Espera a que el botón con la clase '.btn-delete' esté en el DOM
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true); // Simula confirmación positiva
    const buttonToLike = await waitFor(() => document.getElementsByClassName('btn-delete')[0]);
    // Accede al atributo data-id del botón
    buttonToLike.dataset.id = '1';
    // Espía la función delete del módulo Firebase
    const deletePostSpyon = jest.spyOn(Fire, 'deletePost').mockResolvedValue({});
    // Realiza la acción en el botón like
    fireEvent.click(buttonToLike);
    // Verifica si la función deletePost se ha llamado con los argumentos correctos
    expect(deletePostSpyon).toHaveBeenCalled();
    // Restaura la función espía después de la prueba
    deletePostSpyon.mockRestore();
    confirmSpy.mockRestore();
  });
});

describe('Edit post', () => {
  test('Edit post', async () => {
    const starpage = StartPage();
    document.body.appendChild(starpage);

    // Espera a que el botón con la clase '.btn-edit' esté en el DOM
    const buttonEdit = await waitFor(() => document.getElementsByClassName('btn-edit')[0]);
    // Accede al atributo data-id del botón
    buttonEdit.dataset.id = '1';
    // Espía la función delete del módulo Firebase
    const editPostSpyon = jest.spyOn(Fire, 'getEdit').mockResolvedValue({});
    // Realiza la acción en el botón like
    fireEvent.click(buttonEdit);
    // Verifica si la función deletePost se ha llamado con los argumentos correctos
    expect(Fire.getEdit).toHaveBeenCalledWith('1');
    // Restaura la función espía después de la prueba
    editPostSpyon.mockRestore();
  });
});

describe('update post', () => {
  test('update post', async () => {
    const starpage = StartPage();
    document.body.appendChild(starpage);
    // Espera a que el botón con la clase '.btn-update' esté en el DOM
    const buttonUpdate = await waitFor(() => document.getElementsByClassName('btn-update')[0]);
    // Accede al atributo data-id del botón
    buttonUpdate.dataset.id = '1';
    // Espía la función delete del módulo Firebase
    const updatePostSpyon = jest.spyOn(Fire, 'updatePost').mockResolvedValue({});
    // Realiza la acción en el botón like
    fireEvent.click(buttonUpdate);
    // Verifica si la función deletePost se ha llamado con los argumentos correctos
    expect(updatePostSpyon).toHaveBeenCalled();
    // Restaura la función espía después de la prueba
    updatePostSpyon.mockRestore();
  });
});
