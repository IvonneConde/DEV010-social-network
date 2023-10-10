/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent } from '@testing-library/dom'; // se utiliza en pruebas unitarias para simular eventos en elementos del DOM.
import { sendEmailVerification } from 'firebase/auth';
import { verify } from '../src/services/authVerificar.js';
import { Register } from '../src/components/Register.js';
import { serviceRegister } from '../src/services/authServices.js';
import { showMenssaje } from '../src/components/ShowMenssaje.js';
import { onNavigate } from '../src/main.js';

jest.mock('firebase/auth', () => ({ sendEmailVerification: jest.fn() })); // Mock de sendEmailVerification
jest.mock('../src/main.js', () => ({ onNavigate: jest.fn() }));
// jest.mock('../src/services/authVerificar.js', () => ({ verify: jest.fn() }));
jest.mock('../src/services/authServices.js', () => ({
  serviceRegister: jest.fn().mockImplementation(() => Promise.resolve({})),
}));

jest.mock('../src/components/ShowMenssaje.js', () => ({ showMenssaje: jest.fn() }));
jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock de console.log

describe('Register Component', () => {
  test('Clicking the button without a username should show an error message', async () => {
    const register = Register(); // Crea una instancia del componente Register
    document.body.appendChild(register); // Agrega el componente al DOM
    document.querySelector('#username').value = '';
    const button = document.getElementById('button'); // Encuentra el botón
    // Verificar que el mensaje de error se muestre correctamente
    // Disparar el evento de clic en el botón sin ingresar un nombre de usuario
    fireEvent.click(button);
    expect(showMenssaje).toHaveBeenCalledWith('Please enter a username', 'error');
  });
});

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
