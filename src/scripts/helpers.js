export default (coords, className = false, innerHtml = false) => {
  const element = document.createElement('div');
  if (className) element.classList.add(className);
  if (innerHtml) element.innerHTML = innerHtml;
  element.style.gridArea = `${coords.x + 1}/${coords.y + 1}/${coords.x + 2}/${
    coords.y + 2
  }`;
  return element;
};
