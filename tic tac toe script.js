// script.js
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const messageContainer = document.getElementById('messageContainer');
const message = document.getElementById('message');
const newGameButton = document.getElementById('newGameButton');
const exitGameButton = document.getElementById('exitGameButton');
const symbolModal = document.getElementById('symbolModal');
const symbolButtons = document.querySelectorAll('.symbol-button');
const playerTurnText = document.getElementById('playerTurn');
let currentPlayer;
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerChosen = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

symbolButtons.forEach(button => {
    button.addEventListener('click', handleSymbolChoice);
});

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', startNewGame);
exitGameButton.addEventListener('click', exitGame);

function handleSymbolChoice(event) {
    currentPlayer = event.target.getAttribute('data-symbol');
    playerChosen = true;
    symbolModal.style.display = 'none';
    resetButton.style.display = 'inline-block';
    playerTurnText.textContent = `Player's Turn: ${currentPlayer}`;
}

function handleCellClick(event) {
    if (!playerChosen) {
        symbolModal.style.display = 'flex';
        return;
    }

    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurnText.textContent = `Player's Turn: ${currentPlayer}`;
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showMessage(`Player ${currentPlayer} has won!`);
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        showMessage('Game is a draw!');
        gameActive = false;
    }
}

function showMessage(msg) {
    message.textContent = msg;
    messageContainer.style.display = 'flex';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;
    playerChosen = false;
    playerTurnText.textContent = `Player's Turn: `;
    resetButton.style.display = 'none';
}

function startNewGame() {
    resetGame();
    messageContainer.style.display = 'none';
}

function exitGame() {
    messageContainer.style.display = 'none';
    alert('Thanks for playing!');
}
