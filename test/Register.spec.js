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
jest.mock('../src/services/authServices.js', () => ({
  serviceRegister: jest.fn().mockImplementation(() => Promise.resolve({})),
}));

jest.mock('../src/components/ShowMenssaje.js', () => ({ showMenssaje: jest.fn() }));
jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock de console.log

describe('Test for register and sendEmailVerification', () => {
  test('create register and email component', () => {
    const register = Register();
    document.body.appendChild(register);
    document.querySelector('#username').value = 'jazmin';
    document.querySelector('#button').click();
    expect(serviceRegister).toHaveBeenCalled();
    // Prueba para verify
    const user = {
      email: 'jazmin220906@gmail.com',
      password: '123456',
      username: 'jazmin',

    };

    // Llama a la función verify
    verify(user);

    // Verifica si sendEmailVerification se llamó con el usuario adecuado
    expect(sendEmailVerification).toHaveBeenCalledWith(user);
  });
  test('error at create email, already in use', () => {
    const register = Register();
    document.body.appendChild(register);
    const mockError = {
      code: 'auth/email-already-in-use',
    };
    serviceRegister.mockRejectedValueOnce(mockError);
    document.querySelector('#button').click();
    serviceRegister().catch(() => {
      expect(showMenssaje).toHaveBeenCalledWith("User in use', 'error");
    });
  });
  test('Enter your password', () => {
    const register = Register();
    document.body.appendChild(register);
    const mockError = {
      code: 'auth/missing-password',
    };
    serviceRegister.mockRejectedValueOnce(mockError);
    document.querySelector('#button').click();
    serviceRegister().catch(() => {
      expect(showMenssaje).toHaveBeenCalledWith("Enter your password', 'error");
    });
  });
  test('password more than 6 characters', () => {
    const register = Register();
    document.body.appendChild(register);
    const mockError = {
      code: 'auth/weak-password',
    };
    serviceRegister.mockRejectedValueOnce(mockError);
    document.querySelector('#button').click();
    serviceRegister().catch(() => {
      expect(showMenssaje).toHaveBeenCalledWith("password more than 6 characters', 'error");
    });
  });
  test('Username invalid', () => {
    const register = Register();
    document.body.appendChild(register);
    const mockError = {
      code: 'auth/invalid-username',
    };
    serviceRegister.mockRejectedValueOnce(mockError);
    document.querySelector('#button').click();
    serviceRegister().catch(() => {
      expect(showMenssaje).toHaveBeenCalledWith("Username invalid', 'error");
    });
  });
  test('invalid email', () => {
    const register = Register();
    document.body.appendChild(register);
    const mockError = {
      code: 'auth/invalid-email',
    };
    serviceRegister.mockRejectedValueOnce(mockError);
    document.querySelector('#button').click();
    serviceRegister().catch(() => {
      expect(showMenssaje).toHaveBeenCalledWith("Email invalid', 'error");
    });
  });
});
