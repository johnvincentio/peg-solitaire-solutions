//

/* eslint-disable no-plusplus, no-continue */

/**
 * Game module, iterates over all options.
 * <pre>
 * Note: VICTORIES_DIR is retrieved from the environment
 * </pre>
 * @class Game
 * @requires fs
 * @requires Board
 */

const fs = require('fs');

const Board = require('./board.js');

const { VICTORIES_DIR } = process.env;

class Game {
	constructor(board) {
		this.board = board;
		this.moves = [];
		this.victories = 0;
		this.from = { row: 0, column: 0, type: 0 };
	}

	/**
	 * Determine whether victory has been found
	 *
	 * @return {boolean} - true if victory has been found
	 */
	isVictory() {
		if (this.moves.length < 31) {
			return false;
		}
		if (!this.board.isOccupied(3, 3)) {
			return false;
		}
		return true;
	}

	/**
	 * Determine whether game is over
	 *
	 * @return {boolean} - true if game is over
	 */
	isGameOver() {
		if (this.moves.length <= 0) {
			if (this.from.row === 6 && this.from.column === 4 && this.from.type === 4) {
				console.log('Game is over');
				return true;
			}
		}
		return false;
	}

	/**
	 * Handle write the victory
	 */
	writeVictory() {
		fs.writeFileSync(`${VICTORIES_DIR}/${this.victories}.txt`, JSON.stringify(this.moves));
	}

	/* eslint no-constant-condition: ["error", { "checkLoops": false }] */

	/**
	 * Start looking for solutions
	 */
	start() {
		console.log(`Started at ${new Date().getTime()}`);
		while (true) {
			const move = this.nextMove();
			this.handleNextMove(move);
			if (this.isVictory()) {
				this.handleVictory(true);
			}
			if (this.isGameOver()) {
				break;
			}
		}
		console.log(`Ended at ${new Date().getTime()}`);
	}

	/**
	 * Handle a victory has been found
	 *
	 * @param {boolean} save - true if game is to be saved
	 */
	handleVictory(save) {
		this.victories++;
		console.log(`*** Victory ${this.victories} has been found at ${new Date().getTime()} ***`);
		if (save) {
			this.writeVictory();
		}
		this.handleNextMove({ status: 'None' });
	}

	/**
	 * Look for the next move
	 */
	nextMove() {
		for (let { row } = this.from; row < 7; row++) {
			for (let { column } = this.from; column < 7; column++) {
				if (!Board.isLegal(row, column)) {
					continue;
				}
				let startType = 1;
				if (row === this.from.row && column === this.from.column) {
					startType = this.from.type + 1;
				}
				const move = this.board.findMove(row, column, startType);
				if (move.status === 'OK') {
					return move;
				}
			}
		}
		return { status: 'None' };
	}

	/**
	 * Handle next move
	 *
	 * @param {object} move - current move
	 */
	handleNextMove(move) {
		if (move.status === 'OK') {
			if (this.moves.length <= 0) {
				console.log(`--- First Move ${JSON.stringify(move)} at ${new Date().getTime()}`);
			}
			this.board.makeMove(move);
			this.moves.push(move);
			this.from = { row: 0, column: 0, type: 0 };
		} else if (move.status === 'None') {
			const lastMove = this.moves.pop();
			this.board.deleteMove(lastMove);
			this.from = { row: lastMove.from.row, column: lastMove.from.column, type: lastMove.type };
		} else {
			throw Error(`Exception in start(); move ${move} is invalid status`);
		}
	}
}

module.exports = Game;
