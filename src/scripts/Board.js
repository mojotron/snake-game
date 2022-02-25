class Board {
  #parentElement = document.querySelector('.board');

  #gridSize;

  get element() {
    return this.#parentElement;
  }

  createGrid(gridSize) {
    this.#gridSize = gridSize;
    this.#parentElement.style.setProperty('--rows', this.#gridSize);
    this.#parentElement.style.setProperty('--columns', this.#gridSize);
  }

  clear() {
    this.#parentElement.innerHTML = '';
  }

  getRandomBoardPosition() {
    const randNum = () => Math.floor(Math.random() * this.#gridSize);
    return { x: randNum(), y: randNum() };
  }

  wallHit(snakeHead) {
    return (
      snakeHead.x < 0 ||
      snakeHead.x === this.#gridSize ||
      snakeHead.y < 0 ||
      snakeHead.y === this.#gridSize
    );
  }
}

export default new Board();
