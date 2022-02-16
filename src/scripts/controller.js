import '../styles/main.css';
import Board from './Board';
import Snake from './Snake';
import Food from './Food';

const boardElement = document.querySelector('.board');
const currentScore = document.querySelector('#current-score');

const state = {
  boardSize: 10,
  direction: 'right',
  foodCoords: null,
};

const foodEatenController = () => {
  if (!Food.foodEaten(Snake.head)) return;
  state.appleCoords = Food.create(Snake.snake);
  Snake.grow();
  // score
  currentScore.textContent = Number.parseInt(currentScore.textContent, 10) + 1;
};

const renderBoardController = () => {
  Board.clear();
  Food.display(boardElement);
  Snake.display(boardElement, state.direction);
};

const isGameOver = () => Board.wallHit(Snake.head) || Snake.snakeHit();

const init = () => {
  Board.createGrid();
  state.appleCoords = Food.create(Snake.snake);
  Food.display(boardElement);
  Snake.display(boardElement);
};
init();

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
    if (isGameOver()) return;
    foodEatenController();
    renderBoardController();
  }
  window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
