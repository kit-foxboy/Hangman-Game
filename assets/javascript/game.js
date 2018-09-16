var game = {
    wins: 0,
    losses: 0,
    remainingGuesses: 0,
    wordPool: ["JACKPOT", "TILT", "BUMPER", "MULTIBALL", "LIGHTS", "QUARTERS", "BONUS"],
    currentWord: '',
    rightLettersGuessed: [],
    wrongLettersGuessed: [],
    isActive: false,
    
    initGame: function() {
        this.isActive = true;
        this.remainingGuesses = 6;
        this.currentWord = this.wordPool[Math.floor(Math.random() * this.wordPool.length)];
        this.rightLettersGuessed = [];
        this.wrongLettersGuessed = [];
        var letterNodes = document.getElementById("letters").getElementsByTagName("li");
        for (var i = 0; i < letterNodes.length; i++) {
            letterNodes[i].style.backgroundColor = "black";
        }
        this.update();
    },

    update: function() {
        
        //clear word section
        var wordSection = document.getElementById("wordSection");
        wordSection.textContent = "Current Word: ";
        
        //display word
        var letters = this.currentWord.split("");
        for (var i = 0; i < letters.length; i++) {

            var letterNode = document.createElement("span");
            letterNode.textContent = (this.rightLettersGuessed.includes(letters[i])) ? letters[i] : " _ ";
            wordSection.appendChild(letterNode);
        }

        //display guessed letters
        var letterNodes = document.getElementById("letters").getElementsByTagName("li");
        for (var i = 0; i < this.wrongLettersGuessed.length; i++) {
            letterNodes[i].style.backgroundColor = (i % 2 == 0) ? "red" : "yellow";
            letterNodes[i].textContent = this.wrongLettersGuessed[i];
        }

        //check for win/loss
        if (this.remainingGuesses <= 0) {

            document.getElementById("losses").textContent = ++this.losses;
            wordSection.textContent = "Game Over... Press any key to continue.";
            this.isActive = false;
        
        } else if (this.hasWon()) {

            document.getElementById("wins").textContent = ++this.wins;
            wordSection.textContent = "You win! Press any key to continue.";
            this.isActive = false;
        }

        document.getElementById("losses").textContent = this.losses;
        document.getElementById("wins").textContent = this.wins;
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
    },

    hasWon: function() {
        var letters = this.currentWord.split("");
        for (var i = 0; i < letters.length; i++) {
            if (!this.rightLettersGuessed.includes(letters[i])) {
                return false;
            }
        }

        return true;
    }
}

document.onkeyup = function(event) {
    if (!game.isActive) {
        game.initGame();
    } else if (event.keyCode >= 48 && event.keyCode <= 90) {
        game.makeGuess(event.key.toUpperCase());
    }
}