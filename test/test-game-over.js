//

/* global describe, it */

/* eslint-disable no-plusplus */

/**
 * Test game over
 *
 * @module test-game-over
 * @requires Game
 */

const Game = require('../src/game');

describe('test end of game', () => {
	it('game should be over', () => {
		const game = new Game();
		for (let row = 5; row < 7; row++) {
			for (let column = 4; column < 7; column++) {
				for (let type = 1; type < 5; type++) {
					game.from = { row, column, type };
					game.nextMove().should.equal(false);
					game.table.counter.should.equal(-1);
				}
			}
		}
	});

	it('game should not be over', () => {
		const game = new Game();
		game.isOccupied(5, 3).should.equal(true);
		game.isOccupied(4, 3).should.equal(true);
		game.isOccupied(3, 3).should.equal(false);

		game.from = { row: 5, column: 3, type: 0 };

		game.nextMove().should.equal(true);

		game.makeMove().should.equal(true);
		game.table.counter.should.equal(0);

		const obj = {
			status: 'OK',
			from: { row: 5, column: 3 },
			via: { row: 4, column: 3 },
			to: { row: 3, column: 3 },
			type: 1
		};
		obj.should.be.deep.equal(game.currentMove);
		obj.should.be.deep.equal(game.table.moves[0]);

		game.isOccupied(5, 3).should.equal(false);
		game.isOccupied(4, 3).should.equal(false);
		game.isOccupied(3, 3).should.equal(true);
	});
});
