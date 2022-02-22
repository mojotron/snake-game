class Snake {
  #newSnake = [
    { x: 3, y: 2, direction: 'right' },
    { x: 3, y: 1, direction: 'right' },
    { x: 3, y: 0, direction: 'right' },
  ];

  #snake;

  #tail;

  get head() {
    return { ...this.#snake.at(0) };
  }

  get snake() {
    // TEMP function
    return this.#snake.map(ele => ({ ...ele }));
  }

  constructor() {
    this.new();
  }

  new() {
    this.#snake = this.#newSnake.map(ele => ({ ...ele }));
  }

  move(direction) {
    this.#tail = this.#snake.at(-1);
    this.#snake[0] = { ...this.#snake[0] };
    for (let i = this.#snake.length - 1; i > 0; i -= 1) {
      this.#snake[i] = { ...this.#snake[i - 1] };
    }
    if (direction === 'down') this.#snake[0].x += 1;
    if (direction === 'up') this.#snake[0].x -= 1;
    if (direction === 'right') this.#snake[0].y += 1;
    if (direction === 'left') this.#snake[0].y -= 1;
    this.#snake[0].direction = direction;
  }

  grow() {
    this.#snake.push(this.#tail);
  }

  snakeHit() {
    return this.#snake
      .slice(1)
      .some(ele => ele.x === this.#snake[0].x && ele.y === this.#snake[0].y);
  }

  display(boardElement) {
    this.#snake.forEach((ele, i) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridArea = `${ele.x + 1}/${ele.y + 1}/${ele.x + 2}/${
        ele.y + 2
      }`;
      // TODO snake style logic;
      if (i === 0) {
        snakeElement.classList.add('snake-head');
      } else if (i === this.#snake.length - 1) {
        snakeElement.classList.add('snake-tail');
      } else {
        if (
          this.#snake[i - 1].direction === 'up' &&
          this.#snake[i].direction === 'right'
        ) {
          snakeElement.classList.add('snake-bottom-right');
        }
        if (
          this.#snake[i - 1].direction === 'up' &&
          this.#snake[i].direction === 'left'
        ) {
          snakeElement.classList.add('snake-bottom-left');
        }

        if (
          this.#snake[i - 1].direction === 'down' &&
          this.#snake[i].direction === 'right'
        ) {
          snakeElement.classList.add('snake-top-right');
        }
        if (
          this.#snake[i - 1].direction === 'down' &&
          this.#snake[i].direction === 'left'
        ) {
          snakeElement.classList.add('snake-top-left');
        }
        snakeElement.classList.add('snake');
      }

      boardElement.append(snakeElement);
    });
  }
}

export default new Snake();
