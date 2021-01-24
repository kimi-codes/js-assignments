'use strict';

/*
HOW IT WORKS: 
The program creates an object that contains the (randomly) chosen word,
the word guessed so far (starting as only astrixes) and the number of attempts left.
This object is updated on every valid guess.

After the player maked a guess, the validity of the input is checked, 
then the guess is checked for a full word or for a single char.
The program exits the game loop when the word was fully guessed or when no more attempts left.
*/


let readlineSync = require('readline-sync');
var figlet = require('figlet');

const ATTEMPT = 10;
let word_bank = ['cat', 'pizza', 'igloo', 'lizzard', 'galaxy', 'parabola', 'phonix', 'typhoon', 'vampire'];


/* checks validity of input. returns true if:
- is 1 char long, or the length of the word.
- contains only alphabet characters */
let checkValidity = (game_obj, guess) => (
    (guess.length == 1 || guess.length == game_obj['word'].length) && (/^[a-zA-Z]+$/).test(guess))

let statusMsg = (game_obj) => (
    '\nYou have ' + game_obj['attempts'] + ' attempts left.\n' + 'The word is:\n' + game_obj['guessed'].join(''))
let winnigMsg = (game_obj) => ('You WON! The word is: ' + game_obj['word']);
let losingMsg = (game_obj) => ('You ran out of attempts, you LOSE!\n' + 'The word was: ' + game_obj['word']);


/* prints the header for the game */
function printWelcomeMsg() {
    console.log(figlet.textSync('Hang Man', {
        font: 'rectangles',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));
}


/* creates the game object containing the word, the word guessed so far and the number of attempts left*/
function createGame() {
    let draw_word = word_bank[Math.floor(Math.random() * word_bank.length)];
    return {
        word: draw_word,
        guessed: Array(draw_word.length).fill('*'),
        attempts: ATTEMPT
    }
}


/* Updatets the game object with the character that guessed,
returns true if character was found (and updated), otherwise false*/
function updateChar(game_obj, ch) {
    ch = ch.toLowerCase();
    let found = false;
    for (let i in game_obj['word']) {
        if (ch == game_obj['word'][i].toLowerCase()) {
            found = true;
            // update the guess word with the upper/lower char:
            game_obj['guessed'][i] = game_obj['word'][i];
        }
    }
    if (!found) {game_obj['attempts']--}
    return found;
}


/* returns true if full word guess is correct, 
otherwise updates number of attempts and returns false*/
function guessFullWord(game_obj, guess) {
    if (guess.toLowerCase() != game_obj['word'].toLowerCase()) {
        game_obj['attempts']--;
        return false;
    }
    return true;
}


function game() {
    let game_obj = createGame();
    while (game_obj['attempts'] > 0) {
        console.log(statusMsg(game_obj));
        let guess = readlineSync.question('Enter your guess (a-z): ');
        // validity check:
        if (!checkValidity(game_obj, guess)) {
            console.log('Invalid input!');
            continue;
        }
        // full word guess check:
        if (guess.length > 1) {
            if (guessFullWord(game_obj, guess)) {
                console.log(winnigMsg(game_obj));
                break;
            }
        } // char guessed check:
        else if (updateChar(game_obj, guess) && game_obj['guessed'].join('') == game_obj['word']) {
            console.log(winnigMsg(game_obj));
            break;
        }
    }
    if (game_obj['attempts'] == 0) {
        console.log(losingMsg(game_obj));
    }
}


printWelcomeMsg();
game();