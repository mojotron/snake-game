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
        snakeElement.classList.add(`snake-rotate-${this.#snake[0].direction}`);
      } else if (i === this.#snake.length - 1) {
        snakeElement.classList.add('snake-tail');
        const prev = this.#snake[i - 1].direction;
        const curr = this.#snake[i].direction;
        if (prev === curr)
          snakeElement.classList.add(`snake-rotate-${ele.direction}`);
        if (curr === 'left' && prev === 'down')
          snakeElement.classList.add(`snake-rotate-down`);
        if (curr === 'right' && prev === 'down')
          snakeElement.classList.add(`snake-rotate-down`);
        if (curr === 'left' && prev === 'up')
          snakeElement.classList.add(`snake-rotate-up`);
        if (curr === 'right' && prev === 'up')
          snakeElement.classList.add('snake-rotate-up');
        //
        if (curr === 'up' && prev === 'right')
          snakeElement.classList.add(`snake-rotate-right`);
        if (curr === 'up' && prev === 'left')
          snakeElement.classList.add(`snake-rotate-left`);
        if (curr === 'down' && prev === 'right')
          snakeElement.classList.add(`snake-rotate-right`);
        if (curr === 'down' && prev === 'left')
          snakeElement.classList.add(`snake-rotate-left`);
      } else {
        snakeElement.classList.add('snake');
        const prev = this.#snake[i - 1].direction;
        const curr = this.#snake[i].direction;
        if (curr === 'left' && prev === 'down')
          snakeElement.classList.add('snake-top-left');
        if (curr === 'right' && prev === 'down')
          snakeElement.classList.add('snake-top-right');
        if (curr === 'left' && prev === 'up')
          snakeElement.classList.add('snake-bottom-left');
        if (curr === 'right' && prev === 'up')
          snakeElement.classList.add('snake-bottom-right');
        // //
        if (curr === 'up' && prev === 'right')
          snakeElement.classList.add('snake-top-left');
        if (curr === 'up' && prev === 'left')
          snakeElement.classList.add('snake-top-right');
        if (curr === 'down' && prev === 'right')
          snakeElement.classList.add('snake-bottom-left');
        if (curr === 'down' && prev === 'left')
          snakeElement.classList.add('snake-bottom-right');
      }
      boardElement.append(snakeElement);
    });
  }
}

export default new Snake();
