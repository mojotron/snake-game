import '../styles/main.css';
import Board from './Board';
import Snake from './Snake';
import Food from './Food';

const boardElement = document.querySelector('.board');

const state = {
  boardSize: 10,
  direction: 'right',
  gameOver: false,
};

Board.createGrid();

const appleHit = (snakeHead, apple) =>
  snakeHead.x === apple.x && snakeHead.y === apple.y;

let appleCoords = Food.create(Snake.snake);
Food.display(boardElement);
Snake.display(boardElement);
// user input
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

    Snake.move(state.direction);

    if (Board.wallHit(Snake.head) || Snake.snakeHit()) {
      state.gameOver = true;
      return;
    }

    if (appleHit(Snake.head, appleCoords)) {
      appleCoords = Food.create(Snake.snake);
      Snake.grow();
    }

    boardElement.innerHTML = '';
    Food.display(boardElement);
    Snake.display(boardElement, state.direction);
  }

  if (!state.gameOver) window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
