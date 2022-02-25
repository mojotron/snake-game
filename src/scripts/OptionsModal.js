class OptionModal {
  #parentElement = document.querySelector('.options');

  show() {
    this.#parentElement.classList.remove('hidden');
  }

  hide() {
    this.#parentElement.classList.add('hidden');
  }

  addClickHandler(handler) {
    this.#parentElement
      .querySelector('.btn--start-new')
      .addEventListener('click', e => {
        e.preventDefault();
        const size = this.#parentElement.querySelector(
          'input[name="size"]:checked'
        ).value;
        const speed = this.#parentElement.querySelector(
          'input[name="speed"]:checked'
        ).value;
        handler(size, speed);
      });
  }
}

export default new OptionModal();
