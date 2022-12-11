let randomNumber;
let guessesLeft = 7;

window.onload = function()
{
    randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById("guesses-left").innerHTML = guessesLeft;
}

document.getElementById("guess").addEventListener("keypress", function(event)
{
    if (event.key === "Enter") 
    {
        checkGuess();
    }
});

document.getElementById("guess-btn").addEventListener("click", function()
{
    checkGuess();
});

function checkGuess() 
{
    // create Promise function for guessing game
    let myPromise = new Promise(function(myResolve, myReject) {
    let guess = Number(document.getElementById("guess").value);

    if (guess == randomNumber) 
    {
        // if guess is correct, 
        // pass guess to myResolve function
        myResolve(guess);
    }
    else 
    {
        // if guess in incorrect,
        // pass guess to myReject function
        myReject(guess);
    }
});

// if any of the Promise functions are called, run code in french braces
myPromise.then(
    // myResolve function
    function(guess) { alert("Congrats! The number was " + guess + "."); },
    // myReject function
    function(guess) {
        if (guessesLeft == 7) 
        {
            document.getElementById("prev-guess-header").style.visibility = "visible";
        }
        const high = guess > randomNumber;
        document.getElementById("guesses-left").innerHTML = --guessesLeft;
        const lastGuess = document.createElement("div");
        lastGuess.innerHTML = `You guessed ${guess}. That number was too ${high ? "high" : "low"}.`;
        document.getElementById("previous-guesses").appendChild(lastGuess);
    }
  );
}