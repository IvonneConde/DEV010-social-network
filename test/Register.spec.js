/**
 * @jest-environment jsdom
 */
import Toastify from 'toastify-js';
import { sendEmailVerification } from 'firebase/auth';
import { verify } from '../src/services/authVerificar.js';
import { Register } from '../src/components/Register.js';
import { serviceRegister } from '../src/services/authServices.js';
import { showMenssaje } from '../src/components/ShowMenssaje.js';

jest.mock('firebase/auth', () => ({ sendEmailVerification: jest.fn() })); // Mock de sendEmailVerification
jest.mock('../src/main.js');
jest.mock('../src/services/authServices.js', () => ({ serviceRegister: jest.fn() }));
jest.mock('toastify-js', () => ({ Toastify: jest.fn() }));

describe('Test for register and sendEmailVerification', () => {
  test('create register and email component', () => {
    const register = Register();
    document.body.appendChild(register);
    document.querySelector('#button').click();
    expect(serviceRegister).toHaveBeenCalled();
    // Prueba para verify
    const user = {
      email: 'jazmin220906@gmail.com',
    };

    // Llama a la función verify
    verify(user);

    // Verifica si sendEmailVerification se llamó con el usuario adecuado
    expect(sendEmailVerification).toHaveBeenCalledWith(user);
  });
});


describe('Tus pruebas', () => {
  it('debería llamar a showMenssaje con el mensaje correcto', () => {
    // Llama a la función showMenssaje
    showMenssaje('Mensaje de prueba');

    // Verifica si showToast se llamó con el mensaje correcto
    expect(require('toastify-js').Toastify).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Mensaje de prueba',
      }),
    );
  });
});
