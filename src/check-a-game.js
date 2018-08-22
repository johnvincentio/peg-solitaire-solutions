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

// try {
const data = JSON.parse(fs.readFileSync(args[0], 'utf8'));
// console.log('data ', data);
if (data.length !== 31) {
	throw Error(`Exception in file ${args[0]}, incorrect length of ${data.length}`);
}

const game = new Game();

for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
	const obj = data[dataIdx];
	if (obj.status !== 'OK') {
		throw Error(`Exception in file ${args[0]}, status ${obj.status} is invalid`);
	}

	game.currentMove = obj; // set current move
	game.handleNextMove(); // make the move

	if (game.table.counter !== dataIdx) {
		throw Error(
			`Exception in file ${args[0]}, dataIdx ${dataIdx} 
			should be equal game.moves.length ${game.table.counter}`
		);
	}

	if (dataIdx < data.length - 1) {
		if (game.isVictory()) {
			throw Error(`Exception in file ${args[0]}, unexpected victory condition`);
		}
	}
}

if (!game.isVictory()) {
	throw Error(`Exception in file ${args[0]}, expected victory condition`);
}
// } catch (err) {
// 	console.error('Exception: ', err);
// }
