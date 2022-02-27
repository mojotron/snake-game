# SNAKE GAME

[Play Snake Game](https://mojotron.github.io/snake-game/).

This project is part of my learning path by building classic arcade games with the vanilla JavaScript.

Snake is a video game genre where the player maneuvers a growing line that becomes a primary obstacle to itself. The player controls a dot, square, or object on a bordered plane. As it moves forward, it leaves a trail behind, resembling a moving snake.

Player attempts to eat items by running into them with the head of the snake. Each item eaten makes the snake longer, so avoiding collision with the snake becomes progressively more difficult.

[Learn more](<https://en.wikipedia.org/wiki/Snake_(video_game_genre)>) about snake game.

Recreating classic snake game. Goal of the game is to move snake using arrow keys to eat food and avoid hitting wall or snake body.

## Game options

This game implements couple of options for game difficulty so it can fit players skill.

| Grid Size | Column x Rows |
| --------- | :-----------: |
| small     |    10 x 10    |
| normal    |    15 x 15    |
| large     |    20 x 20    |

| Snake Speed | Animation Frame (ms) |
| ----------- | :------------------: |
| slow        |         500          |
| normal      |         300          |
| fast        |         150          |

High score is calculated of every grid size, snake speed option (e.g. grid size: small, snake speed: fast).
High score is tracked via localStorage API.
