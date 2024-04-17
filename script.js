'use strict';
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; //set score to 0
  activePlayer = activePlayer === 0 ? 1 : 0; //switch player


  // toggle active class when players switches
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {

    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display dice
    diceEl.classList.remove('hidden'); //remove hidden class
    diceEl.src = `dice-${dice}.png`; // apply dymanic its dice to img scr

    // 3.check for rolled
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {

    //   1. Add current score to active player's score
    scores[activePlayer] += currentScore; //scores[1]= scores[1]+currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //   2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {

      // 2.1 Finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {

      // 2.2 Switch to the next player
      switchPlayer();
    }
  }
});

// reload
btnNew.addEventListener('click', init);
