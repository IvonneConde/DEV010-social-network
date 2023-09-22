import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/Firebase.js';
import { onNavigate } from '../main.js';

// Función para actualizar el nombre del usuario en la interfaz de usuario
const updateName = function updateUserNameInUI(name) {
  // Puedes utilizar 'name' para mostrarlo en tu interfaz de usuario
  // Por ejemplo, actualizando un elemento HTML con el nombre del usuario
  const usernameDiv = document.getElementById('usernameDiv');
  if (usernameDiv) {
    usernameDiv.textContent = `Logged in as: ${name}`;
  }
};

// Observar cambios en el estado de autenticación del usuario
// evento para actualizar la interfaz de usuario
const inspect = onAuthStateChanged(auth, (user) => {
  if (user) {
    // Si el usuario está autenticado (ha iniciado sesión)
    const ShowUserName = user.displayName; // Asigna el valor de user.displayName a ShowUserName

    updateName(ShowUserName);
  } else {
    // Si el usuario no está autenticado (ha cerrado sesión o no ha iniciado sesión)
    onNavigate('/'); // Redirigir al usuario a la página de inicio de sesión
  }
});
export { updateName, inspect };
