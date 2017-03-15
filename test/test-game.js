
/* jshint node: true */
/* jshint esnext: true */
/* global describe, it*/

'use strict';

const Game = require('../game');
const Board = require('../board');

var should = require('chai').should();

var expect = require('chai').expect;

describe('test moves', function() {

    it('test start of the game', function() {
        let game = new Game(new Board());
        game.isVictory().should.be.a('boolean');
        game.isVictory().should.equal(false);
        game.victories.should.be.equal(0);

        let from = game.from;
        from.row.should.be.equal(0);
        from.column.should.be.equal(0);
        from.type.should.be.equal(0);

        game.moves.length.should.be.equal(0);
    });
});
