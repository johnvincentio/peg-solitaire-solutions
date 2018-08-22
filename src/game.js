//

/* eslint-disable no-plusplus, no-continue */

/**
 * Game module, iterates over all options.
 * <pre>
 * Note: VICTORIES_DIR is retrieved from the environment
 * </pre>
 * @class Game
 * @requires fs
 */

const fs = require('fs');

const { VICTORIES_DIR, VICTORIES_LOG } = process.env;

class Game {
	constructor() {
		// this.moves = [];
		this.table = {
			moves: [],
			counter: -1
		};

		this.makeNoMoveStatus();
		for (let x = 0; x < 31; x++) {
			this.table.moves[x] = this.currentMove;
		}

		this.victories = 0;
		this.from = { row: 0, column: 0, type: 0 };
		this.currentMove = {
			status: 'Error',
			from: { row: -1, column: -1 },
			via: { row: -1, column: -1 },
			to: { row: -1, column: -1 },
			type: -1
		};

		let x;
		let y;
		this.rows = [];
		for (x = 0; x < 7; x++) {
			const row = [];
			for (y = 0; y < 7; y++) {
				let legal = true;
				let occupied = true;
				if (!Game.isLegal(x, y)) {
					legal = false;
					occupied = false;
				}
				if (x === 3 && y === 3) {
					occupied = false;
				}
				row.push({ legal, occupied });
			}
			this.rows.push(row);
		}
	}

	/**
	 * empty the board model
	 */
	emptyBoard() {
		this.rows = [];
		for (let x = 0; x < 7; x++) {
			const row = [];
			for (let y = 0; y < 7; y++) {
				let legal = true;
				const occupied = false;
				if (!Game.isLegal(x, y)) {
					legal = false;
				}
				row.push({ legal, occupied });
			}
			this.rows.push(row);
		}
	}

	/**
	 * Determine whether victory has been found
	 *
	 * @return {boolean} - true if victory has been found
	 */
	isVictory() {
		if (this.table.counter < 30) {
			return false;
		}
		if (!this.isOccupied(3, 3)) {
			return false;
		}
		return true;
	}

	/**
	 * Handle write the victory
	 */
	writeVictory() {
		fs.writeFileSync(`${VICTORIES_DIR}/${this.victories}.txt`, JSON.stringify(this.table.moves));
	}

	/**
	 * Determine whether game is over
	 *
	 * @return {boolean} - true if game is over
	 */
	isGameOver() {
		if (this.table.counter <= 0) {
			if (this.from.row === 6 && this.from.column === 4 && this.from.type === 4) {
				console.log('Game is over');
				return true;
			}
		}
		return false;
	}

	/* eslint no-constant-condition: ["error", { "checkLoops": false }] */

