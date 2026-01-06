// Generate random number between 1 and 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// DOM elements
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

// Guess button click
guessBtn.addEventListener("click", () => {
    const userGuess = Number(guessInput.value);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        message.textContent = "⚠️ Enter a number between 1 and 100";
        return;
    }

    attempts++;

    if (userGuess === secretNumber) {
        message.textContent = "🎉 Correct! You guessed it!";
        attemptsText.textContent = `Attempts: ${attempts}`;
        restartBtn.classList.remove("hidden");
        guessBtn.disabled = true;
    } 
    else if (userGuess > secretNumber) {
        message.textContent = "📉 Too high!";
    } 
    else {
        message.textContent = "📈 Too low!";
    }

    guessInput.value = "";
});

// Restart game
restartBtn.addEventListener("click", () => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    message.textContent = "";
    attemptsText.textContent = "";
    guessBtn.disabled = false;
    restartBtn.classList.add("hidden");
});
