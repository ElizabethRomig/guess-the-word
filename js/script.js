const guessedLettersDisplay = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const guess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numRemaining = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const againBtn = document.querySelector(".play-again");

const word = "magnolia";
let guessedLetters = []

const playerWon = function(){
    if (wordInProgress.innerText === word.toUpperCase()) {
        messages.classList.add("win");
        messages.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
}

const updateWord = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = [...wordUpper];
    //console.log ("Array: ", wordArray);
    let i=0;
    for (let letter of wordArray){
        if (guessedLetters.includes(letter)) {
            wordArray[i] = letter;
        } else {
            wordArray[i] = "\u25CF";

        }
        i++;
    }
    wordInProgress.innerText = wordArray.join("");
    playerWon();
}

updateWord(word);


guessBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const input = guess.value;
    messages.innerText = "";
    guess.value = "";
    const validInput = validateInput(input);
    if (validInput) {
        makeGuess(validInput);
    }
})

const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (!input) {
        messages.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        messages.innerText = "You may only enter one letter at a time."
    } else if (!input.match(acceptedLetter)){
        messages.innerText = "Only letters may be entered."
    } else {
        return input;
    }
}

const makeGuess = function(letter){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        messages.innerText = `You've already guessed ${letter}.  Try again!`;
    } else {
        guessedLetters.push(letter);
        updatePage();
        updateWord(guessedLetters);
    }
    //console.log (guessedLetters);
}

const updatePage = function(){
    guessedLettersDisplay.innerHTML = "";
    for (let letter of guessedLetters) {
        let newLetter = document.createElement("li");
        newLetter.innerText = letter;
        guessedLettersDisplay.append(newLetter);
    }
}

