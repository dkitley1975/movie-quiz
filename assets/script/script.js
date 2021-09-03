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

//* Question and Answers
const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answers-text"));
const SetQtyOfQuestions = 2;
//* increase this value to increase the randomness of the questions, only fetching SetQtyOfQuestions value only pulls from the first section of the API 
const qtyOfQuestionsToFetch = (SetQtyOfQuestions * 5);

//* Scoring and scores
const scoreText = document.querySelector("#score");
const playerFinalScore = document.getElementById("playerFinalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScoresToShow = 8;


//* Points for question difficulties - Remember to update home container points information if altering
const pointsPerCorrectAnswerEasy = 1;
const pointsPerCorrectAnswerMedium = 1.5;
const pointsPerCorrectAnswerHard = 2;

//* Game Progress
const progressText = document.getElementById("progressText");
const progressBarFull = document.querySelector("#progressBarFull");

//*Sound Effects
this.soundCorrect = new Audio("assets/sounds/sound-correct.mp3");
this.soundIncorrect = new Audio("assets/sounds/sound-incorrect.mp3");
// amend volume to .2 volume.  Use this to mute later
this.soundCorrect.volume = 0.7;
this.soundIncorrect.volume = 0.7;

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

const loadingSpinner = document.querySelector("#loadingSpinner");

const username = document.getElementById("username");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let pointsPerCorrectAnswer = pointsPerCorrectAnswerEasy; //default value for easy - 
let questions = [];


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
	console.log("clicked exit game");
	exitQuizContainer.classList.remove("hidden");

}

//* function Exit quiz Yes or No
function closeExitOverlayScreen() {
	console.log("chosen to continue playing game");
	exitQuizContainer.classList.add("hidden");
}


/** function tThe statement checks if the one time function has NOT been executed before */
window.onload = function () {
	if (localStorage.getItem("hasSampleScoresBeenAddedBefore") == null) {

		/** this is to add some sample high scores to local storage */
		let letsAddSomeSampleHighScores = [{
				"score": "16",
				"name": "Ms PacMan"
			},
			{
				"score": "14",
				"name": "Gandalf"
			},
			{
				"score": "12",
				"name": "ALF"
			},
			{
				"score": "10",
				"name": "Kermit"
			},
			{
				"score": "8",
				"name": "Miss Piggy"
			},
			{
				"score": "8",
				"name": "Papa Smurf"
			}
		];

		localStorage.setItem("highScores", JSON.stringify(letsAddSomeSampleHighScores));
		console.log("adding some temp high scores"),
		localStorage.setItem("hasSampleScoresBeenAddedBefore",true);
		console.log(highScores);

	}
};


//* function to start the game
const startQuiz = () => {
	showQuizContainer(),
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
	loadingSpinner.classList.add("hidden");
};

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

/** function to allow the user to select a difficulty level for the quiz */
function updateQuizLevel() {
	level = document.getElementById("selectLevelRef").value;
	quizUrl = `https://opentdb.com/api.php?amount=${qtyOfQuestionsToFetch}&category=9&difficulty=${level}&type=multiple`;
	pointsPerQuestion();
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
		localStorage.setItem("mostRecentScore", score);
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
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
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
	console.log("After this question these are the available questions ", availableQuestions);
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
incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
	playerFinalScore.innerText = score;

};


//*event listener to allow user to click the save button once username entered
username.addEventListener("keyup", () => {
	saveScoreBtn.disabled = !username.value;
});


//*function to save the high score
const highScoresList = document.getElementById("high-scores-list");

saveHighScore = e => {
	e.preventDefault();

	const score = {
		score: playerFinalScore.innerText,
		name: username.value
	};

	highScores.push(score);

	highScores.sort((a, b) => {
		return b.score - a.score;
	});

	highScores.splice(highScoresToShow);

	localStorage.setItem("highScores", JSON.stringify(highScores));
	window.location.assign("index.html");
};


//*high scores added to the high score list if user saves the score
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
highScoresList.innerHTML = highScores
	.map(score => {
		return `<tr>
    <td>${score.name}</td>
    <td>${score.score}</td>
    </tr>`;
	})
	.join("");


//* function to show the high Scores
function showHighScoresScreen() {
	homeContainer.classList.add("hidden");
	highScoresContainer.classList.remove("hidden");
	const prevHighScoresList = document.getElementById("prev-high-scores-list");
	highScores = JSON.parse(localStorage.getItem("highScores")) || [];

	prevHighScoresList.innerHTML = highScores
		.map(score => {
			return `<tr>
    <td>${score.name}</td>
    <td>${score.score}</td>
    </tr>`;
		})
		.join("");
}


//* event listener to start the quiz game once clicked
playButton.addEventListener("click", startQuiz);
//* event listener to return to the home screen once clicked
homeScreenButton.addEventListener("click", returnToHomeScreen);
returnHomeScreenButton.addEventListener("click", returnToHomeScreen);
//* event listener to display the high scores once clicked
viewHighScoresButton.addEventListener("click", showHighScoresScreen);
//* event listener to mute the SFX once clicked
muteButton.addEventListener("click", sfxMuted);
//* event listener to un-mute the SFX once clicked
unMuteButton.addEventListener("click", sfxPlay);
//* event listener to un-mute the SFX once clicked
showExitGameOptions.addEventListener("click", showExitQuizContainer);


//* event listener to Exit the quiz game and return home once clicked
exitGame.addEventListener("click", returnToHomeScreen);
//* event listener to return to the game once clicked
continuePlayingButton.addEventListener("click", closeExitOverlayScreen);