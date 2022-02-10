import '../styles/main.css';

import { drawBoard, displayBoard } from './Board';

const tempBoard = drawBoard(10);

// temp snake
const snake = [
  { x: 3, y: 5 },
  { x: 3, y: 4 },
  { x: 3, y: 3 },
  { x: 3, y: 2 },
  { x: 3, y: 1 },
];

const displaySnake = (board, snakeArr) => {
  snakeArr.forEach(block => (board[block.x][block.y] = 'O'));
};

const boardElement = document.querySelector('.board');
const createBoard = size => {
  boardElement.innerHTML = '';
  boardElement.style.setProperty('--rows', size);
  boardElement.style.setProperty('--columns', size);
};

createBoard(15);

const updateSnakePosition = snakeArr => {
  snakeArr.forEach(block => {
    const x = document.createElement('div');
    x.style.background = 'green';
    x.style.gridArea = `${block.x + 1}/${block.y + 1}/${block.x + 2}/${
      block.y + 2
    }`;
    boardElement.append(x);
  });
};

updateSnakePosition(snake);

let lastDirection = 'right';
const moveSnake = direction => {
  if (lastDirection === 'left' && direction === 'right') return;
  if (lastDirection === 'right' && direction === 'left') return;
  if (lastDirection === 'up' && direction === 'down') return;
  if (lastDirection === 'down' && direction === 'up') return;

  lastDirection = direction;
  for (let i = snake.length - 1; i > 0; i -= 1) {
    snake[i] = { ...snake[i - 1] };
  }
  if (direction === 'down') snake[0].x += 1;
  if (direction === 'up') snake[0].x -= 1;
  if (direction === 'right') snake[0].y += 1;
  if (direction === 'left') snake[0].y -= 1;
};

displaySnake(tempBoard, snake);
displayBoard(tempBoard);

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') moveSnake('down');
  if (e.key === 'ArrowUp') moveSnake('up');
  if (e.key === 'ArrowRight') moveSnake('right');
  if (e.key === 'ArrowLeft') moveSnake('left');

  createBoard(15);
  updateSnakePosition(snake);
});
