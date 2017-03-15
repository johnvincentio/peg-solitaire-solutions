
/* jshint node: true */
/* jshint esnext: true */

'use strict';

class Game {

    constructor(board) {
        this.board = board;
        this.moves = [];
        this.victories = 0;
        this.from = {row: 0, column: 0, type: 0};
    }

    isVictory() {
        if (this.moves.length < 31) {
            return false;
        }
        if (! this.board.isOccupied(3, 3)) {
            return false;
        }
        return true;
    }

    isGameOver() {
        if (this.moves.length <= 0) {
            if (this.from.row === 6 && this.from.column === 4 && this.from.type === 4) {
                console.log("Game is over");
                return true;
            }
        }
        return false;
    }

    writeVictory() {
        var fs = require('fs');
        fs.writeFileSync('victories/' + this.victories + '.txt', JSON.stringify(this.moves));
    }

    start() {
        console.log("Started at "+new Date().getTime());
        while (true) {
            let move = this.nextMove();
            this.handleNextMove(move);
            if (this.isVictory()) {
                this.handleVictory(true);
            }
            if (this.isGameOver()) {
                break;
            }
        }
        console.log("Ended at "+new Date().getTime());
    }

    handleVictory(save) {
        this.victories++;
        console.log("*** Victory "+this.victories+" has been found at "+new Date().getTime()+" ***");
        if (save) {this.writeVictory();}
        this.handleNextMove({status: 'None'});
    }

    nextMove() {
        for (let row = this.from.row; row < 7; row++) {
            for (let column = this.from.column; column < 7; column++) {
                if (! this.board.isLegal(row, column)) {
                    continue;
                }
                let startType = 1;
                if (row === this.from.row && column === this.from.column) {
                    startType = this.from.type + 1;
                }
                let move = this.board.findMove(row, column, startType);
                if (move.status === 'OK') {
                    return move;
                }
            }
        }
        return {status: 'None'};
    }

    handleNextMove(move) {
        if (move.status === 'OK') {
            if (this.moves.length <= 0) {
                console.log("--- First Move "+JSON.stringify(move)+" at "+new Date().getTime());
            }
            this.board.makeMove(move);
            this.moves.push(move);
            this.from = {row: 0, column: 0, type: 0};
        }
        else if (move.status === 'None') {
            let lastMove = this.moves.pop();
            this.board.deleteMove(lastMove);
            this.from = {row: lastMove.from.row, column: lastMove.from.column, type: lastMove.type};
        }
        else {
            throw Error(`Exception in start(); move ${move} is invalid status`);
        }
    }
}

module.exports = Game;