	/**
	 * Start looking for solutions
	 */
	start() {
		console.log(`Started at ${new Date().getTime()}`);
		while (true) {
			this.nextMove();
			this.handleNextMove();
			if (this.isVictory()) {
				this.handleVictory(true);
				this.deleteMove();
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
		if (VICTORIES_LOG === 'true') {
			console.log(`*** Victory ${this.victories} has been found at ${new Date().getTime()} ***`);
		}
		if (save) {
			this.writeVictory();
		}
	}

	/**
	 * Look for the next move
	 *
	 * @return {boolean} true if a possible next move was found
	 */
	nextMove() {
		for (let { row } = this.from; row < 7; row++) {
			for (let { column } = this.from; column < 7; column++) {
				if (!Game.isLegal(row, column)) {
					continue;
				}
				let startType = 1;
				if (row === this.from.row && column === this.from.column) {
					startType = this.from.type + 1;
				}
				if (this.findMove(row, column, startType)) {
					return true;
				}
			}
		}
		this.makeNoMoveStatus();
		return false;
	}

	/**
	 * Find the next possible move
	 *
	 * @param {number} row - from row
	 * @param {number} column - from column
	 * @param {number} type - begin with this move type
	 * @return {boolean} true if a possible move was found
	 */
	findMove(row, column, type) {
		for (let current = type; current < 5; current++) {
			if (current === 1) {
				if (this.isFromUpMoveLegal(row, column)) {
					this.makeMoveStatus('OK', row, column, row - 1, column, row - 2, column, current);
					return true;
				}
			} else if (current === 2) {
				if (this.isFromRightMoveLegal(row, column)) {
					this.makeMoveStatus('OK', row, column, row, column + 1, row, column + 2, current);
					return true;
				}
			} else if (current === 3) {
				if (this.isFromDownMoveLegal(row, column)) {
					this.makeMoveStatus('OK', row, column, row + 1, column, row + 2, column, current);
					return true;
				}
			} else if (current === 4) {
				if (this.isFromLeftMoveLegal(row, column)) {
					this.makeMoveStatus('OK', row, column, row, column - 1, row, column - 2, current);
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Handle next move
	 */
	handleNextMove() {
		if (this.currentMove.status === 'OK') {
			this.makeMove();
		} else if (this.currentMove.status === 'None') {
			this.deleteMove();
		} else {
			throw Error(`Exception in start(); move ${this.currentMove.status} is invalid status`);
		}
	}

	/**
	 * Make this move
	 *
	 * @return {Object} Move object
	 * @throws {Error} if move is not valid
	 *
	 * <pre>
	 * 1. Verify from and to are the 2 tiles apart, on a straight line.
	 * 2. Calculate the tile between from & to.
	 * 3. Verify from tile is legal and is occupied.
	 * 4. Verify in between tile is legal and is occupied.
	 * 5. Verify to tile is legal and is not occupied.
	 * 6. Update data model:
	 * 6a. Set from tile to empty
	 * 6b. Set in between tile to empty
	 * 6c. Set to tile to occupied.
	 * </pre>
	 */
	makeMove() {
		// console.log(`>>> makeMove; move ${JSON.stringify(move)}`);
		// if (this.moves.length <= 0) {
		// 	console.log(`--- First Move ${JSON.stringify(this.currentMove)} at ${new Date().getTime()}`);
		// }

		const { status, from, to, via, type } = this.currentMove;
		if (status !== 'OK') {
			throw Error(`Exception in makeMove(); move ${JSON.stringify(this.currentMove)} is invalid status`);
		}

		if (!Game.isTypeLegal(type)) {
			throw Error(`Exception in makeMove(); type ${type} in ${JSON.stringify(this.currentMove)} is invalid`);
		}

		switch (type) {
			case 1: // move up
				if (
					via.row !== from.row - 1 ||
					to.row !== from.row - 2 ||
					via.column !== from.column ||
					to.column !== from.column
				) {
					throw Error(`Exception in makeMove(); ${JSON.stringify(this.currentMove)} is not a possible move`);
				}
				break;
			case 2: // move right
				if (
					via.row !== from.row ||
					to.row !== from.row ||
					via.column !== from.column + 1 ||
					to.column !== from.column + 2
				) {
					throw Error(`Exception in makeMove(); ${JSON.stringify(this.currentMove)} is not a possible move`);
				}
				break;
			case 3: // move down
				if (
					via.row !== from.row + 1 ||
					to.row !== from.row + 2 ||
					via.column !== from.column ||
					to.column !== from.column
				) {
					throw Error(`Exception in makeMove(); ${JSON.stringify(this.currentMove)} is not a possible move`);
				}
				break;
			case 4: // move left
				if (
					via.row !== from.row ||
					to.row !== from.row ||
					via.column !== from.column - 1 ||
					to.column !== from.column - 2
				) {
					throw Error(`Exception in makeMove(); ${JSON.stringify(this.currentMove)} is not a possible move`);
				}
				break;
			default:
				break;
		}

		if (!Game.isLegal(from.row, from.column) || !this.isOccupied(from.row, from.column)) {
			// 3
			throw Error(`Exception in makeMove(); from in ${JSON.stringify(this.currentMove)} is invalid`);
		}
		if (!Game.isLegal(via.row, via.column) || !this.isOccupied(via.row, via.column)) {
			// 4
			throw Error(`Exception in makeMove(); via in ${JSON.stringify(this.currentMove)} is invalid`);
		}
		if (!Game.isLegal(to.row, to.column) || this.isOccupied(to.row, to.column)) {
			// 5
			throw Error(`Exception in makeMove(); to in ${JSON.stringify(this.currentMove)} is invalid`);
		}

		this.setEmpty(from.row, from.column); // 6a
		this.setEmpty(via.row, via.column); // 6b
		this.setOccupied(to.row, to.column); // 6c

		// this.moves.push(this.currentMove);

		this.table.moves[++this.table.counter] = this.currentMove;

		this.from = { row: 0, column: 0, type: 0 };

		// console.log(`<<< makeMove; move ${JSON.stringify(move)}`);
		return true;
	}

	/**
	 * Delete last move
	 *
	 * @throws {Error} if move is not valid
	 */
	deleteMove() {
		// console.log('>>> deleteMove');
		// const lastMove = this.moves.pop();

		const lastMove = this.table.moves[this.table.counter];
		this.table.moves[this.table.counter] = this.currentMove;
		this.table.counter--;

		const { status, from, to, via } = lastMove;
		if (status !== 'OK') {
			throw Error(`Exception in deleteMove(); move ${lastMove} is invalid status`);
		}
		this.setOccupied(from.row, from.column);
		this.setOccupied(via.row, via.column);
		this.setEmpty(to.row, to.column);

		this.from = { row: lastMove.from.row, column: lastMove.from.column, type: lastMove.type };
		// console.log('<<< deleteMove');
	}

	/**
	 * Determine whether this position is occupied.
	 *
	 * @param {number} row - row
	 * @param {number} column - column
	 * @return {boolean} - true if is occupied
	 */
	isOccupied(row, column) {
		if (!Game.isLegal(row, column)) {
			throw Error(`Exception in isOccupied(); row ${row} column ${column} is not legal`);
		}
		return this.rows[row][column].occupied;
	}

	/**
	 * Set this position to empty
	 *
	 * @param {number} row - row
	 * @param {number} column - column
	 * @throws {Error} if position is not legal
	 */
	setEmpty(row, column) {
		if (!Game.isLegal(row, column)) {
			throw Error(`Exception in setEmpty(); row ${row} column ${column} is not legal`);
		}
		this.rows[row][column].occupied = false;
	}

	/**
	 * Set this position to occupied
	 *
	 * @param {number} row - row
	 * @param {number} column - column
	 * @throws {Error} if position is not legal
	 */
	setOccupied(row, column) {
		if (!Game.isLegal(row, column)) {
			throw Error(`Exception in setEmpty(); row ${row} column ${column} is not legal`);
		}
		this.rows[row][column].occupied = true;
	}

	/**
	 * Determine whether moving up is legal
	 *
	 * @param {number} row - row
	 * @param {number} column - column
	 * @return {boolean} - true if legal
	 */
	isFromUpMoveLegal(row, column) {
		return (
			Game.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			Game.isLegal(row - 1, column) &&
			this.isOccupied(row - 1, column) &&
			Game.isLegal(row - 2, column) &&
			!this.isOccupied(row - 2, column)
		);
	}

	/**
	 * Determine whether moving right is legal
	 *
	 * @param {number} row - row
	 * @param {number} column - column
	 * @return {boolean} - true if legal
	 */
	isFromRightMoveLegal(row, column) {
		return (
			Game.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			Game.isLegal(row, column + 1) &&
			this.isOccupied(row, column + 1) &&
			Game.isLegal(row, column + 2) &&
			!this.isOccupied(row, column + 2)
		);
	}

	/**
	 * Determine whether moving down is legal
	 *
	 * @param {number} row - row
	 * @param {number} column - column
	 * @return {boolean} - true if legal
	 */
	isFromDownMoveLegal(row, column) {
		return (
			Game.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			Game.isLegal(row + 1, column) &&
			this.isOccupied(row + 1, column) &&
			Game.isLegal(row + 2, column) &&
			!this.isOccupied(row + 2, column)
		);
	}

	/**
	 * Determine whether moving left is legal
	 *
	 * @param {number} row - row
	 * @param {number} column - column
	 * @return {boolean} - true if legal
	 */
	isFromLeftMoveLegal(row, column) {
		return (
			Game.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			Game.isLegal(row, column - 1) &&
			this.isOccupied(row, column - 1) &&
			Game.isLegal(row, column - 2) &&
			!this.isOccupied(row, column - 2)
		);
	}

	/**
	 * Determine whether this position is legal.
	 *
	 * The board is treated as a square, so the function is used to determine which squares are
	 * within the board
	 *
	 * @param {number} row - row
	 * @param {number} column - column
	 * @return {boolean} - true if is a legal position
	 */
	static isLegal(row, column) {
		if (row < 0 || row > 6) {
			return false;
		}
		if (column < 0 || column > 6) {
			return false;
		}
		if (row === 0 || row === 1 || row === 5 || row === 6) {
			if (column === 0 || column === 1 || column === 5 || column === 6) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Determine whether this position is legal.
	 *
	 * The board is treated as a square, so the function is used to determine which squares are
	 * within the board
	 *
	 * @param {number} type - type
	 * @return {boolean} - true if is a legal type
	 */
	static isTypeLegal(type) {
		return type > 0 && type < 5;
	}

	/**
	 * Transform move status to an object
	 *
	 * @param {string} status - status
	 * @param {number} fromRow - from row
	 * @param {number} fromColumn - from column
	 * @param {number} viaRow - via row
	 * @param {number} viaColumn - via column
	 * @param {number} toRow - to row
	 * @param {number} toColumn - to column
	 * @param {number} type - move type
	 * @return {Object} Move object
	 */
	makeMoveStatus(status, fromRow, fromColumn, viaRow, viaColumn, toRow, toColumn, type) {
		this.currentMove = {
			status,
			from: { row: fromRow, column: fromColumn },
			via: { row: viaRow, column: viaColumn },
			to: { row: toRow, column: toColumn },
			type
		};
	}

	/**
	 * Set move status to no move found
	 */
	makeNoMoveStatus() {
		this.currentMove = {
			status: 'None',
			from: { row: -1, column: -1 },
			via: { row: -1, column: -1 },
			to: { row: -1, column: -1 },
			type: -1
		};
	}
}

module.exports = Game;
