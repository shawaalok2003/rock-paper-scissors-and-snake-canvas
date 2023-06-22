var canvas = document.getElementById("snakeCanvas");
var ctx = canvas.getContext("2d");
var box = 20;
var snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
var food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};
var d;
var score = 0;
var highScore = localStorage.getItem("highScore") || 0;
var speed = 900;
var gameIsOver = false;

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode === 37&& d !== "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode === 38 && d !== "DOWN") {
    d = "UP";
  } else if (event.keyCode === 39 && d !== "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode === 40 && d !== "UP") {
    d = "DOWN";
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "black" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box); 
  
  if(score%4==0){
    
  ctx.fillStyle = "white";
  ctx.fillRect(food.x, food.y, box, box);

  }

  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
    if (consecutiveEaten === 4) {
        createBonusFood();
      }
  
      food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
      };
    speed -=5;
  } else {
    snake.pop();
  }

  var newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    gameIsOver = true;
  }

  snake.unshift(newHead);

  // Draw score
  ctx.fillStyle = "#333";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, box, 1.5 * box);

  // Draw high score
  ctx.fillStyle = "#333";
  ctx.font = "20px Arial";
  ctx.fillText("High Score: " + highScore, box, 3 * box);
}


function collision(head, array) {
  for (var i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  if (gameIsOver) {
    clearInterval(game);
    showGameOverScreen();
  } else {
    draw();
  }
}

function showGameOverScreen() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#333";
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 40);

  ctx.font = "20px Arial";
  ctx.fillText("Final Score: " + score, canvas.width / 2 - 70, canvas.height / 2 + 10);

  ctx.font = "20px Arial";
  ctx.fillText("Press Space to Restart", canvas.width / 2 - 110, canvas.height / 2 + 40);

  document.addEventListener("keydown", restartGame);
}

function restartGame(event) {
  if (event.keyCode === 32) {
    document.removeEventListener("keydown", restartGame);
    resetGame();
  }
}

function resetGame() {
  snake = [];
  snake[0] = { x: 10 * box, y: 10 * box };
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
  d = null;
  score = 0;
  gameIsOver = false;
  speed = 200;
  game = setInterval(gameLoop, speed);
}

var game = setInterval(gameLoop, speed);
