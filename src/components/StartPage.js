export const StartPage = () => {
  const title = document.createElement('h1');
  const div = document.createElement('section');

  title.textContent = 'Bienvenidos';
  div.append(title);
  return div;
};
