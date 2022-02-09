export const drawBoard = size =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => null));

export const displayBoard = board => {
  console.log(` ${'-'.repeat(board.length)}`);
  board.forEach(row => {
    let str = '|';
    row.forEach(ele => {
      str += `${ele || ' '}`;
    });
    console.log(`${str}|`);
  });
  console.log(` ${'-'.repeat(board.length)}`);
};
