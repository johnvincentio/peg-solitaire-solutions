//

/* global describe, it */

/* eslint-disable no-plusplus, no-continue */

const Board = require('../board');

require('chai').should();

// const expect = require('chai').expect;

describe('board functions', () => {
	it('find hightest legal row, column', () => {
		const board = new Board();
		let maxRow = -1;
		let maxColumn = -1;
		for (let row = 0; row < 7; row++) {
			maxRow = row;
			for (let column = 0; column < 7; column++) {
				if (!board.isLegal(row, column)) {
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
