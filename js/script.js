const guessedLetters = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const guess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numRemaining = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const againBtn = document.querySelector(".play-again");

const word = "magnolia";

const updateWord = function(word) {
    let wordArray = [...word];
    //console.log (wordArray);
    let i =0;
    for (let letter of wordArray) {
        wordArray[i] = "\u25CF";
        i++;
    }
    //console.log (wordArray);
    wordInProgress.innerText = wordArray.join("");
}

updateWord(word);

//console.log(wordInProgress)

guessBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const input = guess.value;
    console.log (input);
    guess.value = "";
})