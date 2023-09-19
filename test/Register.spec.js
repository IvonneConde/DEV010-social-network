/**
 * @jest-environment jsdom
 */

import { sendEmailVerification } from 'firebase/auth';
import { verify } from '../src/services/authVerificar.js';
import { Register } from '../src/components/Register.js';
import { serviceRegister } from '../src/services/authServices.js';
import { showMenssaje } from '../src/components/ShowMenssaje.js';

jest.mock('firebase/auth', () => ({ sendEmailVerification: jest.fn() })); // Mock de sendEmailVerification
jest.mock('../src/main.js');
jest.mock('../src/services/authServices.js', () => ({ serviceRegister: jest.fn() }));
jest.mock('../src/components/ShowMenssaje.js', () => ({ showMenssaje: jest.fn() }));
jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock de console.log

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

  test('testing reject at create user', async () => {
    jest.mock('../src/services/authServices.js', () => ({
      // eslint-disable-next-line prefer-promise-reject-errors
      serviceRegister: jest.fn().mockImplementation(() => Promise.reject({ code: 'auth/email-already-in-use' })),
    }));
    const error = await serviceRegister();
    console.info('error: ', error);
    expect(showMenssaje).toHaveBeenCalled();
  });
});
