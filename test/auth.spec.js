/**
 * @jest-environment jsdom
 */
import { Register } from '../src/components/Register.js';

jest.mock('../src/main.js');

describe('Test for register', () => {
  test('is a  function', () => {
    expect(typeof Register).toBe('function');
  });
});
