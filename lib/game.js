'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// game.flag(1,1);
// When done run `.exit`


var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
    this._numberOfColumns = numberOfColumns;
    this._numberOfRows = numberOfRows;
    this._startTime = new Date();
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      if (rowIndex > this._numberOfRows - 1 || columnIndex > this._numberOfColumns - 1 || rowIndex < 0 || columnIndex < 0) {
        console.log('');
        console.log('guess is outside of the board 1');
      } else if (this._board.playerBoard[rowIndex][columnIndex] === 'F') {
        console.log('');
        console.log('This tile has been flagged!');
      } /////
      else if (this._board.playerBoard[rowIndex][columnIndex] !== ' ') {
          console.log('');
          console.log('This tile has already been flipped!');
        } //////
        else {
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
              var endTime = new Date();
              endTime = (endTime - this._startTime) % 86400000 % 3600000 / 1000;
              console.log('You played for ' + endTime + ' seconds.');
              console.log();
            } else if (!this._board.hasSafeTiles()) {
              //false there no more safe tiles
              console.log();
              console.log('No more Bombs. You WON DUDE!');
              console.log();
              this._board.print(this._board.playerBoard);
              console.log();
              var _endTime = new Date();
              _endTime = (_endTime - this._startTime) % 86400000 % 3600000 / 1000;
              console.log('You played for ' + _endTime + ' seconds.');
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

    //here

  }, {
    key: 'flag',
    value: function flag(rowIndex, columnIndex) {
      if (this._board.playerBoard[rowIndex][columnIndex] === ' ') {
        this._board.playerBoard[rowIndex][columnIndex] = 'F';
      } else if (this._board.playerBoard[rowIndex][columnIndex] === 'F') {
        this._board.playerBoard[rowIndex][columnIndex] = ' ';
      } else {
        console.log('No need to flag a cleared tile.');
      }
      console.log();
      console.log('Current Board:');
      console.log();
      this._board.print(this._board.playerBoard);
      console.log();
    }
  }]);

  return Game;
}();