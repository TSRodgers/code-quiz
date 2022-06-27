let homeButtonEl = document.getElementById("home-btn");
let resetButtonEl = document.getElementById("reset-btn");
let scoreListEl = document.getElementById("scores");
var highScores=[]

function sortScores() {
var savedScores = localStorage.getItem("scores")
savedScores = JSON.parse(savedScores)
for (var i =0; i < savedScores.length; i++) {
    highScores.push(savedScores[i])
    }

highScores.sort(function (a, b) {
    return b - a;
});
console.log(highScores)
};

function createHighScores () {
    scoreListEl.innerHTML = ""
    for (var i = 0; i < highScores.length; i++) {
        var scoreLiEl = document.createElement("li");
        scoreLiEl.className = "score-li"
        scoreLiEl.textContent = [i + 1] + ". " + highScores[i].name + " - " + highScores[i].score;
        scoreListEl.appendChild(scoreLiEl)
    }
}

function playAgain(event) {
    event.preventDefault();
    location.href = "./index.html"
};

function resetScores(event) {
    event.preventDefault();
    localStorage.clear();
    scoreListEl.innerHTML = ""
};


homeButtonEl.addEventListener("click", playAgain);
resetButtonEl.addEventListener("click", resetScores); 
sortScores();
createHighScores();