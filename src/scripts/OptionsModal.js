class OptionModal {
  #parentElement = document.querySelector('.options');

  show() {
    this.#parentElement.classList.remove('hidden');
  }

  hide() {
    this.#parentElement.classList.add('hidden');
  }
}

export default new OptionModal();
