export const state = {
  gridSize: 'small',
  snakeSpeed: 'slow',
  direction: 'right',
  foodCoords: null,
  currentScore: 0,
  highScore: {
    small: {
      slow: 0,
      normal: 0,
      fast: 0,
    },
    normal: {
      slow: 0,
      normal: 0,
      fast: 0,
    },
    large: {
      slow: 0,
      normal: 0,
      fast: 0,
    },
  },
};

const getLocalStorage = () => {
  const storage = localStorage.getItem('highScores');
  if (storage) state.highScore = JSON.parse(storage);
};

const setLocalStorage = () => {
  localStorage.setItem('highScores', JSON.stringify(state.highScore));
};

export const checkHighScore = () =>
  state.currentScore > state.highScore[state.gridSize][state.snakeSpeed];

export const updateHighScore = () => {
  state.highScore[state.gridSize][state.snakeSpeed] = state.currentScore;
  setLocalStorage();
};

const init = () => {
  getLocalStorage();
};
init();
