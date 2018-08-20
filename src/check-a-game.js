//

/* eslint-disable no-plusplus */

/**
 * Check a Peg Solitaire solution to verify it is correct.
 *
 * @module CheckGame
 * @requires fs
 * @requires Game
 * @requires Utils
 */

const fs = require('fs');

const Game = require('./game.js');

const args = process.argv.slice(2);
console.log('Checking file ', args[0]);
// console.log('args ', args);

const data = JSON.parse(fs.readFileSync(args[0], 'utf8'));
// console.log('data ', data);
if (data.length !== 31) {
	throw Error(`Exception in file ${args[0]}, incorrect length of ${data.length}`);
}

const game = new Game();

for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
	const obj = data[dataIdx]; // next move
	// console.log('obj ', obj);
	game.handleNextMove(obj);
}

if (!game.isVictory()) {
	throw Error(`Exception in file ${args[0]}, expected victory condition`);
}
