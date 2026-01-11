document.addEventListener("DOMContentLoaded", () => {

    const guessInput = document.getElementById("guessInput");
    const guessBtn = document.getElementById("guessBtn");
    const message = document.getElementById("message");
    const attemptsText = document.getElementById("attempts");
    const restartBtn = document.getElementById("restartBtn");

    const minInput = document.getElementById("minRange");
    const maxInput = document.getElementById("maxRange");
    const setRangeBtn = document.getElementById("setRangeBtn");

    const themeToggle = document.getElementById("themeToggle");

    let min = null;
    let max = null;
    let secretNumber = null;
    let attempts = 0;
    let gameOver = false;

    /* ---------- RANGE SETUP ---------- */

    setRangeBtn.addEventListener("click", () => {
        min = Number(minInput.value);
        max = Number(maxInput.value);

        if (isNaN(min) || isNaN(max) || min >= max) {
            message.textContent = "Enter a valid range (Min < Max)";
            message.className = "error";
            return;
        }

        secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        attempts = 0;
        gameOver = false;

        guessInput.disabled = false;
        guessBtn.disabled = false;
        guessInput.focus();

        message.textContent = `Guess a number between ${min} and ${max}`;
        message.className = "";
        attemptsText.textContent = "";
        restartBtn.classList.add("hidden");
    });

    /* ---------- GUESS LOGIC ---------- */

    guessBtn.addEventListener("click", handleGuess);
    guessInput.addEventListener("keydown", e => {
        if (e.key === "Enter") handleGuess();
    });

    function handleGuess() {
        if (gameOver) return;

        if (min === null || max === null) {
            message.textContent = "Set the range first";
            message.className = "error";
            return;
        }

        const guess = Number(guessInput.value);

        if (isNaN(guess) || guess < min || guess > max) {
            message.textContent = `Enter a number between ${min} and ${max}`;
            message.className = "error";
            return;
        }

        attempts++;
        attemptsText.textContent = `Attempts: ${attempts}`;

        if (guess === secretNumber) {
            message.textContent = `Correct! You guessed it in ${attempts} attempts.`;
            message.className = "success";
            gameOver = true;
            guessBtn.disabled = true;
            restartBtn.classList.remove("hidden");
        } else {
            message.textContent = guess > secretNumber ? "Too High!" : "Too Low!";
            message.className = "error";
            shake();
        }

        guessInput.value = "";
    }

    function shake() {
        guessInput.classList.add("shake");
        setTimeout(() => guessInput.classList.remove("shake"), 300);
    }

    /* ---------- RESTART ---------- */

    restartBtn.addEventListener("click", () => {
        minInput.value = "";
        maxInput.value = "";
        guessInput.value = "";

        guessInput.disabled = true;
        guessBtn.disabled = true;

        min = max = secretNumber = null;
        attempts = 0;
        gameOver = false;

        message.textContent = "Set a new range to start";
        message.className = "";
        attemptsText.textContent = "";

        restartBtn.classList.add("hidden");
    });

    /* ---------- THEME ---------- */

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "Light Mode";
    }

    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

});
