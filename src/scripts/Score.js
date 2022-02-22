class Score {
  #currentScoreElement = document.getElementById('current-score');

  #highScoreElement = document.getElementById('high-score');

  #gridSizeElement = document.querySelector('.score__grid-size');

  #snakeSpeedElement = document.querySelector('.score__snake-speed');

  displayCurrentScore(score) {
    this.#currentScoreElement.textContent = score;
  }

  updateScoreOptions(gridSize, snakeSpeed) {
    this.#gridSizeElement.textContent = gridSize;
    this.#snakeSpeedElement.textContent = snakeSpeed;
  }

  updateHighScore(score) {
    this.#highScoreElement.textContent = score;
  }
}

export default new Score();
