//

const Game = require('./game.js');
const Board = require('./board.js');

const board = new Board();
const game = new Game(board);

game.start();

console.log('********** Game Exited ********');
