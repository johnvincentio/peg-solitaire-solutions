//

/* global describe, it */

/* eslint-disable no-plusplus, no-continue */

/**
 * Test board
 *
 * @module test-board
 * @requires chai
 * @requires Game
 */

const Game = require('../src/game');

require('chai').should();

const { expect } = require('chai');

describe('test Board.isLegal()', () => {
	it('isLegal() should return boolean', () => {
		const ans = Game.isLegal(-1, -1);
		ans.should.be.a('boolean');
		ans.should.equal(false);
	});

	it('isLegal() should understand legal tiles', () => {
		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					Game.isLegal(row, col).should.equal(false);
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						Game.isLegal(row, col).should.equal(false);
						continue;
					}
				}
				Game.isLegal(row, col).should.equal(true);
			}
		}
	});
});

describe('testBoard.isOccupied()', () => {
	it('isOccupied(-1, -1) should throw Error', () => {
		expect(() => {
			new Game().isOccupied(-1, -1);
		}).to.throw(Error);
	});

	it('isOccupied(-1, 3) should throw Error', () => {
		expect(() => {
			new Game().isOccupied(-1, 3);
		}).to.throw(Error);
	});

	it('isOccupied(3, -1) should throw Error', () => {
		expect(() => {
			new Game().isOccupied(3, -1);
		}).to.throw(Error);
	});

	it('isOccupied(3, -1) should not throw Error', () => {
		expect(() => {
			new Game().isOccupied(3, 3);
		}).to.not.throw(Error);
	});

	it('isOccupied(3, 3) of a legal tile should return boolean', () => {
		new Game().isOccupied(3, 3).should.be.a('boolean');
	});

	it('isOccupied() should understand initial setup', () => {
		const game = new Game();

		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						continue;
					}
				}
				if (row === 3 && col === 3) {
					game.isOccupied(row, col).should.equal(false);
				} else {
					game.isOccupied(row, col).should.equal(true);
				}
			}
		}
	});
});

describe('testBoard.setEmpty()', () => {
	it('setEmpty(-1, -1) should throw Error', () => {
		expect(() => {
			new Game().setEmpty(-1, -1);
		}).to.throw(Error);
	});

	it('setEmpty(-1, 3) should throw Error', () => {
		expect(() => {
			new Game().setEmpty(-1, 3);
		}).to.throw(Error);
	});

	it('setEmpty(3, -1) should throw Error', () => {
		expect(() => {
			new Game().setEmpty(3, -1);
		}).to.throw(Error);
	});

	it('setEmpty(3, -1) should not throw Error', () => {
		expect(() => {
			new Game().setEmpty(3, 3);
		}).to.not.throw(Error);
	});

	it('setEmpty(2, 3) of a legal tile should return boolean', () => {
		new Game().isOccupied(2, 3).should.be.a('boolean');
	});

	it('setEmpty(2, 3) of an occupied tile should return empty', () => {
		const game = new Game();
		game.isOccupied(2, 3).should.equal(true);
		game.setEmpty(2, 3);
		game.isOccupied(2, 3).should.equal(false);
	});

	it('setEmpty() should understand initial setup', () => {
		const game = new Game();

		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						continue;
					}
				}
				game.setEmpty(row, col);
				game.isOccupied(row, col).should.equal(false);
			}
		}
	});
});

describe('testBoard.setOccupied()', () => {
	it('setOccupied(-1, -1) should throw Error', () => {
		expect(() => {
			new Game().setOccupied(-1, -1);
		}).to.throw(Error);
	});

	it('setOccupied(-1, 3) should throw Error', () => {
		expect(() => {
			new Game().setOccupied(-1, 3);
		}).to.throw(Error);
	});

	it('setOccupied(3, -1) should throw Error', () => {
		expect(() => {
			new Game().setOccupied(3, -1);
		}).to.throw(Error);
	});

	it('setOccupied(3, -1) should not throw Error', () => {
		expect(() => {
			new Game().setOccupied(3, 3);
		}).to.not.throw(Error);
	});

	it('setOccupied(3, 3) of an occupied tile should return occupied', () => {
		const game = new Game();
		game.isOccupied(3, 3).should.equal(false);
		game.setOccupied(3, 3);
		game.isOccupied(3, 3).should.equal(true);
	});

	it('setEmpty() should understand initial setup', () => {
		const game = new Game();

		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						continue;
					}
				}
				game.setEmpty(row, col);
				game.isOccupied(row, col).should.equal(false);
			}
		}
	});
});

describe('board functions', () => {
	it('find hightest legal row, column', () => {
		let maxRow = -1;
		let maxColumn = -1;
		for (let row = 0; row < 7; row++) {
			maxRow = row;
			for (let column = 0; column < 7; column++) {
				if (!Game.isLegal(row, column)) {
					continue;
				}
				maxColumn = column;
			}
		}
		// console.log("maxRow "+maxRow+" maxColumn "+maxColumn);
		maxRow.should.be.equal(6);
		maxColumn.should.be.equal(4);
	});
});
