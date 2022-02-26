import '../styles/main.css';
import * as Model from './model';
import Board from './Board';
import Snake from './Snake';
import Food from './Food';
import Score from './Score';
import OptionsModal from './OptionsModal';
import './user-input';
import { GAME_OPTIONS, START_DIRECTION } from './config';

const highScoreController = () => {
  if (Model.checkHighScore()) {
    Model.updateHighScore();
    Score.updateHighScore(
      Model.state.highScore[Model.state.gridSize][Model.state.snakeSpeed]
    );
  }
};

const foodEatenController = () => {
  if (!Food.foodEaten(Snake.head)) return;
  Model.state.appleCoords = Food.createCoords(
    Snake.snake,
    GAME_OPTIONS.size[Model.state.gridSize]
  );
  Snake.grow();
  Model.state.currentScore += 1;
  Score.displayCurrentScore(Model.state.currentScore);
};

const renderBoardController = () => {
  Board.clear();
  Food.display(Board.element);
  Snake.display(Board.element, Model.state.direction);
};

const isGameOver = () => Board.wallHit(Snake.head) || Snake.snakeHit();

const init = () => {
  Board.createGrid(GAME_OPTIONS.size[Model.state.gridSize]);
  Snake.new();
  Model.state.direction = START_DIRECTION;
  Model.state.appleCoords = Food.createCoords(
    Snake.snake,
    GAME_OPTIONS.size[Model.state.gridSize]
  );
  Model.state.currentScore = 0;
  Score.displayCurrentScore(Model.state.currentScore);
  Score.updateHighScore(
    Model.state.highScore[Model.state.gridSize][Model.state.snakeSpeed]
  );
  Food.display(Board.element);
  Snake.display(Board.element);
};

// GAME LOOP
let prevTimestamp;

function gameLoop(timestamp) {
  if (prevTimestamp === undefined) prevTimestamp = timestamp;
  const deltaTime = timestamp - prevTimestamp;
  if (deltaTime > GAME_OPTIONS.speed[Model.state.snakeSpeed]) {
    prevTimestamp = timestamp;
    Snake.move(Model.state.direction);
    if (isGameOver()) {
      // Score.highScoreCheck();
      highScoreController();
      // TEMP
      Snake.addGameOverEffect();
      OptionsModal.show();
      return;
    }
    foodEatenController();
    renderBoardController();
    Model.state.newInput = false; // stop for to fast key pressing between raF calls
  }
  window.requestAnimationFrame(gameLoop);
}

const startGameController = () => {
  init();
  OptionsModal.hide();
  window.requestAnimationFrame(gameLoop);
};

const newGameController = (size, speed) => {
  Model.state.gridSize = size;
  Model.state.snakeSpeed = speed;
  // get data from local storage and update score ui
  Score.updateScoreOptions(Model.state.gridSize, Model.state.snakeSpeed);
  startGameController();
};

OptionsModal.addClickHandler(newGameController);
