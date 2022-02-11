import '../styles/main.css';
import { createGridDOM, getRandomBoardPosition } from './Board';

const boardElement = document.querySelector('.board');
// temp snake
const snake = [
  { x: 3, y: 3 },
  { x: 3, y: 2 },
  { x: 3, y: 1 },
];
let tail;

createGridDOM(10);

const updateSnakePosition = snakeArr => {
  snakeArr.forEach(block => {
    const x = document.createElement('div');
    x.classList.add('snake');
    x.style.gridArea = `${block.x + 1}/${block.y + 1}/${block.x + 2}/${
      block.y + 2
    }`;
    boardElement.append(x);
  });
};

const appleHit = (snakeHead, apple) =>
  snakeHead.x === apple.x && snakeHead.y === apple.y;

const wallHit = snakeHead =>
  snakeHead.x < 0 ||
  snakeHead.x === 10 ||
  snakeHead.y < 0 ||
  snakeHead.y === 10;

const snakeHit = () =>
  snake.slice(1).some(ele => ele.x === snake[0].x && ele.y === snake[0].y);

const createApple = () => {
  const coords = getRandomBoardPosition(10);
  if (snake.some(ele => ele.x === coords.x && ele.y === coords.y)) {
    return createApple();
  }
  return coords;
};

const displayApple = coords => {
  const apple = document.createElement('div');
  apple.classList.add('apple');
  apple.style.gridArea = `${coords.x + 1}/${coords.y + 1}/${coords.x + 2}/${
    coords.y + 2
  }`;
  boardElement.append(apple);
  return apple;
};

let appleCoords = createApple();

updateSnakePosition(snake);
displayApple(appleCoords);
let lastDirection = 'right';
const moveSnake = direction => {
  if (lastDirection === 'left' && direction === 'right') return;
  if (lastDirection === 'right' && direction === 'left') return;
  if (lastDirection === 'up' && direction === 'down') return;
  if (lastDirection === 'down' && direction === 'up') return;

  lastDirection = direction;
  tail = snake.at(-1);
  for (let i = snake.length - 1; i > 0; i -= 1) {
    snake[i] = { ...snake[i - 1] };
  }
  if (direction === 'down') snake[0].x += 1;
  if (direction === 'up') snake[0].x -= 1;
  if (direction === 'right') snake[0].y += 1;
  if (direction === 'left') snake[0].y -= 1;
};

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') moveSnake('down');
  if (e.key === 'ArrowUp') moveSnake('up');
  if (e.key === 'ArrowRight') moveSnake('right');
  if (e.key === 'ArrowLeft') moveSnake('left');

  if (appleHit(snake[0], appleCoords)) {
    appleCoords = createApple();
    snake.push(tail);
  }

  if (wallHit(snake[0])) {
    alert('WALL');
  }

  if (snakeHit()) {
    alert('OUCH');
  }

  boardElement.innerHTML = '';
  updateSnakePosition(snake);
  displayApple(appleCoords);
});
