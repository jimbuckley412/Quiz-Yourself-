// I like modern js better than old version js.

// Questions for the quizData
const quizData = [
  {
    
    // modeled with a question, options, and answer
    question: 'What are the two words every programmer learns first?',
    options: ['Hello, world', 'Goodbye, hello', 'World, hello ', 'Hello, Goodbye'],
    answer: 'Hello, world',
  },
  {
    question: 'What is the most popular programming problem?',
    options: ['<', ';', ':', ','],
    answer: ';',
  },
  {
    question: 'What is the greatest fear of programmers?',
    options: ['Math', 'Learning', 'Delete', 'Not Saving'],
    answer: 'Not Saving',
  },
  {
    question: 'In javaScript what is the block of code called, that is used to perform a specific task?',
    options: ['Declaration', 'variable', 'function', 'string'],
    answer: 'function',
  },
  {
    question: 'What is the most popular programming language?',
    options: ['javaScript', 'html', 'Ruby', 'SWIFT'],
    answer: 'javaScript',
  },
  {
    question: 'WHat is the object called that lets you work with dates and time related dates?',
    options: ['Clock', 'Time Zone', 'Date field', 'Dates'],
    answer: 'Dates',
  },
  {
    question: 'WHat kind of statement is used to execute actions based on a trigger or condition?',
    options: ['Regular Expression', 'Conditional Statement', 'Boolean Variable', 'Fired Event'],
    answer: 'Conditional Statement',
  },
  {
    question: 'What tag is used to define an unordered list?',
    options: ['<li>', '<u>', '<s>', '<ul>'],
    answer: '<ul>',
  },
  {
    question: 'What tag is used to define a hyperlink?',
    options: ['<blockquote>', '<em>', '<a>', '<strong>'],
    answer: '<a>',
  },
  {
    question: 'what tag is used to define the bottom most section of the HTML?',
    options: ['<h1>', '<body>', '<header>', '<footer>'],
    answer: '<footer>',
  },
];

// const needed to run a quiz with links to the html
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const startQuizButton = document.getElementById('startQuiz');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const formContainer = document.getElementById('firstName');

// let statement starts at question 0 or (#1)
let currentQuestion = 0;

// because I am using const which can only be assigned 1 variable,
// I made this into an empty array so it can use more than one value 
// for your incorrect score value
const incorrectAnswers = [];
let startTime;

// hard set time limit of 60 seconds
const timeLimit = 60;

// score starts at 0 for each game
let score = 0;

// quiz click event listeners
startQuizButton.addEventListener("click", startQuiz);
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

// function startQuiz
function startQuiz() {

  // startQuizButton will disappear after click
  startQuizButton.style.display = 'none';

  // the submitButton will appear instead to submit your answers 
  submitButton.style.display = 'inline-block';

  // display the questions created in line 2
  displayQuestion();

  // start 60 second timer
  startTimer();
}

// function to start timer
function startTimer() {
  
  // created a countdownElement attached to the html
  const countdownElement = document.getElementById('countdown');
  let count = timeLimit;
  countdownElement.textContent = count;
  
  // function to set up update 
  function update() {
    
    // if all the questions are answered the countdown will stop
    if (currentQuestion >= quizData.length) {
      return;
    }
    
    // if the countdown greater than 0
    if (count > 0) {

      // countdown -1 second at at time
      count--;
      countdownElement.textContent = count;

      // will update the countdown every 1 seconds
      setTimeout(update, 1000);

      // else if the timer is up the quiz will stop
    } else {
      alert("Time's up! Quiz is complete.");

      // check your answers to see how many you got right
      checkAnswer();
    }
  }

  update();
}

// function to randomy shuffle the question answer order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// function will display the question on the screen
function displayQuestion() {
  
  // start the timer on first question display puts a time stamp on this quiz.
  startTime = Date.now();
  const questionData = quizData[currentQuestion];
  
  // for the question elements i created a div
  const questionElement = document.createElement('div');
  
  // created a class name 'question'
  questionElement.className = 'question';

  // added the questions from above to the created div
  questionElement.innerHTML = questionData.question;

  // created another div to show the question option answers on the div
  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  // adds in the rand question option answer so the correct answer is not in the same place every time
  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    // creates the shuffled input elements for the question option answers.
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];
    
    const optionText = document.createTextNode(shuffledOptions[i]);

    // attaches the radio to the answer options
    // attaches the text to the options
    // attaches the option to option display element
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  // secures the question element to the quiz container
  // secures the randomized option element to the quiz container
  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);

  startTimer();
}

