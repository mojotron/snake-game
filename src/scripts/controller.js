import '../styles/main.css';
import Board from './Board';
import Snake from './Snake';
import Food from './Food';
import Score from './Score';
import OptionsModal from './OptionsModal';

import gameOptions from './config';

const boardElement = document.querySelector('.board');

const state = {
  gridSize: 'small',
  snakeSpeed: 'slow',
  direction: 'right',
  foodCoords: null,
  currentScore: 0,
  highScore: {
    small: {
      slow: 0,
      normal: 0,
      fast: 0,
    },
    normal: {
      slow: 0,
      normal: 0,
      fast: 0,
    },
    large: {
      slow: 0,
      normal: 0,
      fast: 0,
    },
  },
};

// local storage
const getLocalStorage = () => {
  const storage = localStorage.getItem('highScores');
  if (storage) state.highScore = JSON.parse(storage);
};

const setLocalStorage = () => {
  localStorage.setItem('highScores', JSON.stringify(state.highScore));
};

const checkHighScore = () => {
  if (state.currentScore > state.highScore[state.gridSize][state.snakeSpeed]) {
    state.highScore[state.gridSize][state.snakeSpeed] = state.currentScore;
    setLocalStorage();
    Score.updateHighScore(state.highScore[state.gridSize][state.snakeSpeed]);
  }
};
getLocalStorage();

const foodEatenController = () => {
  if (!Food.foodEaten(Snake.head)) return;
  state.appleCoords = Food.create(Snake.snake);
  Snake.grow();
  state.currentScore += 1;
  Score.displayCurrentScore(state.currentScore);
};

const renderBoardController = () => {
  Board.clear();
  Food.display(boardElement);
  Snake.display(boardElement, state.direction);
};

const isGameOver = () => Board.wallHit(Snake.head) || Snake.snakeHit();

const init = () => {
  Board.createGrid(gameOptions.size[state.gridSize]);
  Snake.new();
  state.direction = 'right';
  state.appleCoords = Food.create(Snake.snake);
  state.currentScore = 0;
  Score.displayCurrentScore(state.currentScore);
  Food.display(boardElement);
  Snake.display(boardElement);
  // Score.reset();
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
  if (deltaTime > gameOptions.speed[state.snakeSpeed]) {
    prevTimestamp = timestamp;
    Snake.move(state.direction);
    if (isGameOver()) {
      // Score.highScoreCheck();
      checkHighScore();
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
  // read data from user input
  const size = document.querySelector('input[name="size"]:checked').value;
  const speed = document.querySelector('input[name="speed"]:checked').value;
  // 1 update state
  state.gridSize = size;
  state.snakeSpeed = speed;
  // get data from local storage and update score ui
  Score.updateScoreOptions(state.gridSize, state.snakeSpeed);
  Score.updateHighScore(state.highScore[state.gridSize][state.snakeSpeed]);
  startGameController();
});
