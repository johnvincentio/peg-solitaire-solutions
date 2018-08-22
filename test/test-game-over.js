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
		game.emptyBoard();
		game.setOccupied(6, 2);

		game.makeMoveStatus('OK', 6, 4, 6, 3, 6, 2, 4);

		game.table.counter = 0;
		game.table.moves[0] = game.currentMove;

		game.from = { row: 0, column: 0, type: 0 };

		game.deleteMove();

		game.isGameOver().should.equal(true);
	});

	it('game should not be over', () => {
		const game = new Game();
		game.emptyBoard();
		game.setOccupied(6, 2);

		game.makeMoveStatus('OK', 6, 4, 6, 3, 6, 2, 4);
		game.table.moves[++game.table.counter] = game.currentMove;

		game.makeMoveStatus('OK', 3, 4, 3, 3, 3, 2, 4);
		game.table.moves[++game.table.counter] = game.currentMove;

		game.from = { row: 0, column: 0, type: 0 };

		game.deleteMove();

		game.isGameOver().should.equal(false);
	});
});
