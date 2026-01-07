const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

let secretNumber = Math.floor(Math.random()*100) + 1 ;
let attempts = 0 ;
let gameOver = false ;


guessBtn.addEventListener("click", function(){
    if(gameOver) return;

    const userGuess = Number(guessInput.value);
    if(!userGuess || userGuess < 1 || userGuess > 100){
        message.textContent = "Enter a number between 1 to 100";
        return;
    }

    attempts++;
    attemptsText.textContent = `Attempts : ${attempts}`;

    checkGuess(userGuess);
});

function checkGuess(guess){
    if(guess === secretNumber){
        message.textContent = `Correct ! You guessed it in ${attempts} attempts.` ;
        gameOver = true ;
    
    }else if ( guess > secretNumber){
        message.textContent = "Too High ! Try again.";
    }else{
        message.textContent = "Too low ! Try again."
    }
    guessInput.value  = "";
}