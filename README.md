# SNAKE GAME

This project is recreating classic snake game, but with additional features. Goal of the game is to move snake using arrow keys to eat food and avoid hitting wall or snake itself.

One of my biggest problems is writing readme file. On this project ill start by writing project plan, pseudo code here before start coding. I usual get into coding and then after finishing all features, writing readme is pain.

## Project plan / pseudo code

Create first version for CLI. Create empty board and function to display current state of the board.

Create css board with css-grid and use js to fill board cells.

UI => board, current score, high score.
Modal window for starting new game.

For board use vmin to keep square shape of the board.

- move snake up/down/left-right -> update board state
- hit detection
- grid -> create grid with dataset attributes on each cell
- snake -> create css snake with 3 parts, head, tail and body. After eating food piece append body block to snake.
- food -> create random fruit(diff food with diff abilities)
- score -> update score depending on food, update and save best score
- rules
- main game loop => raF
- user input -> window event for arrow keys
