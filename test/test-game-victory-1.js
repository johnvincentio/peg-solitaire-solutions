
/* jshint node: true */
/* jshint esnext: true */
/* global describe, it*/

'use strict';

const Game = require('../game');
const Board = require('../board');
const Utils = require('./utils');

var should = require('chai').should();
var expect = require('chai').expect;

const data = [];
data[0] = [
    {"status":"OK","from":{"row":1,"column":3},"via":{"row":2,"column":3},"to":{"row":3,"column":3},"type":3},
    {"status":"OK","from":{"row":2,"column":1},"via":{"row":2,"column":2},"to":{"row":2,"column":3},"type":2},
    {"status":"OK","from":{"row":0,"column":2},"via":{"row":1,"column":2},"to":{"row":2,"column":2},"type":3},
    {"status":"OK","from":{"row":0,"column":4},"via":{"row":0,"column":3},"to":{"row":0,"column":2},"type":4},
    {"status":"OK","from":{"row":2,"column":3},"via":{"row":2,"column":2},"to":{"row":2,"column":1},"type":4},
    {"status":"OK","from":{"row":2,"column":0},"via":{"row":2,"column":1},"to":{"row":2,"column":2},"type":2},
    {"status":"OK","from":{"row":2,"column":4},"via":{"row":1,"column":4},"to":{"row":0,"column":4},"type":1},
    {"status":"OK","from":{"row":2,"column":6},"via":{"row":2,"column":5},"to":{"row":2,"column":4},"type":4},
    {"status":"OK","from":{"row":3,"column":2},"via":{"row":2,"column":2},"to":{"row":1,"column":2},"type":1},
    {"status":"OK","from":{"row":0,"column":2},"via":{"row":1,"column":2},"to":{"row":2,"column":2},"type":3},
    {"status":"OK","from":{"row":3,"column":0},"via":{"row":3,"column":1},"to":{"row":3,"column":2},"type":2},
    {"status":"OK","from":{"row":3,"column":2},"via":{"row":2,"column":2},"to":{"row":1,"column":2},"type":1},
    {"status":"OK","from":{"row":3,"column":4},"via":{"row":2,"column":4},"to":{"row":1,"column":4},"type":1},
    {"status":"OK","from":{"row":0,"column":4},"via":{"row":1,"column":4},"to":{"row":2,"column":4},"type":3},
    {"status":"OK","from":{"row":3,"column":6},"via":{"row":3,"column":5},"to":{"row":3,"column":4},"type":4},
    {"status":"OK","from":{"row":3,"column":4},"via":{"row":2,"column":4},"to":{"row":1,"column":4},"type":1},
    {"status":"OK","from":{"row":5,"column":4},"via":{"row":4,"column":4},"to":{"row":3,"column":4},"type":1},
    {"status":"OK","from":{"row":4,"column":6},"via":{"row":4,"column":5},"to":{"row":4,"column":4},"type":4},
    {"status":"OK","from":{"row":4,"column":4},"via":{"row":3,"column":4},"to":{"row":2,"column":4},"type":1},
    {"status":"OK","from":{"row":1,"column":4},"via":{"row":2,"column":4},"to":{"row":3,"column":4},"type":3},
    {"status":"OK","from":{"row":3,"column":4},"via":{"row":3,"column":3},"to":{"row":3,"column":2},"type":4},
    {"status":"OK","from":{"row":4,"column":2},"via":{"row":3,"column":2},"to":{"row":2,"column":2},"type":1},
    {"status":"OK","from":{"row":1,"column":2},"via":{"row":2,"column":2},"to":{"row":3,"column":2},"type":3},
    {"status":"OK","from":{"row":4,"column":0},"via":{"row":4,"column":1},"to":{"row":4,"column":2},"type":2},
    {"status":"OK","from":{"row":4,"column":3},"via":{"row":4,"column":2},"to":{"row":4,"column":1},"type":4},
    {"status":"OK","from":{"row":6,"column":2},"via":{"row":5,"column":2},"to":{"row":4,"column":2},"type":1},
    {"status":"OK","from":{"row":3,"column":2},"via":{"row":4,"column":2},"to":{"row":5,"column":2},"type":3},
    {"status":"OK","from":{"row":6,"column":4},"via":{"row":6,"column":3},"to":{"row":6,"column":2},"type":4},
    {"status":"OK","from":{"row":6,"column":2},"via":{"row":5,"column":2},"to":{"row":4,"column":2},"type":1},
    {"status":"OK","from":{"row":4,"column":1},"via":{"row":4,"column":2},"to":{"row":4,"column":3},"type":2},
    {"status":"OK","from":{"row":5,"column":3},"via":{"row":4,"column":3},"to":{"row":3,"column":3},"type":1}
];
data[1] = [
    {"status":"OK","from":{"row":1,"column":3},"via":{"row":2,"column":3},"to":{"row":3,"column":3},"type":3},
    {"status":"OK","from":{"row":2,"column":1},"via":{"row":2,"column":2},"to":{"row":2,"column":3},"type":2},
    {"status":"OK","from":{"row":0,"column":2},"via":{"row":1,"column":2},"to":{"row":2,"column":2},"type":3},
    {"status":"OK","from":{"row":0,"column":4},"via":{"row":0,"column":3},"to":{"row":0,"column":2},"type":4},
    {"status":"OK","from":{"row":2,"column":3},"via":{"row":2,"column":2},"to":{"row":2,"column":1},"type":4},
    {"status":"OK","from":{"row":2,"column":0},"via":{"row":2,"column":1},"to":{"row":2,"column":2},"type":2},
    {"status":"OK","from":{"row":2,"column":4},"via":{"row":1,"column":4},"to":{"row":0,"column":4},"type":1},
    {"status":"OK","from":{"row":2,"column":6},"via":{"row":2,"column":5},"to":{"row":2,"column":4},"type":4},
    {"status":"OK","from":{"row":3,"column":2},"via":{"row":2,"column":2},"to":{"row":1,"column":2},"type":1},
    {"status":"OK","from":{"row":0,"column":2},"via":{"row":1,"column":2},"to":{"row":2,"column":2},"type":3},
    {"status":"OK","from":{"row":3,"column":0},"via":{"row":3,"column":1},"to":{"row":3,"column":2},"type":2},
    {"status":"OK","from":{"row":3,"column":2},"via":{"row":2,"column":2},"to":{"row":1,"column":2},"type":1},
    {"status":"OK","from":{"row":3,"column":4},"via":{"row":2,"column":4},"to":{"row":1,"column":4},"type":1},
    {"status":"OK","from":{"row":0,"column":4},"via":{"row":1,"column":4},"to":{"row":2,"column":4},"type":3},
    {"status":"OK","from":{"row":3,"column":6},"via":{"row":3,"column":5},"to":{"row":3,"column":4},"type":4},
    {"status":"OK","from":{"row":3,"column":4},"via":{"row":2,"column":4},"to":{"row":1,"column":4},"type":1},
    {"status":"OK","from":{"row":5,"column":4},"via":{"row":4,"column":4},"to":{"row":3,"column":4},"type":1},
    {"status":"OK","from":{"row":4,"column":6},"via":{"row":4,"column":5},"to":{"row":4,"column":4},"type":4},
    {"status":"OK","from":{"row":4,"column":4},"via":{"row":3,"column":4},"to":{"row":2,"column":4},"type":1},
    {"status":"OK","from":{"row":1,"column":4},"via":{"row":2,"column":4},"to":{"row":3,"column":4},"type":3},
    {"status":"OK","from":{"row":3,"column":4},"via":{"row":3,"column":3},"to":{"row":3,"column":2},"type":4},
    {"status":"OK","from":{"row":4,"column":2},"via":{"row":3,"column":2},"to":{"row":2,"column":2},"type":1},
    {"status":"OK","from":{"row":1,"column":2},"via":{"row":2,"column":2},"to":{"row":3,"column":2},"type":3},
    {"status":"OK","from":{"row":4,"column":0},"via":{"row":4,"column":1},"to":{"row":4,"column":2},"type":2},
    {"status":"OK","from":{"row":4,"column":3},"via":{"row":4,"column":2},"to":{"row":4,"column":1},"type":4},
    {"status":"OK","from":{"row":6,"column":2},"via":{"row":5,"column":2},"to":{"row":4,"column":2},"type":1},
    {"status":"OK","from":{"row":6,"column":4},"via":{"row":6,"column":3},"to":{"row":6,"column":2},"type":4},
    {"status":"OK","from":{"row":3,"column":2},"via":{"row":4,"column":2},"to":{"row":5,"column":2},"type":3},
    {"status":"OK","from":{"row":6,"column":2},"via":{"row":5,"column":2},"to":{"row":4,"column":2},"type":1},
    {"status":"OK","from":{"row":4,"column":1},"via":{"row":4,"column":2},"to":{"row":4,"column":3},"type":2},
    {"status":"OK","from":{"row":5,"column":3},"via":{"row":4,"column":3},"to":{"row":3,"column":3},"type":1}
];

function testVictory(data) {
    let game = new Game(new Board());
    let utils = new Utils(game);

    const local = [];
    for (let data_idx = 0; data_idx < data.length; data_idx++) {
        let obj = data[data_idx];

        game.handleNextMove(obj);       // make the move

        utils.check(obj, local);

//      console.log("data_idx "+data_idx+" data.length "+data.length);
        if (data_idx < data.length - 1) {
            game.isVictory().should.equal(false);
            game.victories.should.be.equal(0);
        }
    }
    game.isVictory().should.equal(true);
    game.handleVictory(false);
    game.victories.should.be.equal(1);

    utils.check({status: 'None'}, local);
}

describe('test victory games', function() {

    it('test victory game 1', function() {
        const myData = data[0];
        testVictory(myData);
    });

    it('test victory game 2', function() {
        const myData = data[1];
        testVictory(myData);
    });
});
