//

/* global describe, it */

/**
 * Test game
 *
 * @module test-game
 * @requires Game
 * @requires Board
 */

const Game = require('../src/game');
const Board = require('../src/board');

describe('test moves', () => {
	it('test start of the game', () => {
		const game = new Game(new Board());
		game.isVictory().should.be.a('boolean');
		game.isVictory().should.equal(false);
		game.victories.should.be.equal(0);

		const { from } = game;
		from.row.should.be.equal(0);
		from.column.should.be.equal(0);
		from.type.should.be.equal(0);

		game.moves.length.should.be.equal(0);
	});
});
