const guessedLettersDisplay = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const guess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numRemaining = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const againBtn = document.querySelector(".play-again");
const guessForm = document.querySelector(".guess-form");

let word = "magnolia";
let guessedLetters = [];
let numRemainingGuesses = 8;

const getWord = async function() {
    const request = await fetch( "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await request.text();
    const wordsArray = data.split("\n");
    const randomIndex = Math.floor(Math.random()*wordsArray.length);
    word = wordsArray[randomIndex].trim();
    console.log (word);
    initializeWord();
}

getWord();

const playerWon = function(){
        messages.classList.add("win");
        messages.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        startOver();
}

const countGuesses = function(guess){
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)){
        messages.innerText = `Yes! ${guess} is in the word.`
    } else {
        messages.innerText = `Nope! The word does not contain ${guess}.`;
        numRemainingGuesses--;
    }
    if (numRemainingGuesses === 0) {
        messages.innerText = `GAME OVER! The word was ${wordUpper}.`
        numRemaining.innerText = `NO guesses`;
        startOver();
    } else if (numRemainingGuesses === 1){
        numRemaining.innerText = "only ONE"
    } else {
        numRemaining.innerText = `${numRemainingGuesses} guesses`;
    }
}

const initializeWord = function(){
    const wordUpper = word.toUpperCase();
    const wordArray = [...wordUpper];
    const wordText = wordArray.map(function(letter){return "\u25CF"});
    wordInProgress.innerText = wordText.join("");
}


const updateWord = function(guess){
    const wordUpper = word.toUpperCase();
    const wordArray = [...wordUpper];
    const wordText = wordArray.map(function(letter) {
        if (guessedLetters.includes(letter)) {
            return letter;
        } else {
            return "\u25CF";
        }
    })
    wordInProgress.innerText = wordText.join("");
    if (wordInProgress.innerText === word.toUpperCase()){
        playerWon();
    } else {
        countGuesses(guess);
    }
}

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

againBtn.addEventListener("click", function() {
    messages.classList.remove("win");
    messages.innerText = "";
    wordInProgress.innerText = "";
    numRemainingGuesses = 8;
    guessedLetters = [];
    guessedLettersDisplay.innerText = guessedLetters;
    numRemaining.innerText = `${numRemainingGuesses} guesses`;
    guessBtn.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    wordInProgress.classList.remove("hide");
    guessedLettersDisplay.classList.remove("hide");
    againBtn.classList.add("hide");
    guessForm.style.display = "flex";
    getWord();
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
    if (numRemainingGuesses > 0){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        messages.innerText = `You've already guessed ${letter}.  Try again!`;
    } else {
        guessedLetters.push(letter);
        updatePage();
        updateWord(letter);
    }}
}

const updatePage = function(){
    guessedLettersDisplay.innerHTML = "";
    for (let letter of guessedLetters) {
        let newLetter = document.createElement("li");
        newLetter.innerText = letter;
        guessedLettersDisplay.append(newLetter);
    }
}

const startOver = function(){
    guessBtn.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guessedLettersDisplay.classList.add("hide");
    againBtn.classList.remove("hide");
    guessForm.style.display = "none";
}

