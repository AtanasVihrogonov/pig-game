/*
  GAME RULES:

  - The game has 2 players, playing in rounds
  - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
  - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
  - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that,  it's the next player's turn
  - The first player to reach 100 points on GLOBAL score wins the game

  Change the game to follow these rules:

  1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
  2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
  3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, dice, gamePlaying;
let lastDice;

init(); 

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdDice);
document.querySelector('.btn-new').addEventListener('click', init);

function rollDice() {
  if(gamePlaying) {
    // Get a random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    // Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // Update the round score If rolled number was NOT a 1
    if(dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
}

function nextPlayer() {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  clearDice();
}

function holdDice() {
  if(gamePlaying) {
    // Add current score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    let input = document.querySelector('.final-score').value;
    let winningScore;
    
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if(scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      clearDice();

      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
}

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  clearDice();

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}

function clearDice() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

