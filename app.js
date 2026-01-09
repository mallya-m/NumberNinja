const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");

const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

const minInput = document.getElementById("minRange");
const maxInput = document.getElementById("maxRange");
const setRangeBtn = document.getElementById("setRangeBtn");

let min = null;
let max =  null ;
let secretNumber = null ;
let attempts = 0;
let gameOver = false;

//Range Setup Logic

setRangeBtn.addEventListener("click",()=>{
    min = Number(minInput.value);
    max= Number(maxInput.value);
    //Validation
    if(isNaN(min) || isNaN(max) || min >= max){
        message.textContent = "Enter a valid range( Min < Max )";
        return ;
    }
    //Game logic
    secretNumber = Math.floor(Math.random()*(max-min+1)) + min ;
    attempts = 0 ;
    gameOver = false ;

    message.textContent = `Guess a number between ${min} and ${max}`;
    attemptsText.textContent = "";

    guessInput.disabled = false ;
    guessBtn.disabled = false ;
    guessInput.focus();

    restartBtn.classList.add("hidden");
});

//Guess handling

guessBtn.addEventListener("click", handleGuess);

guessInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        handleGuess();
    }
});

function handleGuess() {
    if (gameOver) return;

    const userGuess = Number(guessInput.value);

    if (!userGuess || userGuess < min || userGuess > max) {
        message.textContent =  `Enter a number between ${min} and ${max}`;
        message.className = "error";
        return;
    }

    attempts++;
    attemptsText.textContent = `Attempts: ${attempts}`;

    checkGuess(userGuess);
}

// CHECK GUESS
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

//  SHAKE ANIMATION
function triggerShake() {
    guessInput.classList.add("shake");
    setTimeout(() => {
        guessInput.classList.remove("shake");
    }, 300);
}

//  RESTART GAME
restartBtn.addEventListener("click", function () {
    minInput.value = "";
    maxInput.value = "";
    guessInput.value = "";

    guessInput.disabled = true ;
    guessBtn.disabled = true ;

    attempts = 0;
    gameOver = false;

    message.textContent = "Set a new range to start agian";
    message.className = "";
    attemptsText.textContent = "";

    min = max = secretNumber = null ;

    restartBtn.classList.add("hidden");
});
