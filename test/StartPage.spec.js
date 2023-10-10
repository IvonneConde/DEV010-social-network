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

describe('test to savelike', () => {
  test('test savelike', async () => {
    const starpage = StartPage();
    document.body.appendChild(starpage);
    // Espera a que el botón con la clase '.btn-like' esté en el DOM
    const buttonToLike = await waitFor(() => document.getElementsByClassName('btn-like')[0]);
    // Configura el usuario actual autenticado
    auth.currentUser = { email: 'cyntia@gmail.com' };
    // Accede al atributo data-postid del botón
    buttonToLike.dataset.postid = '1';

    // Espía la función saveLike del módulo Firebase
    const saveLikeSpy = jest.spyOn(Fire, 'saveLike').mockResolvedValue({});
    // Realiza la acción en el botón like
    fireEvent.click(buttonToLike);
    // Verifica si la función saveLike se ha llamado con los argumentos correctos
    expect(saveLikeSpy).toHaveBeenCalledWith('1', auth.currentUser.email);
    // Restaura la función espía después de la prueba
    saveLikeSpy.mockRestore();
  });
});

describe('test unlike', () => {
  test('test unlike', async () => {
    const starpage = StartPage();
    document.body.appendChild(starpage);
    // Espera a que el botón con la clase '.btn-like' esté en el DOM
    const buttonToLike = await waitFor(() => document.getElementsByClassName('btn-like')[0]);
    // Configura el usuario actual autenticado
    auth.currentUser = { email: 'cyntia@gmail.com' };
    // Accede al atributo data-postid del botón
    buttonToLike.dataset.postid = '1';

    // Espía la función saveLike del módulo Firebase
    const unLikeSpy = jest.spyOn(Fire, 'unlike').mockResolvedValue({});
    // Realiza la acción en el botón like
    fireEvent.click(buttonToLike);
    // Verifica si la función saveLike se ha llamado con los argumentos correctos
    expect(unLikeSpy).toHaveBeenCalledWith('1', auth.currentUser.email);
    // Restaura la función espía después de la prueba
    unLikeSpy.mockRestore();
  });
});
