# SNAKE GAME

This project is recreating classic snake game, but with additional features. Goal of the game is to move snake using arrow keys to eat food and avoid hitting wall or snake itself.

One of my biggest problems is writing readme file. On this project ill start by writing project plan, pseudo code here before start coding. I usual get into coding and then after finishing all features, writing readme is pain.

## Project plan / pseudo code

1. Board
   Create first version for CLI. Create empty board and function to display current state of the board.

Create css board with css-grid and use js to fill board cells.

UI => board, current score, high score.
Modal window for starting new game.

For board use vmin to keep square shape of the board.

- move snake up/down/left-right -> update board state,
  Snake move, loop over snake array from last to second element, update current element with object copy of the previous one (to avoid reference issues). Lastly update head of the snake depending on current direction.

Keep track of last direction, down y+=1, up y-=1,right x+=1, left x-=1

- moving snake is to copy coord object from previosu snake block and update head part with new direction
- hit detection
- grid -> create grid with dataset attributes on each cell
- snake -> create css snake with 3 parts, head, tail and body. After eating food piece append body block to snake.
- food -> create random fruit(diff food with diff abilities)
- score -> update score depending on food, update and save best score
- rules
- main game loop => raF
- user input -> window event for arrow keys

Refactor board, snake and move snake for dom elements.
