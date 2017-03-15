
/* jshint node: true */
/* jshint esnext: true */
/* global describe, it*/

'use strict';

const Board = require('../board');

require('chai').should();

var expect = require('chai').expect;

describe('board functions', function() {
    it('find hightest legal row, column', function() {
        let board = new Board();
        let max_row = -1;
        let max_column = -1;
        for (let row = 0; row < 7; row++) {
            max_row = row;
            for (let column = 0; column < 7; column++) {
                if (! board.isLegal(row, column)) {
                    continue;
                }
                max_column = column;
            }
        }
//        console.log("max_row "+max_row+" max_column "+max_column);
        max_row.should.be.equal(6);
        max_column.should.be.equal(4);
    });
});
