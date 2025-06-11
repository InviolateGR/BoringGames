const startBtn = document.getElementById("startGame");
const cupsArea = document.getElementById("cupsArea");
const difficultySelect = document.getElementById("difficultySelect");
const totalTriesEl = document.getElementById("totalTries");
const winCountEl = document.getElementById("winCount");
const lossCountEl = document.getElementById("lossCount");
const resultMessage = document.getElementById("resultMessage");

let totalTries = 0, wins = 0, losses = 0;
let correctCup = -1;
let cupCount = 3;
let allowClick = true;

function startGame() {
    cupCount = parseInt(difficultySelect.value);
    correctCup = Math.floor(Math.random() * cupCount);
    cupsArea.innerHTML = "";
    resultMessage.textContent = "";
    allowClick = true;

    for (let i = 0; i < cupCount; i++) {
        const cup = document.createElement("div");
        cup.classList.add("cup");

        // Only attach the ball logic internally, but don't add DOM yet
        cup.dataset.hasBall = i === correctCup;

        cup.addEventListener("click", () => checkAnswer(i, cup));
        cupsArea.appendChild(cup);
    }
}
function checkAnswer(selectedCup, clickedCup) {
    if (!allowClick) return;
    allowClick = false;

    totalTries++;
    clickedCup.classList.add("clicked");

    const rect = clickedCup.getBoundingClientRect();
    const containerRect = cupsArea.getBoundingClientRect();

    if (clickedCup.dataset.hasBall === "true") {
        const ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
        cupsArea.appendChild(ball);

        resultMessage.textContent = "You Found the Ball!";
        resultMessage.style.color = "#00cc66";
        wins++;
    } else {
        resultMessage.textContent = `Wrong! It was cup #${correctCup + 1}`;
        resultMessage.style.color = "#ff3333";
        losses++;

        setTimeout(() => {
            const allCups = document.querySelectorAll(".cup");
            const correctCupEl = allCups[correctCup];
            correctCupEl.classList.add("clicked");

            const correctRect = correctCupEl.getBoundingClientRect();
            const trueBall = document.createElement("div");
            trueBall.classList.add("ball");
            trueBall.style.left = `${correctRect.left - containerRect.left + correctRect.width / 2}px`;
            cupsArea.appendChild(trueBall);
        }, 500);
    }

    updateStats();
    setTimeout(startGame, 3000);
}


function updateStats() {
    totalTriesEl.textContent = totalTries;
    winCountEl.textContent = wins;
    lossCountEl.textContent = losses;
}

startBtn.addEventListener("click", startGame);
