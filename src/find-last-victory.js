//

/* eslint-disable no-plusplus */

/**
 * Find last Peg Solitaire solution
 *
 * @module LastVictory
 * @requires Game
 */

const Game = require('./game.js');

const game = new Game();

game.from = { row: 5, column: 3, type: 0 };

/* eslint no-constant-condition: ["error", { "checkLoops": false }] */

console.log(`Started at ${new Date().getTime()}`);
while (true) {
	if (!game.nextMove()) {
		if (game.isGameOver()) {
			break;
		}
	}
	game.handleNextMove();
	if (game.isVictory()) {
		game.handleVictory(true);
		game.deleteMove();
	}
}
console.log(`Ended at ${new Date().getTime()}`);
