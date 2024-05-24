let playerScore = 0;
let computerScore = 0;
let playerWins = 0;
let draws = 0;

function showInstructionPopup() {
    document.getElementById('instructionPopup').classList.remove('hidden');
}

function closeInstructionPopup() {
    document.getElementById('instructionPopup').classList.add('hidden');
}

function play(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result;

    if (playerChoice === computerChoice) {
        result = "It's a draw!";
        draws++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
        playerScore++;
        playerWins++;
    } else {
        result = 'You lose!';
        computerScore++;
    }

    document.getElementById('result').innerText = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
    updateScoreboard();

    if (playerWins === 3 || draws === 3) {
        showOutcome(result);
    }
}

function restart() {
    playerScore = 0;
    computerScore = 0;
    playerWins = 0;
    draws = 0;
    document.getElementById('result').innerText = '';
    updateScoreboard();
    hideOutcome();
}

function updateScoreboard() {
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
}

function showOutcome(result) {
    document.getElementById('popupMessage').innerText = result;
    document.getElementById('outcomeScreen').classList.remove('hidden');
    document.getElementById('playerWins').innerText = playerWins;
    document.getElementById('draws').innerText = draws;
}

function hideOutcome() {
    document.getElementById('outcomeScreen').classList.add('hidden');
}

// Add event listeners for both click and touch events
document.querySelectorAll('.choices button').forEach(button => {
    button.addEventListener('click', function() {
        play(this.getAttribute('data-choice'));
    });
    button.addEventListener('touchstart', function() {
        play(this.getAttribute('data-choice'));
    });
});