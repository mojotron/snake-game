import '../styles/main.css';
import { createGridDOM, getRandomBoardPosition } from './Board';
import Snake from './Snake';

const boardElement = document.querySelector('.board');
const state = {
  direction: 'right',
};
createGridDOM(10);

const appleHit = (snakeHead, apple) =>
  snakeHead.x === apple.x && snakeHead.y === apple.y;

const wallHit = snakeHead =>
  snakeHead.x < 0 ||
  snakeHead.x === 10 ||
  snakeHead.y < 0 ||
  snakeHead.y === 10;

const snakeHit = () =>
  Snake.snake
    .slice(1)
    .some(ele => ele.x === Snake.snake[0].x && ele.y === Snake.snake[0].y);

const createApple = () => {
  const coords = getRandomBoardPosition(10);
  if (Snake.snake.some(ele => ele.x === coords.x && ele.y === coords.y)) {
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

displayApple(appleCoords);

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') {
    if (state.direction === 'up') return;
    state.direction = 'down';
  }
  if (e.key === 'ArrowUp') {
    if (state.direction === 'down') return;
    state.direction = 'up';
  }
  if (e.key === 'ArrowRight') {
    if (state.direction === 'left') return;
    state.direction = 'right';
  }
  if (e.key === 'ArrowLeft') {
    if (state.direction === 'right') return;
    state.direction = 'left';
  }
});

// GAME LOOP
let prevTimestamp;

function gameLoop(timestamp) {
  if (prevTimestamp === undefined) prevTimestamp = timestamp;
  const deltaTime = timestamp - prevTimestamp;

  if (deltaTime > 500) {
    prevTimestamp = timestamp;

    boardElement.innerHTML = '';
    displayApple(appleCoords);
    Snake.display(boardElement, state.direction);

    if (appleHit(Snake.head, appleCoords)) {
      appleCoords = createApple();
      Snake.grow();
    }

    if (wallHit(Snake.head)) {
      alert('WALL');
      location.reload();
    }

    if (snakeHit()) {
      alert('OUCH');
      location.reload();
    }
  }

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
