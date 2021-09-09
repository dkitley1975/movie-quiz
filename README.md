# Movie Questions

![Responsive mock up](./docs/screenshots/screen-view-mockup-image.png)
Welcome, this is my movie question site.
The goal of the site is to provide a fun quiz game with 10 questions, with an option to choose a difficulty level which will vary the points per question. These questions are fetched from [Open Trivia (API) Database](https://opentdb.com/api_config.php)

Thank you for visiting [my project!](https://dkitley1975.github.io/movie-quiz/)

- [Movie Questions](#movie-questions)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Typeface](#typeface)
    - [Colours](#colours)
    - [Sounds](#sounds)
    - [Features Left to Implement](#features-left-to-implement)
  - [Testing](#testing)
    - [Chrome Lighthouse Report](#chrome-lighthouse-report)
    - [Validator Testing](#validator-testing)
    - [Unfixed Bugs](#unfixed-bugs)
  - [Deployment](#deployment)
  - [Credits](#credits)
    - [Media](#media)
    - [Special Thanks](#special-thanks)

[Table of contents was generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/')

## Project Overview

This Movie Quiz is a website that aims to provide a fun challenge to the end user with a quiz. This site has been created as part of my Portfolio Project 2 for Code Institute, the site is aimed to show my newly developing knowledge of JavaScript whilst continuing to develop my HTML and CSS.

__Site User Goals:__

- I want to be able to an online quiz to test my knowledge of movies.
- I want to be able to select a difficulty level for the quiz.
- I want to see my progress whilst playing the quiz game.
- I want to track my score during the quiz game of how many points I have and how many questions have been asked.
- I want to view my final score after quiz game has ended and to save this if I wish.
- I want to be able to replay the quiz game without repeating te same questions each time.
- I want to view the high scores table of previously saved scores.
- I want to have the option to quit the quiz prior to finishing it.

 __Site Owner Goals:__

- I want to provide a challenging quiz to entertain online users.
- I want to let the user to be able to easily navigate through the site and game without encountering much difficulty.
- I want the user to return and replay the quiz.
- I want the user to record their high scores to give incentive to return to replay the game to improve the score.
- I want the user to be able to select a difficulty level for the the questions.
- I want the difficulty of the questions to reflect on the value of points per question.

## Features

- __Favicons__

  ![Favicon](./docs/screenshots/apple-touch-icon.png)

  Favicons have been added to include the favicon within the address bar, as the bookmark icon and the bookmark icon on apple devices.

- __The Welcome Page__

  - The welcome page displays and image in the background with a glass style container floating above. This container blurs the image below, this 'glass' container is used through out the quiz app for all the sections.
  - The container contains the logo with brief instructions explaining the point scoring system.
  - The buttons are self-explanatory.
    - A button with a dropdown list for the difficulty level.
    - A button to play the game, and a button, and
    - A button to view the high scores.

The points values are input within the Javascript file which updates the text on the welcome page, this ensures that if the scores are updated, the welcome page points section does not require updating manually.
  
  ![Welcome Page](./docs/screenshots/home-page-mobile.png)

- __The Level Selection Process__

  A self intuitive level selection process was used for the game which defaults to easy.
  - The obvious difficulty levels are:
    - Easy.
    - Medium, and
    - Hard.
  
  ![Level Selection](./docs/screenshots/level-difficulty-selection-mobile.png)

-__High Scores Section__
This section has a table created from the users session storage, when first opening the session storage is populated with some example names and scores from the Javascript file, this ensures that the high scores page isn't blank when opening.
There is also included a button to return to the home screen.
There are 6 sample high scores added to the storage the points values are created randomly using the point values and the total amount of questions to be asked within the quiz. This is calculated twice for the Hard, Medium and Easy values
    `Math.floor(Math.random() * (SetQtyOfQuestions + 1)) * pointsPerCorrectAnswerHard`
  
  ![High Scores](./docs/screenshots/high-scores-page-mobile.png)
  
- __The Quiz Section__

  - The quiz page included the logo at the top.
  - The questions are populated from the randomly from the questions fetched from [Open Trivia (API) Database](https://opentdb.com/api_config.php). These questions are obtained according to the difficulty level selected by the user. Instead of just 10 questions fetched from the API there is a factor of 5 (again determined within the Javascript file) to help the randomness to the questions. on testing if only 10 questions are fetched from the API it was the same 10 questions fetched each time, spoiling the quiz game play on any repeat attempts.
  - When an answer is selected the question either lights up Red for incorrect or green for correct.
  - When an answer is selected there is a sound, either a buzz or a ding to indicate if the answer was incorrect or correct, this feature is able to be turned off or on by the mute/play button at the bottom right of the play screen.
  - Beneath the answers there is a progress section, this has a question counter with a progress bar, the progress bar has rounded corners with the internal bar being flat on the right until the final question when this too becomes rounded.
  - There is also the scoring on the right, this is increased each time a question is answered correctly according to the point value indicated by the difficulty level selected by the user.
  - Just encase the user becomes board during the game play (although I couldn't possible see why they would) There is an exit game button. This overlays an exit screen over the quiz with a warning that exiting at this time will loose the current quiz session and score, with two buttons.
    - A green button to continue back to the quiz, and
    - A red button to return to the welcome screen

  ![The Quiz](./docs/screenshots/quiz-page-ipad.png)
  ![The Exit Quiz](./docs/screenshots/exit-quiz-ipad.png)
- __Submitting High Scores__

  - After completing the quiz, the user has an option to save their score and play again or not to save and play again.
  - The score is submitted and only the top 8 scores retained. This retention value is easily amended within the top section of the Javascript file.
  
  ![Submitting the high score](./docs/screenshots/submit-high-scores-page-ipad.png)
  ![Submitted high score](./docs/screenshots/submitted-high-scores-page-ipad.png)
  
## Typeface

In order to find appropriate typefaces for my website, I have visited [Google Fonts](https://fonts.google.com/ "Google Fonts") to explore the various options.
For the main body text I have chosen the google typeface Montserrat. This is a visually appealing and easy to read typeface.
For the headings I wanted a slightly different typeface. I explored for headings and choose the google font Limelight.
This font is visually appealing and pairs well with the typeface Montserrat.

  ![Typefaces](./docs/screenshots/font-pairings.png)

### Colours

I based my color scheme on a pallet devised around the primary red and green colours for the correct and incorrect indicators on the quiz answers, these primary colours matched well with the background image chosen to display throughout the app.

- #33C261 This color is the Green I chose to indicate a correct answer within the quiz.
- #C24444 This color is the Red I chose to indicate an incorrect answer within the quiz.
- #6EC2B5 is a pale Bue/Green which goes well with the background image.
- #78A5C2 is a Blue which goes well with the background colour and contrasts well against the Red and Green.
- #BE5B8D is a dark Pink which stands out well against the other colours but compliments them all well, this colour is used as the logo colour and progress bar and current score.
- The main colour of my text is to be black.

I have used to contract checker on Coolors in order to make sure that the contract is sufficient.
This way my content will be easily readable.
![Color Scheme](./docs/screenshots/colour-swatch.png)

### Sounds

I have implemented a sound to indicate a correct and an incorrect answer, I have added a mute icon to the quiz container to allow the user to select if they wish to hear the confirmation sounds.
The user selection is also added into the session storage, this way at the end of the game and the user plays again, the mute/play sound status is recalled from the storage and is continued to implemented within the game play.

### Features Left to Implement

- If the amount of high scores are at the maximum allowed, then check if the user score is higher than the lowest of the high scores and if not to hide the enter a username and submit high score button, replacing them with a try again message.

## Testing

### Chrome Lighthouse Report

  I tested the [live site](dkitley1975.github.io/movie-quiz/)
  with the lighthouse extension, this showed a few performance improvements were required, I reduced the size of the images to achieve this.

  ![Lighthouse Report](./docs/screenshots/lighthouse-report.png)
  [See Report](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fdkitley1975.github.io%2Fmovie-quiz%2F&strategy=desktop&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext#pwa)

### Validator Testing

- HTML - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fdkitley1975.github.io%2Fmovie-quiz%2Findex.html)
  - Three warnings are given regarding empty headings, these sections are filled from within the JavaScript file during game play.
- CSS -  No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvalidator.w3.org%2Fnu%2F%3Fdoc%3Dhttps%253A%252F%252Fdkitley1975.github.io%252Fmovie-quiz%252Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
- Javascript - One warning showing an unused variable (updateQuizLevel), however this is the function used to update the quiz level. [(JSHint.com) validator](https://jshint.com/)

### Unfixed Bugs

Whilst testing within the developer tools within the web browsers no issues were identified visually, but whilst testing on an iphone the address bar and navigation bar on Safari and Chrome interfered with the margins and the centralisation of the container. This didn't replicate in Edge or Firefox. I out reached for Tutor support to help resolve this issue and unfortunately the issue was unable to be fixed, at this time. I did increase the margin and padding to help reduce the problem, whilst ensuring the content fitted within the screen.
It is noticed that if the user adds the bookmark to the home screen, when the web page is opened the tool bars are hidden by request and the page is centralized and has no issues.

## Deployment

This project was deployed via GitHub by executing the following steps.
After writing the code, committing and pushing it to GitHub:

1. Navigate to the repository on github and click **Settings**.
2. From there, go to the **Source section** within the Github Pages section.
3. Select **master branch** on the dropdown menu, and click save.
4. Now the website is [live here](https://dkitley1975.github.io/movie-quiz/)
5. Any time commits and pushes are sent to Github, the Github Pages site should update shortly after.

To run the project locally:

1. Click the **green Clone or Download button** on the Github Repository
2. Using the **Clone with HTTPS option**, copy the link displayed.
3. Open your IDE, and ensure the Git Terminal is open.
4. Change the working directory to the location where the cloned directory is to go.
5. Use the **"git clone" command** and paste the [url](https://github.com/dkitley1975/movie-quiz.git) copied in the second step.

## Credits

  I watched multiple You Tube videos on creating quizzes, after watching a few, most of these all followed the same approach, down to the order of creation and colours used within the site. I had previously followed [Build a Quiz App by James Q Quick](https://www.youtube.com/watch?v=u98ROZjBWy8&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx) and this was used as the initial inspiration and valued practice for this project. The ideas practised whilst watching this tutorial have been heavily built on and added to

### Media

- The icons for the audio mute and play are from [Font Awesome](https://fontawesome.com/)
- The Correct and Incorrect SFX are from [My Instants](https://www.myinstants.com/)
- Mock up graphic from [Am I Responsive](http://ami.responsivedesign.is/).

### Special Thanks

Special thanks to my mentor Simen Daehlin. Without his encouragement I wouldn't of considered to attempt to try this as as my second project, and for the help and pointers he provided along along the way.

Well thanks for reading all the way to the bottom, and for visiting this [my second project](https://dkitley1975.github.io/movie-quiz/)
