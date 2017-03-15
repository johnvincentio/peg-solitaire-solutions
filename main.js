
/* jshint node: true */
/* jshint esnext: true */

'use strict';

var Game = require("./game.js");
var Board = require("./board.js");

var board = new Board();
var game = new Game(board);

game.start();

console.log("********** Game Exited ********");
