//* grab sites different containers for show/hiding
const homeContainer = document.querySelector("#home-container");
const quizContainer = document.querySelector("#quiz-container");
const userFinalScoreContainer = document.querySelector("#user-final-score-container");
const highScoresContainer = document.querySelector("#high-score-container");
const exitQuizContainer = document.querySelector("#exit-quiz-container");


//* grab the button elements for the event listeners
const playButton = document.querySelector("#btn-play-game");
const homeScreenButton = document.querySelector("#btn-view-home-screen");
const returnHomeScreenButton = document.querySelector("#btn-return-to-home-screen");
const viewHighScoresButton = document.querySelector("#btn-view-high-scores");
const saveScoreBtn = document.getElementById("btn-save-score");
const continuePlayingButton = document.querySelector("#btn-continue-playing");
const exitGame = document.getElementById("btn-exit-game");
const muteButton = document.getElementById("btn-mute");
const unMuteButton = document.getElementById("btn-unmute");
const showExitGameOptions = document.getElementById("exit-quiz-options");

//* Alter this set of variables for Quiz game play
const pointsPerCorrectAnswerEasy = 1; //* points for easy questions
const pointsPerCorrectAnswerMedium = 1.5; //* points for medium questions
const pointsPerCorrectAnswerHard = 2; //* points for hard questions
let pointsPerCorrectAnswer = pointsPerCorrectAnswerEasy; //default value for easy - 
const SetQtyOfQuestions = 10; //* amount of questions for the quiz
const highScoresToShow = 8; //* amount of high scores to shw in high score list
const qtyOfQuestionsToFetch = (SetQtyOfQuestions * 5); //* increase this value to increase the randomness of the questions, only fetching SetQtyOfQuestions value only pulls from the first section of the API 




//* Question and Answers
const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answers-text"));



//* Scoring and scores
const scoreText = document.querySelector("#score");
const playerFinalScore = document.getElementById("playerFinalScore");
const mostRecentScore = sessionStorage.getItem("mostRecentScore");
const username = document.getElementById("username");


let highScores = [];
const highScoresList = document.querySelector(".highScoresList");
const endGameHighScoresList = document.querySelector(".endGameHighScoresList");

const loadingSpinner = document.querySelector("#loadingSpinner");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

//* Game Progress
const progressText = document.getElementById("progressText");
const progressBarFull = document.querySelector("#progressBarFull");

//*Sound Effects
this.soundCorrect = new Audio("assets/sounds/sound-correct.mp3");
this.soundIncorrect = new Audio("assets/sounds/sound-incorrect.mp3");
this.soundCorrect.volume = 0.5;
this.soundIncorrect.volume = 0.5;

//* event listeners
homeScreenButton.addEventListener("click", returnToHomeScreen);
returnHomeScreenButton.addEventListener("click", returnToHomeScreen);
viewHighScoresButton.addEventListener("click", showHighScoresScreen);
muteButton.addEventListener("click", sfxMuted);
unMuteButton.addEventListener("click", sfxPlay);
showExitGameOptions.addEventListener("click", showExitQuizContainer);
exitGame.addEventListener("click", returnToHomeScreen);
continuePlayingButton.addEventListener("click", closeExitOverlayScreen);
playButton.addEventListener("click", startQuiz);

/** Function to mute the correct and incorrect SFX audio */
function sfxMuted() {
	soundCorrect.muted = true;
	soundIncorrect.muted = true;
	muteButton.classList.add("hidden");
	unMuteButton.classList.remove("hidden");
}

/** Function to un-mute the correct and incorrect SFX audio */
function sfxPlay() {
	soundCorrect.muted = false;
	soundIncorrect.muted = false;
	unMuteButton.classList.add("hidden");
	muteButton.classList.remove("hidden");
}

/** Function to add the points information to the home screen. */
function addPointsInformationToTheHomePage() {
	let pointsInformation = document.getElementById("points-information");
	let pointsInformationText = `Easy - ${pointsPerCorrectAnswerEasy} point per question, Medium - ${pointsPerCorrectAnswerMedium} points per question<br> and Hard - ${pointsPerCorrectAnswerHard} points per question`;
	pointsInformation.innerHTML = pointsInformationText;
}
addPointsInformationToTheHomePage();

