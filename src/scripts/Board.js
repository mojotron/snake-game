export const drawBoardCLI = size =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => null));

export const displayBoardCLI = board => {
  const display = [];
  display.push(` ${'-'.repeat(board.length)}`);
  board.forEach(row => {
    let str = '|';
    row.forEach(ele => {
      str += `${ele || ' '}`;
    });
    display.push(`${str}|`);
  });
  display.push(` ${'-'.repeat(board.length)}`);
  console.log(display.join('\n'));
};

const boardElement = document.querySelector('.board');

export const createGridDOM = size => {
  boardElement.style.setProperty('--rows', size);
  boardElement.style.setProperty('--columns', size);
};

export const getRandomBoardPosition = size => {
  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  return { x, y };
};
