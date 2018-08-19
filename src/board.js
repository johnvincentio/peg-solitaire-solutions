//

/* eslint-disable no-plusplus */

/**
 * Board models the solitaire board and handles all tasks related to the board.
 *
 * @class Board
 */

class Board {
	constructor() {
		this.init();
	}

	/*
* initial setup of the board model
*/
	init() {
		let x;
		let y;
		this.rows = [];
		for (x = 0; x < 7; x++) {
			const row = [];
			for (y = 0; y < 7; y++) {
				let legal = true;
				let occupied = true;
				if (!Board.isLegal(x, y)) {
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

	/*
* empty the board model
*/
	emptyBoard() {
		this.rows = [];
		for (let x = 0; x < 7; x++) {
			const row = [];
			for (let y = 0; y < 7; y++) {
				let legal = true;
				const occupied = false;
				if (!Board.isLegal(x, y)) {
					legal = false;
				}
				row.push({ legal, occupied });
			}
			this.rows.push(row);
		}
	}

	/*
* The board is treated as a square, so the function is used to determine which squares are
* within the board
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

	isOccupied(row, column) {
		if (!Board.isLegal(row, column)) {
			throw Error(`Exception in isOccupied(); row ${row} column ${column} is not legal`);
		}
		return this.rows[row][column].occupied;
	}

	setEmpty(row, column) {
		if (!Board.isLegal(row, column)) {
			throw Error(`Exception in setEmpty(); row ${row} column ${column} is not legal`);
		}
		this.rows[row][column].occupied = false;
	}

	setOccupied(row, column) {
		if (!Board.isLegal(row, column)) {
			throw Error(`Exception in setEmpty(); row ${row} column ${column} is not legal`);
		}
		this.rows[row][column].occupied = true;
	}

	/*
* Look for any legal move from (row, column)
*
* Return:
*    true => >= 1 legal move from (row, column) was found.
*    false => there are no legal moves from (row, column)
*/
	//    anyLegalFromMoves(row, column) {
	//        return this.isFromUpMoveLegal(row, column) ||
	//                this.isFromDownMoveLegal(row, column) ||
	//                this.isFromLeftMoveLegal(row, column) ||
	//                this.isFromRightMoveLegal(row, column);
	//    }

	static makeMoveStatus(status, fromRow, fromColumn, viaRow, viaColumn, toRow, toColumn, type) {
		return {
			status,
			from: { row: fromRow, column: fromColumn },
			via: { row: viaRow, column: viaColumn },
			to: { row: toRow, column: toColumn },
			type
		};
	}

	findMove(row, column, type) {
		for (let current = type; current < 5; current++) {
			if (current === 1) {
				if (this.isFromUpMoveLegal(row, column)) {
					return Board.makeMoveStatus('OK', row, column, row - 1, column, row - 2, column, current);
				}
			} else if (current === 2) {
				if (this.isFromRightMoveLegal(row, column)) {
					return Board.makeMoveStatus('OK', row, column, row, column + 1, row, column + 2, current);
				}
			} else if (current === 3) {
				if (this.isFromDownMoveLegal(row, column)) {
					return Board.makeMoveStatus('OK', row, column, row + 1, column, row + 2, column, current);
				}
			} else if (current === 4) {
				if (this.isFromLeftMoveLegal(row, column)) {
					return Board.makeMoveStatus('OK', row, column, row, column - 1, row, column - 2, current);
				}
			}
		}
		return { status: 'None' };
	}

	/*
* 1. Verify from and to are the 2 tiles apart, on a straight line.
* 2. Calculate the tile between from & to.
* 3. Verify from tile is legal and is occupied.
* 4. Verify in between tile is legal and is occupied.
* 5. Verify to tile is legal and is not occupied.
* 6. Update data model:
* 6a. Set from tile to empty
* 6b. Set in between tile to empty
* 6c. Set to tile to occupied.
*/
	makeMove(move) {
		// console.log(">>> makeMove; move "+JSON.stringify(move));
		const { status, from, to, via } = move;
		if (status !== 'OK') {
			throw Error(`Exception in makeMove(); move ${move} is invalid status`);
		}

		if (!Board.isLegal(from.row, from.column) || !this.isOccupied(from.row, from.column)) {
			// 3
			throw Error(`Exception in makeMove(); from in ${move} is invalid`);
		}
		if (!Board.isLegal(via.row, via.column) || !this.isOccupied(via.row, via.column)) {
			// 4
			throw Error(`Exception in makeMove(); via in ${move} is invalid`);
		}
		if (!Board.isLegal(to.row, to.column) || this.isOccupied(to.row, to.column)) {
			// 5
			throw Error(`Exception in makeMove(); to in ${move} is invalid`);
		}

		this.setEmpty(from.row, from.column); // 6a
		this.setEmpty(via.row, via.column); // 6b
		this.setOccupied(to.row, to.column); // 6c

		// console.log("<<< makeMove; move "+JSON.stringify(move));
		return true;
	}

	deleteMove(move) {
		// console.log(">>> deleteMove; move "+JSON.stringify(move));
		const { status, from, to, via } = move;
		if (status !== 'OK') {
			throw Error(`Exception in deleteMove(); move ${move} is invalid status`);
		}
		this.setOccupied(from.row, from.column);
		this.setOccupied(via.row, via.column);
		this.setEmpty(to.row, to.column);
		// console.log("<<< deleteMove; move "+JSON.stringify(move));
	}

	isFromUpMoveLegal(row, column) {
		return (
			Board.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			Board.isLegal(row - 1, column) &&
			this.isOccupied(row - 1, column) &&
			Board.isLegal(row - 2, column) &&
			!this.isOccupied(row - 2, column)
		);
	}
	isFromRightMoveLegal(row, column) {
		return (
			Board.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			Board.isLegal(row, column + 1) &&
			this.isOccupied(row, column + 1) &&
			Board.isLegal(row, column + 2) &&
			!this.isOccupied(row, column + 2)
		);
	}
	isFromDownMoveLegal(row, column) {
		return (
			Board.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			Board.isLegal(row + 1, column) &&
			this.isOccupied(row + 1, column) &&
			Board.isLegal(row + 2, column) &&
			!this.isOccupied(row + 2, column)
		);
	}
	isFromLeftMoveLegal(row, column) {
		return (
			Board.isLegal(row, column) &&
			this.isOccupied(row, column) &&
			Board.isLegal(row, column - 1) &&
			this.isOccupied(row, column - 1) &&
			Board.isLegal(row, column - 2) &&
			!this.isOccupied(row, column - 2)
		);
	}
}

module.exports = Board;
