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

const updateWord = function(word) {
    let wordArray = [...word];
    let i =0;
    for (let letter of wordArray) {
        wordArray[i] = "\u25CF";
        i++;
    }
    wordInProgress.innerText = wordArray.join("");
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
    letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        messages.innerText = `You've already guessed ${letter}.  Try again!`;
    } else {
        guessedLetters.push(letter);
    }
    //console.log (guessedLetters);
}