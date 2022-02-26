import { state } from './model';

window.addEventListener('keydown', e => {
  if (state.newInput) return; // stop for to fast key pressing between raF calls
  if (e.key === 'ArrowDown') {
    if (state.direction === 'up') return;
    state.direction = 'down';
  }
  if (e.key === 'ArrowUp') {
    if (state.direction === 'down') return;
    state.direction = 'up';
  }
  if (e.key === 'ArrowRight') {
    if (state.direction === 'left') return;
    state.direction = 'right';
  }
  if (e.key === 'ArrowLeft') {
    if (state.direction === 'right') return;
    state.direction = 'left';
  }
  state.newInput = true; // stop for to fast key pressing between raF calls
});
