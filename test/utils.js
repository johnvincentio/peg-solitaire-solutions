//

class Utils {
	constructor(game) {
		this.game = game;
	}

	checkInitial() {
		this.game.isVictory().should.be.a('boolean');
		this.game.isVictory().should.equal(false);
		this.game.victories.should.be.equal(0);

		const { from } = this.game;
		from.row.should.be.equal(0);
		from.column.should.be.equal(0);
		from.type.should.be.equal(0);

		this.game.moves.length.should.be.equal(0);
	}

	checkVictory(victory) {
		// console.log('victory ', victory);

		this.game.moves.length.should.be.equal(31);

		// console.log('moves ', this.game.moves);
		this.game.moves.should.be.deep.equal(victory);

		this.game.isVictory().should.be.a('boolean');
		this.game.isVictory().should.equal(true);
	}

	check(obj, local) {
		if (obj.status === 'OK') {
			local.push(obj);

			this.game.moves[this.game.moves.length - 1].should.be.equal(obj);

			this.game.from.row.should.be.equal(0);
			this.game.from.column.should.be.equal(0);
			this.game.from.type.should.be.equal(0);

			this.game.isOccupied(obj.from.row, obj.from.column).should.equal(false);
			this.game.isOccupied(obj.via.row, obj.via.column).should.equal(false);
			this.game.isOccupied(obj.to.row, obj.to.column).should.equal(true);
		} else if (obj.status === 'None') {
			const last = local.pop();

			this.game.moves[this.game.moves.length - 1].should.be.deep.equal(local[local.length - 1]);

			this.game.from.row.should.be.equal(last.from.row);
			this.game.from.column.should.be.equal(last.from.column);
			this.game.from.type.should.be.equal(last.type);

			this.game.isOccupied(last.from.row, last.from.column).should.equal(true);
			this.game.isOccupied(last.via.row, last.via.column).should.equal(true);
			this.game.isOccupied(last.to.row, last.to.column).should.equal(false);
		} else {
			throw Error(`Exception; unknown status ${JSON.stringify(obj)}`);
		}
	}
}

module.exports = Utils;
