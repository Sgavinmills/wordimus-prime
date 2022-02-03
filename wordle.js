const SolutionModel = require('./solutionModel');
const fullDict = require('./dictionary.json');
const inquirer = require('inquirer');
const chalk = require('chalk');

const {getResults, wouldYouLikeToSeeThem} = require('./questions');


async function test(startingWord='louse') {
    let answers, seeThem;
    let guess = startingWord;
    const solution = new SolutionModel(fullDict, startingWord);

    for(let i = 0; i < 6; i++) {
        if(solution.getNumberOfWordsInDict() === 1) {
            console.log(`This is the last word available, it must be... `);
            console.log(`Word ${i+1}: ${chalk.red(solution.guessedWords[solution.guessedWords.length-1])}`)
            break;
        }

        if(solution.getNumberOfWordsInDict() === 0) {
            console.log('Fuck, something went wrong. Out of words...');
            break;
        }

        console.log(`Word ${i+1}: ${chalk.red(guess.toUpperCase())}`);
        answers = await inquirer.prompt(getResults)
        solution.processInput(answers);
        solution.filterDict();
        guess = solution.getWordSuggestion();
        seeThem = await inquirer.prompt(wouldYouLikeToSeeThem);
        if(seeThem.viewSolutionModel === 'y') 
           console.log(solution);
        console.log(' ');

    }

    console.log(`Game over. If I failed then I am sorry. And shit.`);
}


test(process.argv[2]);