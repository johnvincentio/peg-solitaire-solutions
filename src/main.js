//

/**
 * Main module of Application to calculate all solutions to the Peg Solitaire game
 * <pre>
 * 1. Load modules
 * 2. Start looking for solutions.
 * </pre>
 * @module Main
 * @requires Game
 */

const Game = require('./game.js');

const game = new Game();
game.start();

console.log('********** Game Exited ********');
