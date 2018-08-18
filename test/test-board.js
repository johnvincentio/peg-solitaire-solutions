//

/* global describe, it */

/* eslint-disable no-plusplus, no-continue */

const Board = require('../board');

require('chai').should();

const { expect } = require('chai');

describe('test Board.isLegal()', () => {
	it('isLegal() should return boolean', () => {
		const ans = Board.isLegal(-1, -1);
		ans.should.be.a('boolean');
		ans.should.equal(false);
	});

	it('isLegal() should understand legal tiles', () => {
		for (let row = -3; row < 10; row++) {
			for (let col = -5; col < 11; col++) {
				if (row < 0 || row > 6 || col < 0 || col > 6) {
					Board.isLegal(row, col).should.equal(false);
					continue;
				}
				if (row === 0 || row === 1 || row === 5 || row === 6) {
					if (col === 0 || col === 1 || col === 5 || col === 6) {
						Board.isLegal(row, col).should.equal(false);
						continue;
					}
				}
				Board.isLegal(row, col).should.equal(true);
			}
		}
	});
});

describe('testBoard.isOccupied()', () => {
	it('isOccupied(-1, -1) should throw Error', () => {
		expect(() => {
			new Board().isOccupied(-1, -1);
		}).to.throw(Error);
	});

	it('isOccupied(-1, 3) should throw Error', () => {
		expect(() => {
			new Board().isOccupied(-1, 3);
		}).to.throw(Error);
	});

	it('isOccupied(3, -1) should throw Error', () => {
		expect(() => {
			new Board().isOccupied(3, -1);
		}).to.throw(Error);
	});

	it('isOccupied(3, -1) should not throw Error', () => {
		expect(() => {
			new Board().isOccupied(3, 3);
		}).to.not.throw(Error);
	});

	it('isOccupied(3, 3) of a legal tile should return boolean', () => {
		new Board().isOccupied(3, 3).should.be.a('boolean');
	});

	it('isOccupied() should understand initial setup', () => {
		const board = new Board();

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
					board.isOccupied(row, col).should.equal(false);
				} else {
					board.isOccupied(row, col).should.equal(true);
				}
			}
		}
	});
});

describe('testBoard.setEmpty()', () => {
	it('setEmpty(-1, -1) should throw Error', () => {
		expect(() => {
			new Board().setEmpty(-1, -1);
		}).to.throw(Error);
	});

	it('setEmpty(-1, 3) should throw Error', () => {
		expect(() => {
			new Board().setEmpty(-1, 3);
		}).to.throw(Error);
	});

	it('setEmpty(3, -1) should throw Error', () => {
		expect(() => {
			new Board().setEmpty(3, -1);
		}).to.throw(Error);
	});

	it('setEmpty(3, -1) should not throw Error', () => {
		expect(() => {
			new Board().setEmpty(3, 3);
		}).to.not.throw(Error);
	});

	it('setEmpty(2, 3) of a legal tile should return boolean', () => {
		new Board().isOccupied(2, 3).should.be.a('boolean');
	});

	it('setEmpty(2, 3) of an occupied tile should return empty', () => {
		const board = new Board();
		board.isOccupied(2, 3).should.equal(true);
		board.setEmpty(2, 3);
		board.isOccupied(2, 3).should.equal(false);
	});

	it('setEmpty() should understand initial setup', () => {
		const board = new Board();

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
				board.setEmpty(row, col);
				board.isOccupied(row, col).should.equal(false);
			}
		}
	});
});

describe('testBoard.setOccupied()', () => {
	it('setOccupied(-1, -1) should throw Error', () => {
		expect(() => {
			new Board().setOccupied(-1, -1);
		}).to.throw(Error);
	});

	it('setOccupied(-1, 3) should throw Error', () => {
		expect(() => {
			new Board().setOccupied(-1, 3);
		}).to.throw(Error);
	});

	it('setOccupied(3, -1) should throw Error', () => {
		expect(() => {
			new Board().setOccupied(3, -1);
		}).to.throw(Error);
	});

	it('setOccupied(3, -1) should not throw Error', () => {
		expect(() => {
			new Board().setOccupied(3, 3);
		}).to.not.throw(Error);
	});

	it('setOccupied(3, 3) of an occupied tile should return occupied', () => {
		const board = new Board();
		board.isOccupied(3, 3).should.equal(false);
		board.setOccupied(3, 3);
		board.isOccupied(3, 3).should.equal(true);
	});

	it('setEmpty() should understand initial setup', () => {
		const board = new Board();

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
				board.setEmpty(row, col);
				board.isOccupied(row, col).should.equal(false);
			}
		}
	});
});
