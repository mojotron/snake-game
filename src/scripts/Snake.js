class Snake {
  #snake = [
    { x: 3, y: 3 },
    { x: 3, y: 2 },
    { x: 3, y: 1 },
  ];

  #tail;

  get head() {
    return { ...this.#snake.at(0) };
  }

  get snake() {
    // TEMP function
    return this.#snake.map(ele => ({ ...ele }));
  }

  #move(direction) {
    this.#tail = this.#snake.at(-1);

    for (let i = this.#snake.length - 1; i > 0; i -= 1) {
      this.#snake[i] = { ...this.#snake[i - 1] };
    }
    if (direction === 'down') this.#snake[0].x += 1;
    if (direction === 'up') this.#snake[0].x -= 1;
    if (direction === 'right') this.#snake[0].y += 1;
    if (direction === 'left') this.#snake[0].y -= 1;
  }

  grow() {
    this.#snake.push(this.#tail);
  }

  display(boardElement, direction) {
    this.#move(direction);

    this.#snake.forEach(ele => {
      const snakeElement = document.createElement('div');
      snakeElement.classList.add('snake');
      snakeElement.style.gridArea = `${ele.x + 1}/${ele.y + 1}/${ele.x + 2}/${
        ele.y + 2
      }`;
      boardElement.append(snakeElement);
    });
  }
}

export default new Snake();
