const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let gameOver = false;

// 🔹 MAIN GAME LOGIC
function handleGuess() {
    if (gameOver) return;

    const userGuess = Number(guessInput.value);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        message.textContent = " Enter a number between 1 and 100";
        message.className = "error";
        return;
    }

    attempts++;
    attemptsText.textContent = `Attempts: ${attempts}`;

    checkGuess(userGuess);
}

// 🔹 BUTTON CLICK
guessBtn.addEventListener("click", handleGuess);

// 🔹 ENTER KEY SUPPORT
guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleGuess();
    }
});

// 🔹 CHECK GUESS
function checkGuess(guess) {
    if (guess === secretNumber) {
        message.textContent = ` Correct! You guessed it in ${attempts} attempts.`;
        message.className = "success";

        gameOver = true;
        restartBtn.classList.remove("hidden");
        guessBtn.disabled = true;
    } 
    else if (guess > secretNumber) {
        message.textContent = " Too High! Try again.";
        message.className = "error";
        triggerShake();
    } 
    else {
        message.textContent = " Too Low! Try again.";
        message.className = "error";
        triggerShake();
    }

    guessInput.value = "";
}

// 🔹 SHAKE ANIMATION
function triggerShake() {
    guessInput.classList.add("shake");
    setTimeout(() => {
        guessInput.classList.remove("shake");
    }, 300);
}

// 🔹 RESTART GAME
restartBtn.addEventListener("click", function () {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    message.textContent = "";
    message.className = "";
    attemptsText.textContent = "";
    guessInput.value = "";

    guessBtn.disabled = false;
    restartBtn.classList.add("hidden");
});
