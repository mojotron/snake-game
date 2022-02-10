export const drawBoard = size =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => null));

export const displayBoard = board => {
  const display = [];
  display.push(` ${'-'.repeat(board.length)}`);
  board.forEach(row => {
    let str = '|';
    row.forEach(ele => {
      str += `${ele || ' '}`;
    });
    display.push(`${str}|`);
  });
  display.push(` ${'-'.repeat(board.length)}`);
  console.log(display.join('\n'));
};
