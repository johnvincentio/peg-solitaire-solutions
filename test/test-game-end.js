
/* jshint node: true */
/* jshint esnext: true */
/* global describe, it*/

'use strict';

const Game = require('../game');
const Board = require('../board');

var should = require('chai').should();

var expect = require('chai').expect;

describe('test end of game', function() {

    it('game should be over', function() {

        let board = new Board();
        board.empty_board();
        board.setOccupied(6, 2);

        let game = new Game(board);

        let move = {"status":"OK","from":{"row":6,"column":4},"via":{"row":6,"column":3},"to":{"row":6,"column":2},"type":4};

        game.moves.push(move);
        game.from = {row: 0, column: 0, type: 0};

        game.handleNextMove({status: 'None'});

        game.isGameOver().should.equal(true);
    });

    it('game should not be over', function() {

        let board = new Board();
        board.empty_board();
        board.setOccupied(6, 2);

        let game = new Game(board);

        game.moves.push({"status":"OK","from":{"row":6,"column":4},"via":{"row":6,"column":3},"to":{"row":6,"column":2},"type":4});
        game.moves.push({"status":"OK","from":{"row":3,"column":4},"via":{"row":3,"column":3},"to":{"row":3,"column":2},"type":4});
        game.from = {row: 0, column: 0, type: 0};

        game.handleNextMove({status: 'None'});

        game.isGameOver().should.equal(false);
    });
});
