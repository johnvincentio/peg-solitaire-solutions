//

/**
 * Main module of Application to calculate all solutions to the Peg Solitaire game
 * <pre>
 * 1. Load modules
 * 2. Start looking for solutions.
 * </pre>
 * @module Main
 * @requires Game
 * @requires Board
 */

const Game = require('./game.js');
const Board = require('./board.js');

const board = new Board();
const game = new Game(board);

game.start();

console.log('********** Game Exited ********');
