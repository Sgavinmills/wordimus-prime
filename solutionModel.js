class SolutionModel {

    //array of [letter, index] pairs
    correctLetters = [];

    //Object where letters contain an array of invalid indexes
    validLetters = {};

    //array of invalid letters
    invalidLetters = [];

    guessedWords = [];

    dictOfValidWords;

    constructor(dict, guess) {
        this.dictOfValidWords = dict;
        this.guessedWords.push(guess);
    }

    addCorrectLetter(letter, index) {
        if(!this.checkCorrectLetter(letter, index)) {
            this.correctLetters.push([letter, index]);
        }
    }

    checkCorrectLetter(letter, index) {
        return this.correctLetters.some(letter => {
            return letter[0] === letter && letter[1] === index;
        })
    }

   addValidLetter(letter, index) {
       if(!this.validLetters.hasOwnProperty(letter))
            this.validLetters[letter] = [];
        
        if(!this.validLetters[letter].includes(index))
            this.validLetters[letter].push(index);
   }

   addInvalidLetters(letter) {
       if(!this.invalidLetters.includes(letter)) 
            this.invalidLetters.push(letter);
   }

   filterDict() { 
        const currentDict = [...this.dictOfValidWords];
        this.dictOfValidWords = currentDict.filter(word => {
            // word must contain every letter in correctLetters at the right index
            const lettersInWord = word.split('');
            const containsAllCorrectLetters = this.correctLetters.every(correctLetter => {
                return word.includes(correctLetter[0]) && word.indexOf(correctLetter[0]) === correctLetter[1]; 
            })

            if(!containsAllCorrectLetters) return false;
            ('word with all the correct letters gets to here')
            // word must contain all the valid letters but not at the indexes given
            const validLetters = Object.keys(this.validLetters);
            const containsAllValidLetters = validLetters.every(validLetter => {
                if(!word.includes(validLetter)) return false;
                const indexOfValidLetter = [];
                lettersInWord.forEach((letter, index) => {
                    if(letter === validLetter) 
                        indexOfValidLetter.push(index);
                });
                
                // return true if none of indexOfValidLetter appear in this.validLetters.validLetter
                return indexOfValidLetter.every(index => {
                   return !this.validLetters[validLetter].includes(index)
                })
            })

            if(!containsAllValidLetters) return false;

            // word must not contain any of the invalid letters
            return lettersInWord.every(letter => {
                return !this.invalidLetters.includes(letter);
            });
        })
   }

   addGuessWord(guess) {
    this.guessedWords.push(guess);
   }
   
   getWordSuggestion() {
    let wordSuggestion = '';
    let maxNumberOfUntriedLetters = 0;
    this.dictOfValidWords.forEach(availableWord => {
        // for each available word we will check how many letters are not in valid or correct letters
        // and choose the word with the most unused letters - ideally filter out repeat letters.

        const lettersInWord = availableWord.split('');
        const unusedLettersInWord = lettersInWord.reduce((value, letter) => {
            return !this.letterExistsInCorrectLetters(letter) && !this.letterExistsInValidLetters(letter) ? ++value : value;
        }, 0)

        if(unusedLettersInWord > maxNumberOfUntriedLetters) {
            wordSuggestion = availableWord;
            maxNumberOfUntriedLetters = unusedLettersInWord;
        }

    })
    this.guessedWords.push(wordSuggestion);
    return wordSuggestion;
   }

   letterExistsInValidLetters(letter) {
       const lettersInValidLetters = Object.keys(this.dictOfValidWords);
       return lettersInValidLetters.includes(letter);
   }

   letterExistsInCorrectLetters(letter) {
       const lettersInCorrectLetters = this.correctLetters.map(letter => letter[0]);
       return lettersInCorrectLetters.includes(letter);
   }

   getNumberOfWordsInDict() {
       return this.dictOfValidWords.length;
   }

   getWordsInDict() {
       return this.dictOfValidWords;
   }

   processInput(answers) {
    answers.correctLetters.split('').forEach((correctLetter, index) => {
        if(correctLetter !== ' ') 
            this.addCorrectLetter(correctLetter, index);
    })

    answers.validLetters.split('').forEach((validLetter, index) => {
        if(validLetter !== ' ') 
            this.addValidLetter(validLetter, index);
    })

    this.guessedWords[this.guessedWords.length-1].split('').forEach(letter => {
        if(!answers.correctLetters.split('').includes(letter) && !answers.validLetters.split('').includes(letter)) {
            this.addInvalidLetters(letter);
        }
    })
   }

}

module.exports = SolutionModel;