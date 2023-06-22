// Get the buttons and result element
var rockBtn = document.getElementById('rock');
var paperBtn = document.getElementById('paper');
var scissorsBtn = document.getElementById('scissors');
var resultDiv = document.getElementById('result');

// Add click event listeners to the buttons
rockBtn.addEventListener('click', function() {
  playGame('rock');
});

paperBtn.addEventListener('click', function() {
  playGame('paper');
});

scissorsBtn.addEventListener('click', function() {
  playGame('scissors');
});

// Function to play the game
function playGame(playerChoice) {
  var choices = ['rock', 'paper', 'scissors'];
  var computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Determine the winner
  var result;
  if (playerChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'You win!';
  } else {
    result = 'You lose!';
  }

  // Display the result
  resultDiv.textContent = `Player: ${playerChoice} | Computer: ${computerChoice} - ${result}`;
}
