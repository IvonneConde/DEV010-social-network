/**
 * @jest-environment jsdom
 */
import { fireEvent } from '@testing-library/dom';
import { query } from 'firebase/firestore';
import { StartPage } from '../src/components/StartPage.1';
import { showMenssaje } from '../src/components/ShowMenssaje.js';
import { onNavigate } from '../src/main.js';
import { onGetPost, saveLike, unlike } from '../src/components/Firebase';

jest.mock('../src/main.js', () => ({ onNavigate: jest.fn() }));
jest.mock('../src/components/ShowMenssaje.js', () => ({ showMenssaje: jest.fn() }));
jest.mock('firebase/firestore', () => ({
  __esModule: true,
  collection: jest.fn(),
  getFirestore: jest.fn(),
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
      // Agrega más datos de prueba según sea necesario
    ];
    return callback(onSnapshot);
  }),
}));
test('debería crear la sección principal con la clase "startPageSection"', () => { // prueba para verificar si crea correcto el elemnto
  const startPage = StartPage(); // Llama a la función StartPage para obtener el elemento
  expect(startPage.classList.contains('startPageSection')).toBe(true);
});
