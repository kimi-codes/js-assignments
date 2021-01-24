'use strict';
let readlineSync = require('readline-sync');
const STARTING_AMOUNT = 50;

/* Prints openning message, asks for player names, starts the game */
function startGame() {
    let welcome_msg = "|---------- Welcome To WAR ----------|";
    console.log('*'.repeat(welcome_msg.length) + '\n' + welcome_msg);

    let p2_is_computer = readlineSync.keyInYN('Would you like to play agains the computer? '); 
    let player1 = create_player(readlineSync.question('Player 1 name: '));
    let player2;
    if (p2_is_computer) {
        player2 = create_player('Computer');
    }
    else {
        player2 = create_player(readlineSync.question('Player 2 name: '));
    }

    playGame(player1, player2, p2_is_computer);
}


/* Game loop, receive bets and plays the round */
function playGame(player1, player2, p2_is_computer) {
    let bet_msg = (player) => (player['name'] + ' place your bet: (1-' + player['money'] + ')\n');
    let keep_playing = true;
    while (keep_playing) {
        if (!placeBet(player1, readlineSync.question(bet_msg(player1)))) {return;}
        if (!p2_is_computer && !placeBet(player2, readlineSync.question(bet_msg(player2)))) {return;}
        // computer player creates a random bet:
        if (p2_is_computer) {
            placeBet(player2, Math.floor(Math.random() * (player2['money'] + 1)));
        }
        if (!(playRound(player1, player2) && readlineSync.keyInYN('Play another round?'))) {
            keep_playing = false;
        }
    }
    console.log('Game over.');
}


/* Checks if the bet is valid, updates player obj with bet. 
returns true if bet is valid, otherwise false. */ 
function placeBet(player, sum) {
    if (sum < 0 || sum > player['money']) {
        console.log('Bad bet. No place for cheaters here, game over.');
        return false;
    }
    player['bet'] = sum;
    return true;
}


/* Draws cards, updates players sum.
returns true if game didnt end, otherwise false */
function playRound(player1, player2) {
    let card_result = (player) => (player['name'] + ": " + player['card']['val'] + player['card']['suit']);

    drawCard(player1);
    drawCard(player2);
    console.log(card_result(player1), ',', card_result(player2));

    if (player1['card']['val'] == player2['card']['val']) {
        console.log('Its a tie. lets try another round.');
        return true;
    }

    let [winner, loser] = (player1['card']['val'] > player2['card']['val']) ? [player1, player2] : [player2, player1];
    winner['money'] -= (-1)*winner['bet'];
    loser['money'] -= loser['bet'];

    console.log(winner['name'], 'won', winner['bet'], 'and now has', winner['money'], 'ILS.');
    console.log(loser['name'], 'lost', loser['bet'], 'and now has', loser['money'], 'ILS.');
    if (loser['money'] <= 0 ) {
        console.log(loser['name'] + ' has no money left! ' + winner['name'] + ' WON the battle!');
        return false;
    }
    return true;
}


/* creates the player object */
let create_player = (pname) => ({
    name: pname,
    money: STARTING_AMOUNT,
    bet: 0,
    card: 0
});


/* creates card object with random values */
function drawCard(player) {
    let createCard = () => ({
        val: Math.floor(Math.random() * 12 + 1),
        suit: ['♠', '♦', '♣', '♥', '♡', '♢', '♤', '♧'][Math.floor(Math.random() * 8)]
    });

    player['card'] = createCard();
}


startGame();