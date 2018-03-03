///////////////////////
export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(
      numberOfRows,
      numberOfColumns
    );
    this._bombBoard = Board.generateBombBoard(
      numberOfRows,
      numberOfColumns,
      numberOfBombs
    );
  }

  get playerBoard() {
    return this._playerBoard;
  }
  get numberOfBombs() {
    return this._numberOfBombs;
  }
  get numberOfTiles() {
    return this._numberOfTiles;
  }
  get bombBoard() {
    return this._bombBoard;
  }

  ////////////
  flipTile(rowIndex, columnIndex) {
    if (
      rowIndex > this.playerBoard.length - 1 ||
      columnIndex > this.playerBoard[0].length - 1 ||
      rowIndex < 0 ||
      columnIndex < 0
    ) {
      console.log('');
      console.log('guess is outside of the board 2');
    } else if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
      return false;
    } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
      /*else if (this.playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('');
      console.log('This tile has already been flipped!');
      return false;
    } */
      this.playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(
        rowIndex,
        columnIndex
      );
      this._numberOfTiles--;
      //recursive code starts here
      if (this.playerBoard[rowIndex][columnIndex] === 0) {
        const neighborOffsets2 = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1]
        ];
        const numberOfRows = this.bombBoard.length;
        const numberOfColumns = this.bombBoard[0].length;
        neighborOffsets2.forEach(offset => {
          const neighborRowIndex2 = rowIndex + offset[0];
          const neighborColumnIndex2 = columnIndex + offset[1];
          if (
            neighborRowIndex2 >= 0 &&
            neighborRowIndex2 < numberOfRows &&
            neighborColumnIndex2 >= 0 &&
            neighborColumnIndex2 < numberOfColumns
          ) {
            //this.playerBoard[neighborRowIndex2][neighborColumnIndex2] = this.getNumberOfNeighborBombs(neighborRowIndex2, neighborColumnIndex2);
            this.flipTile(neighborRowIndex2, neighborColumnIndex2);
          }
        });
      } //end recursive code
    }
  }

  ////////
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this.bombBoard.length;
    const numberOfColumns = this.bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (
        neighborRowIndex >= 0 &&
        neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 &&
        neighborColumnIndex < numberOfColumns
      ) {
        if (this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });

    return numberOfBombs;
  }

  ////////////////
  hasSafeTiles(numberOfTiles, numberOfBombs) {
    return this.numberOfBombs !== this.numberOfTiles;
  }

  //////////////
  print(board) {
    let printArrayCopy = board.map(a => a.slice());
    let arrayWidth = board[0].length; //5
    let arrayHeight = board.length; //5
    let borderLines = ['   '];
    let headerNumbers = ['  '];
    let borderLinesWidth = (arrayWidth - 1) * 3 + arrayWidth + 2;
    for (let x = 0; x < borderLinesWidth; x++) {
      borderLines.push('_');
    }
    for (let x = 0; x < arrayWidth; x++) {
      headerNumbers.push(x);
    }
    for (let x = 0; x < arrayHeight; x++) {
      printArrayCopy[x].unshift(x + ']');
    }
    console.log(headerNumbers.join(' | '));
    console.log(borderLines.join(''));
    console.log(printArrayCopy.map(row => row.join(' | ')).join('\n'));
    console.log(borderLines.join(''));
    //for (let x=0; x < arrayHeight ; x++)
    //  {
    //  printArrayCopy[x].shift();
    //         }
  }

  /////////////
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let addRow = 0; addRow < numberOfRows; addRow++) {
      let row = [];
      for (let addColumn = 0; addColumn < numberOfColumns; addColumn++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  //////////////////////
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    if (numberOfBombs > numberOfRows * numberOfColumns) {
      console.log('You cant have more bombs than tiles dumbass.');
      return;
    }
    let board = [];
    for (let addRow = 0; addRow < numberOfRows; addRow++) {
      let row = [];
      for (let addColumn = 0; addColumn < numberOfColumns; addColumn++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (!board[randomRowIndex][randomColumnIndex]) {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
