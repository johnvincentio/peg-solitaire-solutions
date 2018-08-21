//

/* global describe, it */

/* eslint-disable no-plusplus */
/* eslint no-constant-condition: ["error", { "checkLoops": false }] */

/**
 * Test finding the first n victories and verify they are exactly the same as the saved victories
 *
 * @module test-first-victories
 * @requires Game
 * @requires Utils
 * @requires victories
 */

const Game = require('../src/game');
const Utils = require('./utils');

const victories = require('./data/victories');

const TOTAL_VICTORIES = victories.length;

describe('test finding the first series of victories', () => {
	it('test running the game and check the victories', () => {
		const game = new Game();
		const utils = new Utils(game);

		console.log(`Started at ${new Date().getTime()}`);
		console.log(`Searching for the first ${TOTAL_VICTORIES} victories`);
		while (true) {
			game.nextMove();
			game.handleNextMove();
			if (game.isVictory()) {
				game.handleVictory(false);

				utils.checkVictory(victories[game.victories - 1]);
				if (game.victories >= TOTAL_VICTORIES) {
					break;
				}

				game.deleteMove();
			}
			if (game.isGameOver()) {
				break;
			}
		}
		console.log(`Ended at ${new Date().getTime()}`);
	}).timeout(150000);
});