//* Quiz difficulty and API information
let level = document.getElementById("selectLevelRef").value;
let quizUrl = `https://opentdb.com/api.php?amount=${qtyOfQuestionsToFetch}&category=11&difficulty=easy&type=multiple`;


//* function to hide the welcome page and show the quiz
function showQuizContainer() {
	homeContainer.classList.add("hidden");
	quizContainer.classList.remove("hidden");
	muteButton.classList.remove("hidden");

}

//* function to return to the home screen
function returnToHomeScreen() {
	//* just in case some containers are visible this will add the hidden class to them
	quizContainer.classList.add("hidden");
	userFinalScoreContainer.classList.add("hidden");
	highScoresContainer.classList.add("hidden");
	muteButton.classList.add("hidden");
	unMuteButton.classList.add("hidden");
	exitQuizContainer.classList.add("hidden");

	//* removes the hidden class from the home container
	homeContainer.classList.remove("hidden");
}

//* function to hide the welcome page and show the quiz
function showExitQuizContainer() {
	exitQuizContainer.classList.remove("hidden");

}

//* function Exit quiz Yes or No
function closeExitOverlayScreen() {
	exitQuizContainer.classList.add("hidden");
}


/** function to add sample points to the session storage, The first statement checks if the one time function has NOT been executed before */
window.onload = function () {
	if (sessionStorage.getItem("hasSampleScoresBeenAddedBefore") == null) {
		/** this is to add some sample high scores to local storage */
		let letsAddSomeSampleHighScores = [{
				"score": Math.floor(Math.random() * (SetQtyOfQuestions+1))*pointsPerCorrectAnswerHard,
				"name": "Ms PacMan"
			},
			{
				"score": Math.floor(Math.random() * (SetQtyOfQuestions+1))*pointsPerCorrectAnswerHard,
				"name": "Gandalf"
			},
			{
				"score": Math.floor(Math.random() * (SetQtyOfQuestions+1))*pointsPerCorrectAnswerMedium,
				"name": "ALF"
			},
			{
				"score": Math.floor(Math.random() * (SetQtyOfQuestions+1))*pointsPerCorrectAnswerMedium,
				"name": "Kermit"
			},
			{
				"score": Math.floor(Math.random() * (SetQtyOfQuestions+1))*pointsPerCorrectAnswerEasy,
				"name": "Miss Piggy"
			},
			{
				"score": Math.floor(Math.random() * (SetQtyOfQuestions+1))*pointsPerCorrectAnswerEasy,
				"name": "Papa Smurf"
			}
		];

		sessionStorage.setItem("highScores", JSON.stringify(letsAddSomeSampleHighScores));
		sessionStorage.setItem("hasSampleScoresBeenAddedBefore", true);
		highScoresRetrieveAndSort();
	}


};

//* function to start the game
 function startQuiz(){
	showQuizContainer();
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
	loadingSpinner.classList.add("hidden");
}


/** function to set the correct points per question dependant on the user selected difficulty level
 */
function pointsPerQuestion() {
	if (level == "hard") {
		pointsPerCorrectAnswer = pointsPerCorrectAnswerHard;
	} else if (level == "medium") {
		pointsPerCorrectAnswer = pointsPerCorrectAnswerMedium;
	} else {
		pointsPerCorrectAnswer = pointsPerCorrectAnswerEasy;
	}
}

/** function to sort the high scores numerically */
function highScoresRetrieveAndSort() {
	highScores = JSON.parse(sessionStorage.getItem("highScores")) || [];
	highScores.sort((a, b) => {
		return b.score - a.score;
	});
}

/** function to allow the user to select a difficulty level for the quiz */
function updateQuizLevel() {
	level = document.getElementById("selectLevelRef").value;
	quizUrl = `https://opentdb.com/api.php?amount=${qtyOfQuestionsToFetch}&category=9&difficulty=${level}&type=multiple`;
	pointsPerQuestion();
	sessionStorage.setItem("API-URL", quizUrl);
}

