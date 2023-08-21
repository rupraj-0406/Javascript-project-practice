'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//let activePlayer = 0; // activePlayer=0 => player 0 is active & vice versa
//const scores = [0, 0]; //this holds the final score upon clicking the hold btn...
const diceEl = document.querySelector('.dice');
//let currentScore = 0;
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let playing, currentScore, scores, activePlayer;

const init = function () {
  //  first change the UI values
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  //  Now reset the initial state
  scores = [0, 0];
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      // current0El.textContent = currentScore; //change later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 25) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // doubt when to use '.' selector
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

//------      Below I am trying by my own     --------//

// btnNew.addEventListener('click', function () {
//   playing = true;
//   diceEl.classList.add('hidden');
//   console.log('New button is clicked!');
//   scores[0] = 0;
//   scores[1] = 0;
//   document.getElementById('score--0').textContent = 0;
//   document.getElementById('score--1').textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   document.getElementById('current--0').textContent = 0;
//   document.getElementById('current--1').textContent = 0;
//   //
//   if (activePlayer === 0) {
//     document
//       .querySelector(`.player--${activePlayer}`)
//       .classList.add('player--active');
//   } else {
//     document.querySelector(`.player--`).classList.toggle('player--active');
//     // document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
//   }

//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   //switchPlayer();
// });
