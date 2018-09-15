var game = {
    wins: 0,
    losses: 0,
    remainingGuesses: 0,
    wordPool: ["JACKPOT", "TILT", "BUMPER", "MULTIBALL", "LIGHTS", "QUARTERS"],
    currentWord: '',
    rightLettersGuessed: [],
    wrongLettersGuessed: [],
    isActive: false,
    
    initGame: function() {
        this.isActive = true;
        this.remainingGuesses = 9;
        this.currentWord = this.wordPool[Math.floor(Math.random() * this.wordPool.length)];
        console.log(this.currentWord);
        this.rightLettersGuessed = [];
        this.wrongLettersGuessed = [];
        this.update();
    },

    update: function() {
        
        //clear word section
        var wordSection = document.getElementById("wordSection");
        wordSection.innerHTML = "Current Word: ";
        
        //display word
        var letters = this.currentWord.split("");
        console.log(letters);
        for (var i = 0; i < letters.length; i++) {

            var letterNode = document.createElement("span");
            letterNode.textContent = (this.rightLettersGuessed.includes(letters[i])) ? letters[i] : " _ ";
            wordSection.appendChild(letterNode);
        }

        //display guessed letters
        var guessSection = document.getElementById("lettersGuessed");
        guessSection.innerHTML = "";

        for (var i = 0; i < this.wrongLettersGuessed.length; i++) {

            var letterNode = document.createElement("span");
            letterNode.textContent = this.wrongLettersGuessed[i];
            guessSection.appendChild(letterNode);
        }
    },

    makeGuess: function(guessedLetter) {
        if (!this.rightLettersGuessed.includes(guessedLetter) && !this.wrongLettersGuessed.includes(guessedLetter)) {

            if (this.currentWord.includes(guessedLetter)) {
                this.rightLettersGuessed.push(guessedLetter);
            } else {
                this.wrongLettersGuessed.push(guessedLetter);
                this.remainingGuesses--;
            }

            this.update();
        }
    }
}

document.onkeyup = function(event) {
    if (!game.isActive) {
        game.initGame();
    } else if (event.keyCode >= 48 && event.keyCode <= 90) {
        game.makeGuess(event.key.toUpperCase());
    }
}