/** Function to fetch the questions from an API using the user selected difficulty as the quiz level and map the question to an array */
fetch(quizUrl)
	.then((res) => {
		return res.json();
	})
	.then((loadedQuestions) => {
		questions = loadedQuestions.results.map((loadedQuestion) => {
			const formattedQuestion = {
				question: loadedQuestion.question,
			};
			const availableAnswers = [...loadedQuestion.incorrect_answers];
			formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
			availableAnswers.splice(
				formattedQuestion.answer - 1,
				0,
				loadedQuestion.correct_answer
			);

			availableAnswers.forEach((answers, index) => {
				formattedQuestion["answers" + (index + 1)] = answers;
			});

			return formattedQuestion;
		});

	})
	.catch((err) => {
		console.error(err);
	});

/**Function checks if the maximum amount of questions per quiz has been reached */
function maxQuestionsReached() {
	// checking if maximum availableQuestions has been reached and if so go to user final score page
	if (availableQuestions.length === 0 || questionCounter >= SetQtyOfQuestions) {
		sessionStorage.setItem("mostRecentScore", score);
		endGameHighScores();
		quizContainer.classList.add("hidden");
		userFinalScoreContainer.classList.remove("hidden");
		muteButton.classList.add("hidden");
		unMuteButton.classList.add("hidden");
	}
}

/**  Function to sort the questions */
getNewQuestion = () => {
	maxQuestionsReached();

	questionCounter++;

	//Updates the progress bar
	progressText.innerText = `Question ${questionCounter}/${SetQtyOfQuestions}`;

	progressBarFull.style.width = `${(questionCounter / SetQtyOfQuestions) * 100}%`;
	if (availableQuestions.length === 0 || questionCounter >= SetQtyOfQuestions) {
		progressBarFull.classList.add("progress-bar-rounded");
	}

	//creates a random number between 1 and the qty of remaining questions and sets the current question to that question number
	const questionIndex = Math.floor(Math.random() * (qtyOfQuestionsToFetch - (questionCounter - 1 )));
	currentQuestion = availableQuestions[questionIndex];

	// adds current question to the Question section 
	question.innerHTML = currentQuestion.question;

	// gets the correct answer information from the set of questions
	answers.forEach((answers) => {
		const number = answers.dataset.number;
		answers.innerHTML = currentQuestion["answers" + number];
	});
	//removes the current question from the available questions list
	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers = true;
};

//*check which answer the user has chosen
answers.forEach((answers) => {
	answers.addEventListener("click", (e) => {
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedAnswers = e.target;
		const selectedAnswer = selectedAnswers.dataset.number;

		//check if the user has selected the correct answer 
		const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
		//if  answer correct increase the user score
		if (classToApply === "correct") {
			incrementScore(pointsPerCorrectAnswer);
			soundCorrect.play();
		} else {
			soundIncorrect.play();
		}

		selectedAnswers.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedAnswers.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1500);
	});
});


//** Function to update the users score */ 
incrementScore = (questionPointsValue) => {
	score += questionPointsValue;
	scoreText.innerText = score;
	playerFinalScore.innerText = score;

};


//*event listener to allow user to click the save button once username entered
username.addEventListener("keyup", () => {
	saveScoreBtn.disabled = !username.value;
});

const saveHighScore = document.querySelector("#btn-save-score");
saveHighScore.addEventListener("click", saveTheHighScore);
//*function to save the high score
function saveTheHighScore(submit) {
	
	submit.preventDefault();

	const score = {
		score: playerFinalScore.innerText,
		name: username.value
	};
	highScores.push(score);
	highScores.sort((a, b) => b.score - a.score);
	highScores.splice(highScoresToShow);

	sessionStorage.setItem("highScores", JSON.stringify(highScores));
	window.location.assign("index.html");
}


//*high scores added to the high score list if user saves the score
function endGameHighScores() {
	highScoresRetrieveAndSort();
	endGameHighScoresList.innerHTML = highScores
		.map(score => {
			return `<li class="high-score"><span>${score.score}</span><span>${score.name}</span</li>`;
		})
		.join("");
}


//* function to show the high Scores
function showHighScoresScreen() {
	highScoresRetrieveAndSort();

	homeContainer.classList.add("hidden");
	highScoresContainer.classList.remove("hidden");

	highScoresList.innerHTML = highScores
		.map(score => {
			return `<li class="high-score"><span>${score.score}</span><span>${score.name}</span</li>`;
		})
		.join("");
}

