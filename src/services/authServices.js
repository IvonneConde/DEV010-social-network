import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../components/Firebase';

// Modificar la función serviceRegister para aceptar el nombre de usuario (username)
const serviceRegister = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Después de crear el usuario, asigna el nombre de usuario (username) al usuario
    // const user = userCredential.user;
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    return userCredential; // Devuelve el userCredential actualizado con el nombre de usuario
  } catch (error) {
    throw error;
    
  }
};

export { auth, serviceRegister };
