// script.js
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');
const leftScoreElement = document.getElementById('leftScore');
const rightScoreElement = document.getElementById('rightScore');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');

const WINNING_SCORE = 5;

// Scores
let leftScore = 0;
let rightScore = 0;

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5
};

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 8;

let leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

let rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

// Draw the ball
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "#fff";
    context.fill();
    context.closePath();
}

// Draw a paddle
function drawPaddle(x, y, width, height) {
    context.fillStyle = "#fff";
    context.fillRect(x, y, width, height);
}

// Move the ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (top/bottom)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    if (
        (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
         ball.y > leftPaddle.y &&
         ball.y < leftPaddle.y + leftPaddle.height) ||
        (ball.x + ball.radius > rightPaddle.x &&
         ball.y > rightPaddle.y &&
         ball.y < rightPaddle.y + rightPaddle.height)
    ) {
        ball.dx *= -1;
    }

    // Score update and ball reset
    if (ball.x - ball.radius < 0) {
        rightScore++;
        updateScore();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        leftScore++;
        updateScore();
        resetBall();
    }
}

// Move paddles
function movePaddles() {
    leftPaddle.y += leftPaddle.dy;

    // Prevent left paddle from going out of bounds
    if (leftPaddle.y < 0) leftPaddle.y = 0;
    if (leftPaddle.y + leftPaddle.height > canvas.height) leftPaddle.y = canvas.height - leftPaddle.height;

    // AI for right paddle
    if (ball.y < rightPaddle.y + rightPaddle.height / 2) {
        rightPaddle.dy = -paddleSpeed;
    } else {
        rightPaddle.dy = paddleSpeed;
    }

    rightPaddle.y += rightPaddle.dy;

    // Prevent right paddle from going out of bounds
    if (rightPaddle.y < 0) rightPaddle.y = 0;
    if (rightPaddle.y + rightPaddle.height > canvas.height) rightPaddle.y = canvas.height - rightPaddle.height;
}

// Keyboard event handlers
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            leftPaddle.dy = -paddleSpeed;
            break;
        case 'ArrowDown':
            leftPaddle.dy = paddleSpeed;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            leftPaddle.dy = 0;
            break;
    }
});

// Update game objects
function update() {
    moveBall();
    movePaddles();
}

// Render game objects
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
}

// Game loop
function gameLoop() {
    update();
    render();
    if (!isGameOver()) {
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
gameLoop();

// Update the score display
function updateScore() {
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;
    checkWin();
}

// Check if there's a winner
function checkWin() {
    if (leftScore === WINNING_SCORE || rightScore === WINNING_SCORE) {
        displayWinMessage();
    }
}

// Display win/lose message
function displayWinMessage() {
    if (leftScore === WINNING_SCORE) {
        messageText.textContent = "You Win!";
    } else if (rightScore === WINNING_SCORE) {
        messageText.textContent = "You Lose!";
    }
    messageBox.classList.remove('hidden');
}

// Check if the game is over
function isGameOver() {
    return leftScore === WINNING_SCORE || rightScore === WINNING_SCORE;
}

// Reset the game
function resetGame() {
    leftScore = 0;
    rightScore = 0;
    updateScore();
    resetBall();
    messageBox.classList.add('hidden');
    gameLoop();
}

// Reset the ball position
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = ball.speed * (Math.random() > 0.5 ? 1 : -1);
}
