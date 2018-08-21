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
console.log('TOTAL_VICTORIES ', TOTAL_VICTORIES);

describe.only('test finding the first series of victories', () => {
	it('test running the game and check the victories', () => {
		const game = new Game();
		const utils = new Utils(game);

		console.log(`Started at ${new Date().getTime()}`);
		while (true) {
			game.nextMove();
			game.handleNextMove();
			if (game.isVictory()) {
				game.handleVictory(false);

				utils.checkVictory(victories[game.victories - 1]);

				game.deleteMove();
			}
			if (game.isGameOver()) {
				break;
			}
		}
		console.log(`Ended at ${new Date().getTime()}`);

		// const local = [];
		// for (let dataIdx = 0; dataIdx < testData.length; dataIdx++) {
		// 	game.nextMove();
		// 	const obj = game.currentMove;
		// 	obj.should.be.deep.equal(testData[dataIdx]);

		// 	game.handleNextMove(obj); // make the move

		// 	utils.check(obj, local);

		// 	game.isVictory().should.equal(false);
		// 	game.victories.should.be.equal(0);
		// }
	});
});
