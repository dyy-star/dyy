// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 400;
const canvasHeight = canvas.height = 400;

// 蛇的初始位置和大小
let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];
let snakeSize = 10;

let food = { x: 15, y: 15 };

// 蛇的移动方向
let dx = 1;
let dy = 0;
// 游戏判断
let gameOver = false;

// 分数
let score = 0;
const scoreBoard = document.getElementById('score');

// 绘制蛇的函数
function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x * snakeSize, segment.y * snakeSize, snakeSize, snakeSize);
  });
}

// 绘制食物的函数
function drawFood() {
  ctx.fillStyle ='red';
  ctx.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

// 移动蛇的函数
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // 检查是否吃到食物
  if (head.x === food.x && head.y === food.y) {
    generateFood();
    score++;
    scoreBoard.textContent = score;
  } else {
    snake.pop();
  }

  // 检查是否撞墙或撞到自己
  if (head.x < 0 || head.x >= canvasWidth / snakeSize || head.y < 0 || head.y >= canvasHeight / snakeSize || isCollision(head, snake.slice(1))) {
    gameOver = true;
  }
}

// 生成食物的函数
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvasWidth / snakeSize)),
    y: Math.floor(Math.random() * (canvasHeight / snakeSize))
  };
}

// 检查碰撞的函数
function isCollision(head, body) {
  return body.some(segment => segment.x === head.x && segment.y === head.y);
}

// 游戏主循环
function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('游戏结束', canvasWidth / 2 - 50, canvasHeight / 2);
    return;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawSnake();
  drawFood();
  moveSnake();
  setTimeout(gameLoop, 100);
}

// 监听键盘事件改变蛇的移动方向
document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 37: // 左箭头
      if (dx!== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case 38: // 上箭头
      if (dy!== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case 39: // 右箭头
      if (dx!== -1) {
        dx = 1;
        dy = 0;
      }
      break;
    case 40: // 下箭头
      if (dy!== -1) {
        dx = 0;
        dy = 1;
      }
      break;
  }
});

// 重新开始游戏函数
function restartGame() {
  gameOver = false;
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  dx = 1;
  dy = 0;
  score = 0;
  scoreBoard.textContent = score;
  generateFood();
  gameLoop();
}

// 为重新开始按钮添加点击事件
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

// 开始游戏
gameLoop();