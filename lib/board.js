'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

///////////////////////
var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',


    ////////////
    value: function flipTile(rowIndex, columnIndex) {
      var _this = this;

      if (rowIndex > this.playerBoard.length - 1 || columnIndex > this.playerBoard[0].length - 1 || rowIndex < 0 || columnIndex < 0) {
        console.log('');
        console.log('guess is outside of the board 2');
      } else if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
        return false;
      }
      /*else if (this.playerBoard[rowIndex][columnIndex] !== ' '){
        console.log('');
        console.log('This tile has already been flipped!');
        return false;
      } */
      else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
          this.playerBoard[rowIndex][columnIndex] = 'B';
        } else {
          this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
          this._numberOfTiles--;
          //recursive code starts here
          if (this.playerBoard[rowIndex][columnIndex] === 0) {
            var neighborOffsets2 = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            var numberOfRows = this.bombBoard.length;
            var numberOfColumns = this.bombBoard[0].length;
            neighborOffsets2.forEach(function (offset) {
              var neighborRowIndex2 = rowIndex + offset[0];
              var neighborColumnIndex2 = columnIndex + offset[1];
              if (neighborRowIndex2 >= 0 && neighborRowIndex2 < numberOfRows && neighborColumnIndex2 >= 0 && neighborColumnIndex2 < numberOfColumns) {
                //this.playerBoard[neighborRowIndex2][neighborColumnIndex2] = this.getNumberOfNeighborBombs(neighborRowIndex2, neighborColumnIndex2);
                _this.flipTile(neighborRowIndex2, neighborColumnIndex2);
              }
            });
          } //end recursive code
        }
    }

    ////////

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this2 = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this.bombBoard.length;
      var numberOfColumns = this.bombBoard[0].length;
      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this2.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });

      return numberOfBombs;
    }

    ////////////////

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles(numberOfTiles, numberOfBombs) {
      return this.numberOfBombs !== this.numberOfTiles;
    }

    //////////////

  }, {
    key: 'print',
    value: function print(board) {
      var printArrayCopy = board.map(function (a) {
        return a.slice();
      });
      var arrayWidth = board[0].length; //5
      var arrayHeight = board.length; //5
      var borderLines = ['   '];
      var headerNumbers = ['  '];
      var borderLinesWidth = (arrayWidth - 1) * 3 + arrayWidth + 2;
      for (var x = 0; x < borderLinesWidth; x++) {
        borderLines.push('_');
      }
      for (var _x = 0; _x < arrayWidth; _x++) {
        headerNumbers.push(_x);
      }
      for (var _x2 = 0; _x2 < arrayHeight; _x2++) {
        printArrayCopy[_x2].unshift(_x2 + ']');
      }
      console.log(headerNumbers.join(' | '));
      console.log(borderLines.join(''));
      console.log(printArrayCopy.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
      console.log(borderLines.join(''));
      //for (let x=0; x < arrayHeight ; x++)
      //  {
      //  printArrayCopy[x].shift();
      //         }
    }

    /////////////

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }, {
    key: 'numberOfBombs',
    get: function get() {
      return this._numberOfBombs;
    }
  }, {
    key: 'numberOfTiles',
    get: function get() {
      return this._numberOfTiles;
    }
  }, {
    key: 'bombBoard',
    get: function get() {
      return this._bombBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var addRow = 0; addRow < numberOfRows; addRow++) {
        var row = [];
        for (var addColumn = 0; addColumn < numberOfColumns; addColumn++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }

    //////////////////////

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      if (numberOfBombs > numberOfRows * numberOfColumns) {
        console.log('You cant have more bombs than tiles dumbass.');
        return;
      }
      var board = [];
      for (var addRow = 0; addRow < numberOfRows; addRow++) {
        var row = [];
        for (var addColumn = 0; addColumn < numberOfColumns; addColumn++) {
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (!board[randomRowIndex][randomColumnIndex]) {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();