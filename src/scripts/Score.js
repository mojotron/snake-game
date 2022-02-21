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

  // reset() {
  //   this.#currentScore = 0;
  //
  // }

  // add() {
  //   this.#currentScore += 1;
  //   this.#update();
  // }

  // #update() {
  //   this.#currentScoreElement.textContent = this.#currentScore;
  // }

  // highScoreCheck() {
  //   if (this.#currentScore > this.#highScore) {
  //     this.#highScore = this.#currentScore;
  //     this.#highScoreElement.textContent = this.#highScore;
  //     // TODO save new score to local storage
  //     this.#setLocalStorage();
  //     this.#updateHighScore();
  //   }
  // }

  // #updateHighScore() {
  //   this.#highScoreElement.textContent = this.#highScore;
  // }
}

export default new Score();
