//

/* eslint-disable no-plusplus */

/**
 * Check a Peg Solitaire solution to verify it is correct.
 *
 * @module CheckGame
 * @requires fs
 * @requires Game
 * @requires Board
 * @requires Utils
 */

const fs = require('fs');

const Game = require('./game.js');
const Board = require('./board.js');
const Utils = require('../test/utils.js');

const args = process.argv.slice(2);
console.log('args ', args);

// const data = [];

const data = JSON.parse(fs.readFileSync(args[0], 'utf8'));
console.log('data ', data);

const game = new Game(new Board());
const utils = new Utils(game);

for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
	const obj = game.nextMove(); // next move
	console.log('obj ', obj);
	// console.log(JSON.stringify(obj));
	// obj.should.be.deep.equal(data[dataIdx]);

	// game.handleNextMove(obj); // make the move

	// utils.check(obj, local);

	// game.isVictory().should.equal(false);
	// game.victories.should.be.equal(0);
}
