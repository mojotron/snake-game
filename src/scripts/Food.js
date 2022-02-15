class Food {
  #foodCoords;

  #getRandomBoardPosition() {
    const randNum = () => Math.floor(Math.random() * 10);
    return { x: randNum(), y: randNum() };
  }

  create(snake) {
    this.#foodCoords = this.#getRandomBoardPosition();
    if (
      snake.some(
        ele => ele.x === this.#foodCoords.x && ele.y === this.#foodCoords.y
      )
    ) {
      return this.create(snake);
    }
    return this.#foodCoords;
  }

  display(boardElement) {
    const foodElement = document.createElement('div');
    foodElement.classList.add('apple');
    foodElement.style.gridArea = `${this.#foodCoords.x + 1}/${
      this.#foodCoords.y + 1
    }/${this.#foodCoords.x + 2}/${this.#foodCoords.y + 2}`;
    boardElement.append(foodElement);
  }

  foodEaten(snakeHead) {
    return (
      snakeHead.x === this.#foodCoords.x && snakeHead.y === this.#foodCoords.y
    );
  }
}

export default new Food();
