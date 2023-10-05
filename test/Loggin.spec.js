/**
 * @jest-environment jsdom
 */
import { fireEvent } from '@testing-library/dom';
import { serviceLogin } from '../src/services/authLogin';
import { Login } from '../src/components/Login.js';
import { showMenssaje } from '../src/components/ShowMenssaje.js';
import { onNavigate } from '../src/main.js';
// Mockeos
jest.mock('../src/services/authLogin', () => ({
  serviceLogin: jest.fn().mockImplementation(() => Promise.resolve(true)),
}));
jest.mock('../src/main.js', () => ({ onNavigate: jest.fn() }));
jest.mock('../src/components/ShowMenssaje.js', () => ({ showMenssaje: jest.fn() }));

describe('Loggin test', () => {
  test('Should log in with valid email and password', async () => {
    const login = Login();
    document.body.appendChild(login);

    const emailInput = document.querySelector('input[placeholder="Email"]');
    const passwordInput = document.querySelector('input[placeholder="Password"]');
    const button = document.getElementById('SignIn');

    // Simula la entrada de valores en los campos de entrada
    fireEvent.input(emailInput, { target: { value: 'ivone@gmail.com' } });
    fireEvent.input(passwordInput, { target: { value: '123456' } });
    fireEvent.click(button);

    // Llama a la función de inicio de sesión y espera el resultado
    const resultado = await serviceLogin(emailInput.value, passwordInput.value);

    expect(resultado).toBe(true);
  });
});
test('error auth wrong-password', () => {
  const login = Login();
  document.body.appendChild(login);
  const mockError = {
    code: 'auth/wrong-password',
  };
  serviceLogin.mockRejectedValueOnce(mockError);
  document.getElementById('SignIn').click();
  serviceLogin().catch(() => {
    expect(showMenssaje).toHaveBeenCalledWith("Incorrect password', 'error");
  });
});

test('invalid Email', () => {
  const login = Login();
  document.body.appendChild(login);
  const mockError = {
    code: 'auth/invalid-email',
  };
  serviceLogin.mockRejectedValueOnce(mockError);
  document.getElementById('SignIn').click();
  serviceLogin().catch(() => {
    expect(showMenssaje).toHaveBeenCalledWith("invalid Email', 'error");
  });
});

test('invalid Login Credentials', () => {
  const login = Login();
  document.body.appendChild(login);
  const mockError = {
    code: 'auth/invalid-login-credentials',
  };
  serviceLogin.mockRejectedValueOnce(mockError);
  document.getElementById('SignIn').click();
  serviceLogin().catch(() => {
    expect(showMenssaje).toHaveBeenCalledWith("invalid Login Credentials', 'error");
  });
});
describe('Loggin test onavigate', () => {
  test('Should navigate to "/" when "Back" button is clicked', async () => {
    const login = Login();
    document.body.appendChild(login);

    const button = document.getElementById('Back');
    fireEvent.click(button);

    // Verifica que la función onNavigate haya sido llamada con '/' como argumento
    expect(onNavigate).toHaveBeenCalledWith('/');
  });
});
