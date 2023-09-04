import { Welcome } from './components/Welcome.js';
import { Login } from './components/Login.js';
import { Register } from './components/Register.js';
import { StartPage } from './components/StartPage.js'; 

const root = document.getElementById('root');
const routes = {
  '/': Welcome,
  '/Login': Login,
  '/Register': Register,
  '/StartPage': StartPage,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.removeChild(root.firstChild);
  root.appendChild(routes[pathname]());
};

const component = routes[window.location.pathname];
window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component());
};
root.appendChild(component());
