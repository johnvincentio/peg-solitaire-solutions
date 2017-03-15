
/* jshint node: true */
/* jshint esnext: true */

'use strict';

class Utils {

    constructor(game) {
        this.game = game;
    }

    check(obj, local) {
        if (obj.status === 'OK') {
            local.push(obj);

            this.game.moves[this.game.moves.length - 1].should.be.equal(obj);

            this.game.from.row.should.be.equal(0);
            this.game.from.column.should.be.equal(0);
            this.game.from.type.should.be.equal(0);

            this.game.board.isOccupied(obj.from.row, obj.from.column).should.equal(false);
            this.game.board.isOccupied(obj.via.row, obj.via.column).should.equal(false);
            this.game.board.isOccupied(obj.to.row, obj.to.column).should.equal(true);
        }
        else if (obj.status === 'None') {
            let last = local.pop();

            this.game.moves[this.game.moves.length - 1].should.be.deep.equal(local[local.length - 1]);

            this.game.from.row.should.be.equal(last.from.row);
            this.game.from.column.should.be.equal(last.from.column);
            this.game.from.type.should.be.equal(last.type);

            this.game.board.isOccupied(last.from.row, last.from.column).should.equal(true);
            this.game.board.isOccupied(last.via.row, last.via.column).should.equal(true);
            this.game.board.isOccupied(last.to.row, last.to.column).should.equal(false);
        }
        else {
            throw Error(`Exception; unknown status ${JSON.stringify(obj)}`);
        }
    }
}

module.exports = Utils;
