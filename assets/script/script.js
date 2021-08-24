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

//* Game Progress
const progressText = document.getElementById('progressText');
const progressBarFull = document.querySelector('#progressBarFull');

//*Sound Effects
this.soundCorrect = new Audio("assets/sounds/sound-correct.mp3");
this.soundIncorrect = new Audio('assets/sounds/sound-incorrect.mp3');
// amend volume to .2 volume.  Use this to mute later
this.soundCorrect.volume = .2;
this.soundIncorrect.volume = .2;

const loadingSpinner = document.querySelector('#loadingSpinner');

const username = document.getElementById('username');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let pointsPerCorrectAnswer = pointsPerCorrectAnswerEasy; //default value for easy - 
let questions = [];


/** Function to add the points information to the home screen. */
function addPointsInformationToTheHomePage(){
let pointsInformation = document.getElementById('points-information');
let pointsInformationText = `Easy - ${pointsPerCorrectAnswerEasy} point per question, Medium - ${pointsPerCorrectAnswerMedium} points per question<br> and Hard - ${pointsPerCorrectAnswerHard} points per question`;
pointsInformation.innerHTML = pointsInformationText;
}
addPointsInformationToTheHomePage();

//* Quiz difficulty and API information
let level = document.getElementById("selectLevelRef").value;
let quizUrl = `https://opentdb.com/api.php?amount=${qtyOfQuestionsToFetch}&category=11&difficulty=easy&type=multiple`;
