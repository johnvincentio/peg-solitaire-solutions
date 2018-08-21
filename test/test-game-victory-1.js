//

/* global describe, it */

/* eslint-disable no-plusplus, no-continue */

/**
 * Test game victory
 *
 * @module test-game-victory-1
 * @requires Game
 * @requires Utils
 */

const Game = require('../src/game');
const Utils = require('./utils');

const victories = require('./data/victories');

function testVictory(data) {
	const game = new Game();
	const utils = new Utils(game);

	const local = [];
	for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
		const obj = data[dataIdx];
		game.currentMove = obj; // set current move
		game.handleNextMove(); // make the move

		utils.check(obj, local);
		// game.moves.length.should.be.equal(dataIdx + 1);

		// console.log("dataIdx "+dataIdx+" data.length "+data.length);
		if (dataIdx < data.length - 1) {
			game.isVictory().should.equal(false);
			game.victories.should.be.equal(0);
		}
	}
	game.isVictory().should.equal(true);
	game.handleVictory(false);
	game.victories.should.be.equal(1);

	data.length.should.be.equal(31);
}

describe.only('test victory games', () => {
	it.only('test victory game 1', () => {
		testVictory(victories[0]);
	});

	it('test victory game 2', () => {
		testVictory(victories[1]);
	});
});
