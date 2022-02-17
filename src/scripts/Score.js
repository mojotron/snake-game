class Score {
  #currentScoreElement = document.getElementById('current-score');

  #highScoreElement = document.getElementById('high-score');

  #currentScore = 0;

  #highScore;

  constructor() {
    this.#highScore = this.#getLocalStorage() || 0;
    this.#updateHighScore();
  }

  reset() {
    this.#currentScore = 0;
    this.#currentScoreElement.textContent = 0;
  }

  add() {
    this.#currentScore += 1;
    this.#update();
  }

  #update() {
    this.#currentScoreElement.textContent = this.#currentScore;
  }

  highScoreCheck() {
    if (this.#currentScore > this.#highScore) {
      this.#highScore = this.#currentScore;
      this.#highScoreElement.textContent = this.#highScore;
      // TODO save new score to local storage
      this.#setLocalStorage();
      this.#updateHighScore();
    }
  }

  #setLocalStorage() {
    localStorage.setItem('snakeHighScore', this.#highScore);
  }

  #getLocalStorage() {
    return localStorage.getItem('snakeHighScore');
  }

  #updateHighScore() {
    this.#highScoreElement.textContent = this.#highScore;
  }

  clearLocalStorage() {
    localStorage.removeItem('snakeHighScore');
  }
}

export default new Score();
