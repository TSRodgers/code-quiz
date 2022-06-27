var startButtonEl = document.querySelector("#start-btn");
var pageContentEl = document.querySelector("#page-content");
var startPageEl = document.querySelector("#start-page")
var questionContainerEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerButtonsEl = document.querySelector("#answer-button");
var randomQuestion
var currentQuestion
var questions = [
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
]

var nextQuestion = function() {
    answerButtonsEl.innerHTML = ""
    if (randomQuestion.length > currentQuestion) {
    showQuestion(randomQuestion[currentQuestion])
    }
    else {
        endQuiz();
    }
};

var showQuestion = function(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var answerButton = document.createElement("button");
        answerButton.innerText = answer.text;
        answerButton.dataset.correct = answer.correct;
        answerButton.className = "btn";
        answerButtonsEl.appendChild(answerButton);
        answerButton.addEventListener("click", selectAnswer);
    })
};

var selectAnswer = function(event) {
    var selectedAnswer = event.target
    console.log(selectedAnswer);
    console.log(selectedAnswer.dataset["correct"]);

    if (selectedAnswer.dataset["correct"] === "true") {
        console.log("correct")
        currentQuestion++
        nextQuestion();
    }
    else if (selectedAnswer.dataset["correct"] === "false") {
        console.log("incorrect")
        currentQuestion++
        nextQuestion();
    }
}

var startQuiz = function() {
    console.log("starting")
    startPageEl.innerHTML = ""
    randomQuestion = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionContainerEl.classList.remove("hide");
    nextQuestion();
};

var endQuiz = function () {
    console.log("game ended");
}

startButtonEl.addEventListener("click", startQuiz)