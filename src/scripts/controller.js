import '../styles/main.css';
import * as Model from './model';
import Board from './Board';
import Snake from './Snake';
import Food from './Food';
import Score from './Score';
import OptionsModal from './OptionsModal';
import './user-input';
import gameOptions from './config';

const boardElement = document.querySelector('.board'); // TODO

const checkHighScore = () => {
  if (
    Model.state.currentScore >
    Model.state.highScore[Model.state.gridSize][Model.state.snakeSpeed]
  ) {
    Model.state.highScore[Model.state.gridSize][Model.state.snakeSpeed] =
      Model.state.currentScore;
    Model.setLocalStorage();
    Score.updateHighScore(
      Model.state.highScore[Model.state.gridSize][Model.state.snakeSpeed]
    );
  }
};

const foodEatenController = () => {
  if (!Food.foodEaten(Snake.head)) return;
  Model.state.appleCoords = Food.create(Snake.snake);
  Snake.grow();
  Model.state.currentScore += 1;
  Score.displayCurrentScore(Model.state.currentScore);
};

const renderBoardController = () => {
  Board.clear();
  Food.display(boardElement);
  Snake.display(boardElement, Model.state.direction);
};

const isGameOver = () => Board.wallHit(Snake.head) || Snake.snakeHit();

const init = () => {
  Board.createGrid(gameOptions.size[Model.state.gridSize]);
  Snake.new();
  Model.state.direction = 'right';
  Model.state.appleCoords = Food.create(Snake.snake);
  Model.state.currentScore = 0;
  Score.displayCurrentScore(Model.state.currentScore);
  Score.updateHighScore(
    Model.state.highScore[Model.state.gridSize][Model.state.snakeSpeed]
  );
  Food.display(boardElement);
  Snake.display(boardElement);
};

// GAME LOOP
let prevTimestamp;

function gameLoop(timestamp) {
  if (prevTimestamp === undefined) prevTimestamp = timestamp;
  const deltaTime = timestamp - prevTimestamp;
  if (deltaTime > gameOptions.speed[Model.state.snakeSpeed]) {
    prevTimestamp = timestamp;
    Snake.move(Model.state.direction);
    if (isGameOver()) {
      // Score.highScoreCheck();
      checkHighScore();
      // TEMP
      document
        .querySelectorAll('.snake-head__eye')
        .forEach(el => el.classList.add('dead'));
      document.querySelector('.snake-head__tongue').classList.remove('hidden');
      OptionsModal.show();
      // TODO display when snake hits body
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
  // 1 update Model.state
  Model.state.gridSize = size;
  Model.state.snakeSpeed = speed;
  // get data from local storage and update score ui
  Score.updateScoreOptions(Model.state.gridSize, Model.state.snakeSpeed);
  startGameController();
});