// function to check the answer and get score for each question
function checkAnswer() {

  // if your selectedOption attached by clicking an input checkbox
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {

    // end time is when you hit submit with your answer time stamped
    const endTime = Date.now();

    // time taken endTime - startTime
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const answer = selectedOption.value;

    // !!!!I CHOSE THIS TYPE OF SCORE ON PURPOSE!!!!
    // I WANTED MORE POINTS SCORED FOR A HIGHER GRADE
    // I INTENTIONALLY SET THE MATH UP LIKE THIS VS A LOWER SCORE
    // so the score will take the time limit of 60 seconds and subtract the time taken time stamped 
    // so the faster you answer correctly the higher your score can be. 
    // I want my high score to be in the 500 to 590 range vs the 20 to 30 range.
    // Makes you feel better when you get a high score not a low score!
    if (answer === quizData[currentQuestion].answer) {
      score += timeLimit - timeTaken;

    // the else statement is if you answer incorrectly your score.
    // will decrease by the time limit - time taken and an addition 10 points
    // so we reward well but we punish just as much...
    // sprinkles are for winners  
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
        score: timeLimit - timeTaken - 10,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

// function will display the results change buttons "After Quiz mode" 
function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  formContainer.style.display = 'inline-block';
  submitScoreButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length * timeLimit}!`;
}

// function to retry for a higher score buttons change to "take quiz form"
// VS "After Quiz mode"
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers.length = 0;
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  formContainer.style.display = 'none';
  submitScoreButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

// function if you click show answer
function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';
  formContainer.style.display = 'none';
  submitScoreButton.style.display = 'none';
  
  // shows the incorect answers on the screen 
  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  // also shows your results and score
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

// const needed for localStorage of high scores
const highScoreDisplayEl = document.getElementById('highScoresDisplay');
const highScoresButton = document.getElementById('highScores');
const highScoreName = document.getElementById('firstNameText');
const submitScoreButton = document.getElementById('submitHighScores');

submitScoreButton.addEventListener('click', () => {
  saveHighScoreNames();
  saveHighScores();
  submitHighScores();
});

// function to save High Score Name 
function saveHighScoreNames (firstNameText) {
  localStorage.setItem('firstNameText', JSON.stringify(firstNameText));
}

// function to save score from above to JSON string value
function saveHighScores(score) {
  localStorage.setItem('score', JSON.stringify(score));
}

// function to submit high scores 
function submitHighScores(event) {
  event.preventDefault();

  const highScoreNameEl = document.getElementById('highScoreName');
  const highScoreDateEl = document.getElementById('highScoreDate');
  const highScoreEl = document.getElementById('highScore');

  const name = highScoreNameEl.value.trim();
  console.log (name);
  const date = highScoreDateEl.value;
  console.log(date);
  let highScore = highScoreEl.value;
  console.log(highScore);

  const newHighScore = {
    name: name,
    date: date,
    text: highScore,
  };

  const highScores = readHighScoresFromStorage();
  highScores.push(newHighScore);
  saveHighScores(highScores);

  printHighScores();

  highScoreNameEl.value = '';
  highScoreDateEl.value = '';
  highScoreEl.value = '';
}

// function to readHighscores in storage
function readHighScoresFromStorage() {
  let score = JSON.parse(localStorage.getItem('score')) || [];
  if (score) {
    score = JSON.parse(score);
  } else {
    score = [];
  }
  return score;
}

// high scores button on click will open a new window then print the high scores
highScoresButton.addEventListener('click', () => {
  window.open('', '_blank');
  printHighScores();
});

//function to print high scores
function printHighScores() {
  highScoreDisplayEl.innerHTML = '';

  let score = readHighScoresFromStorage();

  for (let i = 0; i < score.length; i++) {
    const highScore = score[i];
    const highScoreDate = dayjs(highScore.date);

    const rowEl = document.createElement('ul');
    let highScoreEl = document.createElement('li');
    highScoreEl.textContent = score.text;
    let highScoreDateEl = document.createElement('li');
    highScoreDateEl.textContent = highScoreDate.format('MM/DD/YYYY');
    const highScoreNameEl = document.createElement('li');
    highScoreNameEl.textContent = highScore.name;

    const deleteEl = document.createElement('button');
    deleteEl.setAttribute('class', deleteButtonClass);
    deleteEl.textContent = 'Delete HS';
    deleteEl.addEventListener('click', () => handleDeleteHighScores(i));

    rowEl.appendChild(highScoreEl);
    rowEl.appendChild(highScoreDateEl);
    rowEl.appendChild(highScoreNameEl);
    rowEl.appendChild(deleteEl);
    highScoreDisplayEl.appendChild(rowEl);
  }
}

function handleDeleteHighScores(index) {
  let highScores = readHighScoresFromStorage();
  highScores.splice(index, 1);
  saveHighScores(highScores);
  printHighScores();
}
