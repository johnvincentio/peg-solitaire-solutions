//

/* global describe, it */

/* eslint-disable no-plusplus */

/**
 * Test the first series of moves
 *
 * @module test-first-moves
 * @requires Game
 * @requires Utils
 */

const Game = require('../src/game');
const Utils = require('./utils');

const testData = [
	{ status: 'OK', from: { row: 1, column: 3 }, via: { row: 2, column: 3 }, to: { row: 3, column: 3 }, type: 3 },
	{ status: 'OK', from: { row: 2, column: 1 }, via: { row: 2, column: 2 }, to: { row: 2, column: 3 }, type: 2 },
	{ status: 'OK', from: { row: 0, column: 2 }, via: { row: 1, column: 2 }, to: { row: 2, column: 2 }, type: 3 },
	{ status: 'OK', from: { row: 0, column: 4 }, via: { row: 0, column: 3 }, to: { row: 0, column: 2 }, type: 4 },
	{ status: 'OK', from: { row: 2, column: 3 }, via: { row: 2, column: 2 }, to: { row: 2, column: 1 }, type: 4 },
	{ status: 'OK', from: { row: 2, column: 0 }, via: { row: 2, column: 1 }, to: { row: 2, column: 2 }, type: 2 },
	{ status: 'OK', from: { row: 2, column: 4 }, via: { row: 1, column: 4 }, to: { row: 0, column: 4 }, type: 1 },
	{ status: 'OK', from: { row: 2, column: 6 }, via: { row: 2, column: 5 }, to: { row: 2, column: 4 }, type: 4 },
	{ status: 'OK', from: { row: 3, column: 2 }, via: { row: 2, column: 2 }, to: { row: 1, column: 2 }, type: 1 },
	{ status: 'OK', from: { row: 0, column: 2 }, via: { row: 1, column: 2 }, to: { row: 2, column: 2 }, type: 3 },
	{ status: 'OK', from: { row: 3, column: 0 }, via: { row: 3, column: 1 }, to: { row: 3, column: 2 }, type: 2 },
	{ status: 'OK', from: { row: 3, column: 2 }, via: { row: 2, column: 2 }, to: { row: 1, column: 2 }, type: 1 },
	{ status: 'OK', from: { row: 3, column: 4 }, via: { row: 2, column: 4 }, to: { row: 1, column: 4 }, type: 1 },
	{ status: 'OK', from: { row: 0, column: 4 }, via: { row: 1, column: 4 }, to: { row: 2, column: 4 }, type: 3 },
	{ status: 'OK', from: { row: 3, column: 6 }, via: { row: 3, column: 5 }, to: { row: 3, column: 4 }, type: 4 },
	{ status: 'OK', from: { row: 3, column: 3 }, via: { row: 3, column: 4 }, to: { row: 3, column: 5 }, type: 2 },
	{ status: 'OK', from: { row: 4, column: 5 }, via: { row: 3, column: 5 }, to: { row: 2, column: 5 }, type: 1 },
	{ status: 'OK', from: { row: 2, column: 4 }, via: { row: 2, column: 5 }, to: { row: 2, column: 6 }, type: 2 },
	{ status: 'OK', from: { row: 4, column: 3 }, via: { row: 4, column: 4 }, to: { row: 4, column: 5 }, type: 2 },
	{ status: 'OK', from: { row: 4, column: 1 }, via: { row: 4, column: 2 }, to: { row: 4, column: 3 }, type: 2 },
	{ status: 'OK', from: { row: 4, column: 6 }, via: { row: 4, column: 5 }, to: { row: 4, column: 4 }, type: 4 },
	{ status: 'OK', from: { row: 4, column: 3 }, via: { row: 4, column: 4 }, to: { row: 4, column: 5 }, type: 2 },
	{ status: 'OK', from: { row: 6, column: 2 }, via: { row: 5, column: 2 }, to: { row: 4, column: 2 }, type: 1 },
	{ status: 'OK', from: { row: 5, column: 4 }, via: { row: 5, column: 3 }, to: { row: 5, column: 2 }, type: 4 },
	{ status: 'OK', from: { row: 4, column: 2 }, via: { row: 5, column: 2 }, to: { row: 6, column: 2 }, type: 3 },
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{ status: 'OK', from: { row: 5, column: 2 }, via: { row: 4, column: 2 }, to: { row: 3, column: 2 }, type: 1 },
	{ status: 'OK', from: { row: 6, column: 4 }, via: { row: 6, column: 3 }, to: { row: 6, column: 2 }, type: 4 },
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{ status: 'OK', from: { row: 6, column: 4 }, via: { row: 6, column: 3 }, to: { row: 6, column: 2 }, type: 4 },
	{ status: 'OK', from: { row: 5, column: 2 }, via: { row: 4, column: 2 }, to: { row: 3, column: 2 }, type: 1 },
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{ status: 'OK', from: { row: 6, column: 4 }, via: { row: 5, column: 4 }, to: { row: 4, column: 4 }, type: 1 },
	{ status: 'OK', from: { row: 4, column: 4 }, via: { row: 4, column: 5 }, to: { row: 4, column: 6 }, type: 2 },
	{ status: 'OK', from: { row: 6, column: 3 }, via: { row: 5, column: 3 }, to: { row: 4, column: 3 }, type: 1 },
	{ status: 'OK', from: { row: 4, column: 2 }, via: { row: 4, column: 3 }, to: { row: 4, column: 4 }, type: 2 },
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{ status: 'OK', from: { row: 4, column: 3 }, via: { row: 4, column: 2 }, to: { row: 4, column: 1 }, type: 4 },
	{ status: 'OK', from: { row: 4, column: 0 }, via: { row: 4, column: 1 }, to: { row: 4, column: 2 }, type: 2 },
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{ status: 'OK', from: { row: 4, column: 5 }, via: { row: 4, column: 4 }, to: { row: 4, column: 3 }, type: 4 },
	{ status: 'OK', from: { row: 4, column: 2 }, via: { row: 4, column: 3 }, to: { row: 4, column: 4 }, type: 2 },
	{ status: 'OK', from: { row: 6, column: 3 }, via: { row: 5, column: 3 }, to: { row: 4, column: 3 }, type: 1 },
	{ status: 'OK', from: { row: 4, column: 3 }, via: { row: 4, column: 4 }, to: { row: 4, column: 5 }, type: 2 },
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{ status: 'OK', from: { row: 4, column: 4 }, via: { row: 4, column: 3 }, to: { row: 4, column: 2 }, type: 4 },
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{
		status: 'None',
		from: { row: -1, column: -1 },
		via: { row: -1, column: -1 },
		to: { row: -1, column: -1 },
		type: -1
	},
	{ status: 'OK', from: { row: 4, column: 3 }, via: { row: 4, column: 2 }, to: { row: 4, column: 1 }, type: 4 },
	{ status: 'OK', from: { row: 4, column: 0 }, via: { row: 4, column: 1 }, to: { row: 4, column: 2 }, type: 2 },
	{ status: 'OK', from: { row: 6, column: 3 }, via: { row: 5, column: 3 }, to: { row: 4, column: 3 }, type: 1 },
	{ status: 'OK', from: { row: 4, column: 2 }, via: { row: 4, column: 3 }, to: { row: 4, column: 4 }, type: 2 }
];

describe('test the first series of moves', () => {
	it('test moves are the same as the saved moves', () => {
		const game = new Game();
		const utils = new Utils(game);
		utils.checkInitial();

		const local = [];
		for (let dataIdx = 0; dataIdx < testData.length; dataIdx++) {
			const found = game.nextMove();
			const obj = game.currentMove;
			obj.should.be.deep.equal(testData[dataIdx]);

			if (found) {
				game.makeMove();
			} else {
				game.deleteMove();
			}

			utils.check(obj, local);

			game.isVictory().should.equal(false);
			game.victories.should.be.equal(0);
		}
	});
});
