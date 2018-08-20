//

/* global describe, it */

/* eslint-disable no-plusplus */

/**
 * Test a full game
 *
 * @module test-game-victory-2
 * @requires Game
 */

const Game = require('../src/game');

const { data1, data2 } = require('./data/data1');

describe('test victory 2', () => {
	it('test game 1', () => {
		console.log('data1.length ', data1.length);

		const game = new Game();

		for (let dataIdx = 0; dataIdx < data1.length; dataIdx++) {
			const obj = data1[dataIdx]; // next move
			game.handleNextMove(obj);

			game.moves.length.should.be.equal(dataIdx + 1);

			if (dataIdx < data1.length - 1) {
				game.isVictory().should.equal(false);
				game.victories.should.be.equal(0);
			}
		}

		game.isVictory().should.equal(true);
		game.handleVictory(false);
		game.victories.should.be.equal(1);

		data1.length.should.be.equal(31);
	});

	it('test game 2', () => {
		console.log('data2.length ', data2.length);

		const game = new Game();

		for (let dataIdx = 0; dataIdx < data2.length; dataIdx++) {
			const obj = data2[dataIdx]; // next move
			game.handleNextMove(obj);

			game.moves.length.should.be.equal(dataIdx + 1);

			if (dataIdx < data2.length - 1) {
				game.isVictory().should.equal(false);
				game.victories.should.be.equal(0);
			}
		}

		game.isVictory().should.equal(true);
		game.handleVictory(false);
		game.victories.should.be.equal(1);

		data1.length.should.be.equal(31);
	});
});
