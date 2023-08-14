'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScoreField0 = document.getElementById('current--0');
const currentScoreField1 = document.getElementById('current--1');
const p1ScoreField = document.getElementById('score--0');
const p2ScoreField = document.getElementById('score--1');
const btnNewGame = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let currScore = 0;
let p1Score = 0;
let p2Score = 0;
let p1Playing = true;
let gameOver = false;

const resetGame = function () {
  p1Playing = true;
  gameOver = false;
  p1Score = 0;
  p2Score = 0;
  diceImg.src = 'dice-1.png';
  currentScoreField0.textContent = 0;
  currentScoreField1.textContent = 0;
  p1ScoreField.textContent = p1Score;
  p2ScoreField.textContent = p2Score;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};

const genNum = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

const switchPlayer = function () {
  currScore = 0;
  currentScoreField0.textContent = currScore;
  currentScoreField1.textContent = currScore;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  if (p1Playing) p1Playing = false;
  else p1Playing = true;
};

const setScore = function () {
  if (p1Playing) {
    p1Score += currScore;
    if (p1Score >= 100) {
      gameOver = true;
      player1.classList.add('player--winner');
    }
    p1ScoreField.textContent = p1Score;
  } else {
    p2Score += currScore;
    if (p2Score >= 100) {
      gameOver = true;
      player2.classList.add('player--winner');
    }
    p2ScoreField.textContent = p2Score;
  }
};

resetGame();

if (!gameOver) {
  btnRoll.addEventListener('click', function () {
    let dice = genNum();
    diceImg.src = `dice-${dice}.png`;
    if (dice == 1) {
      switchPlayer();
    } else {
      currScore += dice;
      if (p1Playing) currentScoreField0.textContent = currScore;
      else currentScoreField1.textContent = currScore;
    }
  });

  btnHold.addEventListener('click', function () {
    setScore();
    switchPlayer();
  });
}
btnNewGame.addEventListener('click', resetGame);
