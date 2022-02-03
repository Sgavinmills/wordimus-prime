const chalk = require('chalk');

const getResults = [
    {
        type: 'input',
        name: 'correctLetters',
        message: `Submit correctly placed letters by entering 5 spaces and replace spaces with correct letters, ie __ou_ if o and u are placed correctly - These will be ${chalk.green('GREEN')} on wordle.` 
    },
    {
        type: 'input',
        name: 'validLetters',
        message: `Submit valid but incorrectly placed letters by entering 5 spaces and replaces spaces with the valid letters, ie l____ if l was valid but incorrectly placed. These will be ${chalk.yellow('YELLOW')} on wordle`
    }
];

const wouldYouLikeToSeeThem = [
    {
        type: 'input',
        name: 'viewSolutionModel',
        message: 'View solution model? (contains list of remaining available words) y/n',
    }
]

module.exports = {getResults, wouldYouLikeToSeeThem};