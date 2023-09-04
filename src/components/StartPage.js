export const StartPage = () => {
  const title = document.createElement('h1');
  const div = document.createElement('div');

  title.textContent = 'Bienvenidos';
  div.append(title);
  return div;
};