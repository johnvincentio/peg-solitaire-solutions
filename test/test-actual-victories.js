//

/* global describe, it */

/* eslint-disable no-plusplus, no-continue */

/**
 * Test actual victories
 *
 * @module test-actual-victories
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

		game.moves.length.should.be.equal(dataIdx + 1);
		utils.check(obj, local);

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

describe.only('test actual victories', () => {
	it('test victory game 1', () => {
		testVictory(victories[0]);
	});

	it('test victory game 2', () => {
		testVictory(victories[1]);
	});

	it('test victory game 3', () => {
		testVictory(victories[2]);
	});

	it('test victory game 4', () => {
		testVictory(victories[3]);
	});

	it('test victory game 5', () => {
		testVictory(victories[4]);
	});

	it('test victory game 6', () => {
		testVictory(victories[5]);
	});

	it('test victory game 7', () => {
		testVictory(victories[6]);
	});

	it('test victory game 8', () => {
		testVictory(victories[7]);
	});

	it('test victory game 9', () => {
		testVictory(victories[8]);
	});

	it('test victory game 10', () => {
		testVictory(victories[9]);
	});
});