const guessedLettersDisplay = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const guess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numRemaining = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const againBtn = document.querySelector(".play-again");

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
    updateWord();
}

getWord();

const countGuesses = function(guess){
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)){
        messages.innerText = `Yes! ${guess} is in the word.`
    } else {
        messages.innerText = `Nope! The word does not contain ${guess}.`;
        numRemainingGuesses--;
    }
    console.log (numRemainingGuesses);
    if (numRemainingGuesses === 0) {
        remainingGuesses.innerText = `GAME OVER! You have no remaining guesses.  The word was ${wordUpper}.`
    } else if (numRemainingGuesses === 1){
        numRemaining.innerText = "only ONE"
    } else {
        numRemaining.innerText = `${numRemainingGuesses} guesses`;
    }
}

const playerWon = function(){
    if (wordInProgress.innerText === word.toUpperCase()) {
        messages.classList.add("win");
        messages.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        remainingGuesses.innerText = `You only had ${numRemainingGuesses} missed letters.`
    }
}

const updateWord = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = [...wordUpper];
    //console.log ("Array: ", wordArray);
    let i=0;
    for (let letter of wordArray){
        if (guessedLetters && guessedLetters.includes(letter)) {
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
    if (numRemainingGuesses > 0){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        messages.innerText = `You've already guessed ${letter}.  Try again!`;
    } else {
        guessedLetters.push(letter);
        updatePage();
        updateWord(guessedLetters);
        countGuesses(letter);
    }}
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

