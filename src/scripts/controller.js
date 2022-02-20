import '../styles/main.css';
import Board from './Board';
import Snake from './Snake';
import Food from './Food';
import Score from './Score';
import OptionsModal from './OptionsModal';

import gameOptions from './config';

const boardElement = document.querySelector('.board');

const state = {
  gridSize: 10,
  snakeSpeed: 500,
  direction: 'right',
  foodCoords: null,
};

const foodEatenController = () => {
  if (!Food.foodEaten(Snake.head)) return;
  state.appleCoords = Food.create(Snake.snake);
  Snake.grow();
  Score.add();
};

const renderBoardController = () => {
  Board.clear();
  Food.display(boardElement);
  Snake.display(boardElement, state.direction);
};

const isGameOver = () => Board.wallHit(Snake.head) || Snake.snakeHit();

const init = () => {
  Board.createGrid(state.gridSize);
  Snake.new();
  state.direction = 'right';
  state.appleCoords = Food.create(Snake.snake);
  Food.display(boardElement);
  Snake.display(boardElement);
  Score.reset();
};

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
  if (deltaTime > state.snakeSpeed) {
    prevTimestamp = timestamp;
    Snake.move(state.direction);
    if (isGameOver()) {
      Score.highScoreCheck();
      OptionsModal.show();
      return;
    }
    foodEatenController();
    renderBoardController();
  }
  window.requestAnimationFrame(gameLoop);
}

const startGameController = () => {
  init();
  OptionsModal.hide();
  window.requestAnimationFrame(gameLoop);
};

document.querySelector('.btn--start-new').addEventListener('click', e => {
  e.preventDefault();
  const size = document.querySelector('input[name="size"]:checked').value;
  const speed = document.querySelector('input[name="speed"]:checked').value;
  state.gridSize = gameOptions.size[size];
  state.snakeSpeed = gameOptions.speed[speed];
  startGameController();
});
