//

/* global describe, it */

/* eslint-disable no-plusplus */

const Game = require('../game');
const Board = require('../board');
const Utils = require('./utils');

// const should = require('chai').should();
// const expect = require('chai').expect;

const data = [
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
	{ status: 'None' },
	{ status: 'OK', from: { row: 5, column: 2 }, via: { row: 4, column: 2 }, to: { row: 3, column: 2 }, type: 1 },
	{ status: 'OK', from: { row: 6, column: 4 }, via: { row: 6, column: 3 }, to: { row: 6, column: 2 }, type: 4 },
	{ status: 'None' },
	{ status: 'None' },
	{ status: 'OK', from: { row: 6, column: 4 }, via: { row: 6, column: 3 }, to: { row: 6, column: 2 }, type: 4 },
	{ status: 'OK', from: { row: 5, column: 2 }, via: { row: 4, column: 2 }, to: { row: 3, column: 2 }, type: 1 },
	{ status: 'None' },
	{ status: 'None' },
	{ status: 'None' },
	{ status: 'OK', from: { row: 6, column: 4 }, via: { row: 5, column: 4 }, to: { row: 4, column: 4 }, type: 1 },
	{ status: 'OK', from: { row: 4, column: 4 }, via: { row: 4, column: 5 }, to: { row: 4, column: 6 }, type: 2 },
	{ status: 'OK', from: { row: 6, column: 3 }, via: { row: 5, column: 3 }, to: { row: 4, column: 3 }, type: 1 },
	{ status: 'OK', from: { row: 4, column: 2 }, via: { row: 4, column: 3 }, to: { row: 4, column: 4 }, type: 2 },
	{ status: 'None' },
	{ status: 'OK', from: { row: 4, column: 3 }, via: { row: 4, column: 2 }, to: { row: 4, column: 1 }, type: 4 },
	{ status: 'OK', from: { row: 4, column: 0 }, via: { row: 4, column: 1 }, to: { row: 4, column: 2 }, type: 2 },
	{ status: 'None' },
	{ status: 'None' },
	{ status: 'None' },
	{ status: 'None' },
	{ status: 'OK', from: { row: 4, column: 5 }, via: { row: 4, column: 4 }, to: { row: 4, column: 3 }, type: 4 },
	{ status: 'OK', from: { row: 4, column: 2 }, via: { row: 4, column: 3 }, to: { row: 4, column: 4 }, type: 2 },
	{ status: 'OK', from: { row: 6, column: 3 }, via: { row: 5, column: 3 }, to: { row: 4, column: 3 }, type: 1 },
	{ status: 'OK', from: { row: 4, column: 3 }, via: { row: 4, column: 4 }, to: { row: 4, column: 5 }, type: 2 },
	{ status: 'None' },
	{ status: 'OK', from: { row: 4, column: 4 }, via: { row: 4, column: 3 }, to: { row: 4, column: 2 }, type: 4 },
	{ status: 'None' },
	{ status: 'None' },
	{ status: 'None' },
	{ status: 'OK', from: { row: 4, column: 3 }, via: { row: 4, column: 2 }, to: { row: 4, column: 1 }, type: 4 },
	{ status: 'OK', from: { row: 4, column: 0 }, via: { row: 4, column: 1 }, to: { row: 4, column: 2 }, type: 2 },
	{ status: 'OK', from: { row: 6, column: 3 }, via: { row: 5, column: 3 }, to: { row: 4, column: 3 }, type: 1 },
	{ status: 'OK', from: { row: 4, column: 2 }, via: { row: 4, column: 3 }, to: { row: 4, column: 4 }, type: 2 }
	//    {"status":"END"}            // TODO; remove this when finished
];

describe('test long game', () => {
	it('test forward moves', () => {
		const game = new Game(new Board());
		const utils = new Utils(game);

		const local = [];
		for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
			const obj = game.nextMove(); // next move
			//            console.log(JSON.stringify(obj));
			obj.should.be.deep.equal(data[dataIdx]);

			game.handleNextMove(obj); // make the move

			utils.check(obj, local);

			game.isVictory().should.equal(false);
			game.victories.should.be.equal(0);
		}
	});
});
