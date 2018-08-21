//

/* global describe, it */

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
		game.emptyBoard();
		game.setOccupied(6, 2);

		const move = {
			status: 'OK',
			from: { row: 6, column: 4 },
			via: { row: 6, column: 3 },
			to: { row: 6, column: 2 },
			type: 4
		};

		game.moves.push(move);
		game.from = { row: 0, column: 0, type: 0 };

		game.handleNextMove();

		game.isGameOver().should.equal(true);
	});

	it('game should not be over', () => {
		const game = new Game();
		game.emptyBoard();
		game.setOccupied(6, 2);

		game.moves.push({
			status: 'OK',
			from: { row: 6, column: 4 },
			via: { row: 6, column: 3 },
			to: { row: 6, column: 2 },
			type: 4
		});
		game.moves.push({
			status: 'OK',
			from: { row: 3, column: 4 },
			via: { row: 3, column: 3 },
			to: { row: 3, column: 2 },
			type: 4
		});
		game.from = { row: 0, column: 0, type: 0 };

		game.handleNextMove({ status: 'None' });

		game.isGameOver().should.equal(false);
	});
});
