import { Welcome } from './components/Welcome.js';
import { Login } from './components/Login.js';
import { error } from './components/error.js';
import { Register } from './components/Register.js';
import { StartPage } from './components/StartPage.js';
import { inspect } from './services/inspect.js';

const root = document.getElementById('root');
const routes = {
  '/': Welcome,
  '/Login': Login,
  '/Register': Register,
  '/StartPage': StartPage,
  '/error': error,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.removeChild(root.firstChild);
  root.appendChild(routes[pathname]());
  // Verifica si el pathname es '/error' y llama a onNavigate en ese caso
  /*if (pathname === '/error') {
    onNavigate('/error');
    //inspect.onNavigate('/');
  }*/
};

const component = routes[window.location.pathname];
if (typeof component === 'function') {
  root.appendChild(component()); // Llamar a "component" solo si es una función
  root.removeChild(root.firstChild);
} else {
  // Manejar el caso en el que la ruta no esté en el objeto routes
  root.appendChild(error()); // Mostrar la página de error
}

window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component());
};
root.appendChild(component());
