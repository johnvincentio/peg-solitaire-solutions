
'use strict';

var APP = APP || {};

APP.model = APP.model || {};

APP.model.collection = {
    rows : [],

/*
* initial setup of the board model
*/
    init: function() {
        this.rows = [];
        for (var x = 0; x < 7; x++) {
            var row = [];
            for (var y = 0; y < 7; y++) {
                var legal = true;
                var occupied = true;
                if (! this.isLegal(x, y)) {
                    legal = false;
                    occupied = false;
                }
                if (x === 3 && y === 3) {
                    occupied = false;
                }
                row.push({legal: legal, occupied: occupied});
            }
            this.rows.push(row);
        }
    },
/*
* Set status of all board tiles.
*
* Status: draggable = true for tiles that can be dragged, and to a tiles allowing a drop.
* Status: droppable = true for tiles that can be dropped, and from a tiles allowing a drag.
*/
    setStatus: function() {
        for (var x = 0; x < 7; x++) {
            var row = this.rows[x];
            for (var y = 0; y < 7; y++) {
                var item = row[y];

                if (! this.isLegal(x, y)) {
                    continue;
                }
                if (this.isOccupied(x, y)) {
//                    console.log("isOccupied; x "+x+" y "+y);
                    item.droppable = false;
                    if (this.anyLegalFromMoves(x, y)) {
//                        console.log("anyLegalFromMoves; x "+x+" y "+y);
                        item.draggable = true;
                    }
                    else {
                        item.draggable = false;
                    }
                }
                else {
//                    console.log("! isOccupied; x "+x+" y "+y);
                    item.draggable = false;
                    if (this.anyLegalToMoves(x, y)) {
//                        console.log("anyLegalToMoves; x "+x+" y "+y);
                        item.droppable = true;
                    }
                    else {
                        item.droppable = false;
                    }
                }
            }
        }
    },
    isDraggable: function(data) {
        return this.rows[data.row][data.column].draggable;
    },
    isDroppable: function(data) {
        return this.rows[data.row][data.column].droppable;
    },

/*
* The board is treated as a square, so the function is used to determine which squares are
* within the board
*/
    isLegal: function(row, column) {
        if (row < 0 || row > 6) {
            return false;
        }
        if (column < 0 || column > 6) {
            return false;
        }
        if (row === 0 || row === 1 || row === 5 || row === 6) {
            if (column === 0 || column === 1 || column === 5 || column === 6) {
                return false;
            }
        }
        return true;
    },
    isOccupied: function(row, column) {
        return this.rows[row][column].occupied;
    },
    setEmpty: function(row, column) {
        this.rows[row][column].occupied = false;
    },
    setOccupied: function(row, column) {
        this.rows[row][column].occupied = true;
    },

/*
* Look for any legal move from (row, column)
*
* Return:
*    true => >= 1 legal move from (row, column) was found.
*    false => there are no legal moves from (row, column)
*/
    anyLegalFromMoves: function(row, column) {
        return this.isFromUpMoveLegal(row, column) ||
                this.isFromDownMoveLegal(row, column) ||
                this.isFromLeftMoveLegal(row, column) ||
                this.isFromRightMoveLegal(row, column);
    },
    isFromUpMoveLegal: function(row, column) {
        return this.isLegal(row, column) && this.isOccupied(row, column) &&
            this.isLegal(row-1, column) && this.isOccupied(row-1, column) &&
            this.isLegal(row-2, column) && ! this.isOccupied(row-2, column);
    },
    isFromDownMoveLegal: function(row, column) {
        return this.isLegal(row, column) && this.isOccupied(row, column) &&
            this.isLegal(row+1, column) && this.isOccupied(row+1, column) &&
            this.isLegal(row+2, column) && ! this.isOccupied(row+2, column);
    },
    isFromLeftMoveLegal: function(row, column) {
        return this.isLegal(row, column) && this.isOccupied(row, column) &&
            this.isLegal(row, column-1) && this.isOccupied(row, column-1) &&
            this.isLegal(row, column-2) && ! this.isOccupied(row, column-2);
    },
    isFromRightMoveLegal: function(row, column) {
        return this.isLegal(row, column) && this.isOccupied(row, column) &&
            this.isLegal(row, column+1) && this.isOccupied(row, column+1) &&
            this.isLegal(row, column+2) && ! this.isOccupied(row, column+2);
    },

/*
* Look for any legal move to (row, column)
*
* Return:
*    true => >= 1 legal move to (row, column) was found.
*    false => there are no legal moves to (row, column)
*/
    anyLegalToMoves: function(row, column) {
        return this.isToUpMoveLegal(row, column) ||
                this.isToDownMoveLegal(row, column) ||
                this.isToLeftMoveLegal(row, column) ||
                this.isToRightMoveLegal(row, column);
    },
    isToUpMoveLegal: function(row, column) {
        return this.isLegal(row, column) && ! this.isOccupied(row, column) &&
            this.isLegal(row-1, column) && this.isOccupied(row-1, column) &&
            this.isLegal(row-2, column) && this.isOccupied(row-2, column);
    },
    isToDownMoveLegal: function(row, column) {
        return this.isLegal(row, column) && ! this.isOccupied(row, column) &&
            this.isLegal(row+1, column) && this.isOccupied(row+1, column) &&
            this.isLegal(row+2, column) && this.isOccupied(row+2, column);
    },
    isToLeftMoveLegal: function(row, column) {
        return this.isLegal(row, column) && ! this.isOccupied(row, column) &&
            this.isLegal(row, column-1) && this.isOccupied(row, column-1) &&
            this.isLegal(row, column-2) && this.isOccupied(row, column-2);
    },
    isToRightMoveLegal: function(row, column) {
        return this.isLegal(row, column) && ! this.isOccupied(row, column) &&
            this.isLegal(row, column+1) && this.isOccupied(row, column+1) &&
            this.isLegal(row, column+2) && this.isOccupied(row, column+2);
    },

/*
* Handle a User move.
*
* Parameters:
*
* Passed:
*   from_row, from_column => position of from tile.
*   to_row, to_column => position of to tile.
*
* Returned:
*   true => move was successful
*   false => move was not valid and did not happen.
*
* A drag happened from (from_row, from_column) to (to_row, to_column).
*
* 1. Verify from and to are the 2 tiles apart, on a straight line.
* 2. Calculate the tile between from & to.
* 3. Verify from tile is legal and is occupied.
* 4. Verify in between tile is legal and is occupied.
* 5. Verify to tile is legal and is not occupied.
* 6. Update data model:
* 6a. Set from tile to empty
* 6b. Set in between tile to empty
* 6c. Set to tile to occupied.
*/
    moved: function(from_row, from_column, to_row, to_column) {
//        console.log(">>> moved; from ("+from_row+","+from_column+") to ("+to_row+","+to_column+")");

        if ((from_row === to_row && Math.abs(from_column - to_column) === 2) ||
           (from_column === to_column && Math.abs(from_row - to_row) === 2)) {      // 1
//            console.log("still possible");
        }
        else {
            return false;       // 1, not a valid drop request.
        }
        var int_row = (from_row === to_row) ? from_row : Math.min(from_row, to_row) + 1;    // 2
        var int_column = (from_column === to_column) ? from_column : Math.min(from_column, to_column) + 1;

        if (! this.isLegal(from_row, from_column) || ! this.isOccupied(from_row, from_column)) {    // 3
//            console.log("<<< moved (Error 1)");
            return false;
        }
        if (! this.isLegal(int_row, int_column) || ! this.isOccupied(int_row, int_column)) {    // 4
//            console.log("<<< moved (Error 2)");
            return false;
        }
        if (! this.isLegal(to_row, to_column) || this.isOccupied(to_row, to_column)) {      // 5
//            console.log("<<< moved (Error 3)");
            return false;
        }

        this.setEmpty(from_row, from_column);   // 6a
        this.setEmpty(int_row, int_column);     // 6b
        this.setOccupied(to_row, to_column);    // 6c

//        console.log("<<< moved (ok)");
        return true;
    }
};
