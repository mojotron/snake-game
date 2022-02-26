import createDomElement from './helpers';

class Food {
  #foodCoords;

  #innerHTML = `
    <div class="apple__body body-1"></div>
    <div class="apple__body body-2"></div>
    <div class="petiole"></div>
    <div class="leaf"></div>
  `;

  #randomCoords(boardSize) {
    const randNum = () => Math.floor(Math.random() * boardSize);
    return { x: randNum(), y: randNum() };
  }

  createCoords(snakeCoords, boardSize) {
    this.#foodCoords = this.#randomCoords(boardSize);
    if (
      snakeCoords.some(
        ele => ele.x === this.#foodCoords.x && ele.y === this.#foodCoords.y
      )
    ) {
      return this.createCoords(snakeCoords, boardSize);
    }
    return this.#foodCoords;
  }

  display(boardElement) {
    const foodElement = createDomElement(
      this.#foodCoords,
      'apple',
      this.#innerHTML
    );
    boardElement.append(foodElement);
  }

  foodEaten(snakeHead) {
    return (
      snakeHead.x === this.#foodCoords.x && snakeHead.y === this.#foodCoords.y
    );
  }
}

export default new Food();
