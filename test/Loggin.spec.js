import { signInWithEmailAndPassword } from 'firebase/auth';

// const mockSignInWithEmailAndPassword = ('src/components/Login.js'), ({serviceLogin: mockSignInWithEmailAndPassword});

// signInWithEmailAndPassword.mockImplementation(async (email, password) => Promise.resolve(true));

describe('Loggin test', () => {
  test('Should loggin with valid email and password', async () => { // validar que se inicie sesión con email y pass válidos
    const email = 'ivonneconde91@gmail.com';
    const password = 'contraseña';
    const resultado = await signInWithEmailAndPassword(email, password);

    expect(resultado).toBe(true);
  });
});
