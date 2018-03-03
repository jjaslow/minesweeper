'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    this._numberOfColumns = numberOfColumns;
    this._numberOfRows = numberOfRows;
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      if (rowIndex > this._numberOfRows - 1 || columnIndex > this._numberOfColumns - 1 || rowIndex < 0 || columnIndex < 0) {
        console.log('');
        console.log('guess is outside of the board 1');
      } else {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
          console.log();
          console.log('You hit a bomb! Game Over Man!');
          console.log();
          this._board.print(this._board.playerBoard);
          console.log();
          console.log('Here are all the bombs:');
          console.log();
          this._board.print(this._board.bombBoard);
          console.log();
        } else if (!this._board.hasSafeTiles()) {
          //false there no more safe tiles
          console.log();
          console.log('No more Bombs. You WON DUDE!');
          console.log();
          this._board.print(this._board.playerBoard);
          console.log();
        } else {
          //true, there are still safe tiles. keep going
          console.log();
          console.log('Current Board:');
          console.log();
          this._board.print(this._board.playerBoard);
          console.log();
        }
      }
    }
  }]);

  return Game;
}();

///////////////////////


var Board = function () {
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
      if (rowIndex > this.playerBoard.length - 1 || columnIndex > this.playerBoard[0].length - 1 || rowIndex < 0 || columnIndex < 0) {
        console.log('');
        console.log('guess is outside of the board 2');
      } else if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('');
        console.log('This tile has already been flipped!');
        return false;
      } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
        this.playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        this._numberOfTiles--;
      }
    }

    ////////

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this.bombBoard.length;
      var numberOfColumns = this.bombBoard[0].length;
      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
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
      console.log(board.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
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

/*
let playerBoard = generatePlayerBoard(5,5);
let bombBoard = generateBombBoard(5,5,8);
console.log();
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 2, 3);
console.log();
console.log('Updated Player Board:');
printBoard(playerBoard);
*/


var g = new Game(3, 3, 2);
g.playMove(2, 2);
g.playMove(0, 2);