//* grab sites different containers for show/hiding
const homeContainer = document.querySelector('#home-container');
const quizContainer = document.querySelector('#quiz-container');
const userFinalScoreContainer = document.querySelector('#user-final-score-container');
const highScoresContainer = document.querySelector('#high-score-container');

//* grab the button elements for the event listeners
const playButton = document.querySelector('#btn-play-game');
const homeScreenButton = document.querySelector('#btn-view-home-screen');
const returnHomeScreenButton = document.querySelector('#btn-return-to-home-screen');
const viewHighScoresButton = document.querySelector('#btn-view-high-scores');
const saveScoreBtn = document.getElementById('btn-save-score');

//* Question and Answers
const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answers-text'));
const SetQtyOfQuestions = 10;
//* increase this value to increase the randomness of the questions
const qtyOfQuestionsToFetch = 40;

//* Scoring and scores
const scoreText = document.querySelector('#score');
const playerFinalScore = document.getElementById('playerFinalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const highScoresToShow = 8;

//* Points for question difficulties - Remember to update home container points information if altering
const pointsPerCorrectAnswerEasy = 1
const pointsPerCorrectAnswerMedium = 1.5
const pointsPerCorrectAnswerHard = 2
