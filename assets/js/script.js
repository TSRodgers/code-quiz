let scoreIdCounter
let startButtonEl = document.getElementById("start-btn");
let pageContentEl = document.getElementById("page-content");
let startPageEl = document.getElementById("start-page")
let questionContainerEl = document.getElementById("question-container");
let questionEl = document.getElementById("question");
let answerButtonsEl = document.getElementById("answer-button");
let timerEl = document.getElementById("timer");
let correctEl = document.getElementById("correct");
let headerEl = document.getElementById("header");
let formEl = document.getElementById("form-container");
let inputEl = document.getElementById("name-input");
let submitButtonEl = document.getElementById("submit-btn")
let timeInterval
let timeLeft = 75
let playerScore
let randomQuestion
let currentQuestion
let highScores = []
let questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyper Trainer Marking Language", correct: false},
            {text: "Hyper Text Marketing Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Markup leveler", correct: false}
        ]
    }, {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
            {text: "<h6>", correct: false },
            {text: "<h1>", correct: true },
            {text: "<head>", correct: false},
            {text: "<heading>", correct: false}
        ]
    }, {
        question: "What does CSS stand for?",
        answers: [
            {text: "Colorful Style Sheets", correct: false },
            {text: "Creative Style Sheets", correct: false },
            {text: "Cascading Style Sheets", correct: true },
            {text: "Computer Style Sheets", correct: false }
        ]
    }, {
       question: "What is correct HTML for referring to an external style sheet?",
       answers: [
        {text: "<stylesheet>mystyle.css</stylesheet>", correct: false },
        {text: "<style src='mystyle.css'>", correct: false },
        {text: "<link rel='stylesheet' type='text/css' href='mystyle.css'>", correct: true },
        {text: "<link rel='stylesheet' type='text/css' src='mystyle.css'>", correct: false }
       ] 
    }, {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "<js>", correct: false },
            {text: "<script>", correct: true},
            {text: "<javascript>", correct: false },
            {text: "<scripting>", correct: false }
        ]
    }, {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            {text: "msg('Hello World');", correct: false },
            {text: "alertBox('Hello World');", correct: false },
            {text: "alert('Hello World');", correct: true },
            {text: "msgBox('Hello World');", correct: false }
        ]
    }
];

function nextQuestion() {
    // clears page for next question/answer
    answerButtonsEl.innerHTML = ""
    // runs showQuestions function until all questions have been shown, then runs endQuiz
    if (randomQuestion.length > currentQuestion) {
    showQuestion(randomQuestion[currentQuestion])
    }
    else {
        endQuiz();
    }
};

function showQuestion(question) {
    questionEl.innerText = question.question;
    // runs function for each answer choice, creates buttons, adds text, and adds dataset for each
    question.answers.forEach(answer => {
        let answerButton = document.createElement("button");
        answerButton.innerText = answer.text;
        answerButton.dataset.correct = answer.correct;
        answerButton.className = "btn answer-btn";
        answerButtonsEl.appendChild(answerButton);
        answerButton.addEventListener("click", selectAnswer);
    })
};

function selectAnswer(event) {
    // checks if answer is correct or incorrect
    let selectedAnswer = event.target
    if (selectedAnswer.dataset["correct"] === "true") {
        console.log("correct")
        currentQuestion++
        correctEl.textContent="Correct!"
        nextQuestion();
    }
    // if incorrect, subtract 10 sec from time
    else if (selectedAnswer.dataset["correct"] === "false") {
        console.log("incorrect")
        currentQuestion++
        correctEl.textContent="Incorrect!"
        timeLeft -= 10;
        nextQuestion();
    }
};

function countdown() {
    timeInterval = setInterval(function() {
        // stops function from running if timer hits 0
        if (timeLeft >= 0) {
        timerEl.textContent = "Time: " + timeLeft
        timeLeft--; }
        else {
            clearInterval(timeInterval);
        }
    }, 1000); 

    
};

// starts quiz 
function startQuiz() {
    console.log("starting")
    //clears page to make room for questions
    startPageEl.innerHTML = ""
    timerEl.textContent = "Time: " + timeLeft;
    // starts timer
    countdown();
    // randomizes the starting question
    // I'm pretty sure this is es6, didn't remember how to randomize order and looked it up on stack overflow, found it while I was down a rabbit hole and cant find the exact post again so unable to cite exact person I borrowed it from.
    randomQuestion = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    // unhides container questions will be appended to
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

function endQuiz() {
    // clears questions container to make room for final screen
    questionContainerEl.innerHTML = ""
    // saves timeLeft as playerScore,adds to local storage, and stops the timer
    clearInterval(timeInterval);
    playerScore = Math.max(0, timeLeft);
    // adds final screen html elements 
    let completedHeaderEl = document.createElement("h2");
    completedHeaderEl.textContent = "Completed Quiz!";
    questionContainerEl.appendChild(completedHeaderEl);
    let playerScoreEl = document.createElement("p");
    playerScoreEl.textContent = "Your final score is " + Math.max(0, playerScore) + "!"
    questionContainerEl.appendChild(playerScoreEl);
    // reveals form for players to submit their score
    formEl.classList.remove("hide");
};

function submitScore(event) {
    event.preventDefault();
    // checks if player entered initials
    var playerNameInput = inputEl.value;
    // If input field is left blank, throws error and stops function
    if (!playerNameInput) {
        alert("You need to enter your initials!");
        return false
    } else {
        // if input is valid puts data into array and passes to saveScore()
        var scoreDataObj = {
            score: playerScore,
            name: playerNameInput,
        };

        saveScore(scoreDataObj);
    }
    location.href = "./highscore.html"   
};

function loadScores() {
    var savedScores = localStorage.getItem("scores")
    // if no scores have been saved, return false
    if (!savedScores) {
        return false;
    }
    // parse into array of objects and then push into highscores array
    savedScores = JSON.parse(savedScores);
    // loops through savedScores array and pushes as to not push it all as one array entry
    for (var i =0; i < savedScores.length; i++) {
    highScores.push(savedScores[i])
    }
};

function saveScore(scoreDataObj) {
    // runs loadScores() function to check if any scores have been saved
    loadScores();
    // pushes data passde by submitScore() function into array and then sends array to local storage
    highScores.push(scoreDataObj);
    localStorage.setItem("scores", JSON.stringify(highScores));
}

startButtonEl.addEventListener("click", startQuiz);
submitButtonEl.addEventListener("click", submitScore);



