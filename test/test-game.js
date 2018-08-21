//

/* global describe, it */

/**
 * Test game
 *
 * @module test-game
 * @requires Game
 */

const Game = require('../src/game');

describe('test game', () => {
	it('test start of the game', () => {
		const game = new Game();
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
