class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    this._numberOfColumns = numberOfColumns;
    this._numberOfRows = numberOfRows;
  }

  playMove(rowIndex, columnIndex)
  {
   if (rowIndex > this._numberOfRows-1 || columnIndex > this._numberOfColumns-1 || rowIndex < 0 || columnIndex < 0)
   {
     console.log('');
     console.log('guess is outside of the board 1');
   }
   else{
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B')
    {
      console.log();
      console.log('You hit a bomb! Game Over Man!');
      console.log();
      this._board.print(this._board.playerBoard);
      console.log();
      console.log('Here are all the bombs:');
      console.log();
      this._board.print(this._board.bombBoard);
      console.log();
    }
    else if (!this._board.hasSafeTiles())
    {//false there no more safe tiles
      console.log();
      console.log('No more Bombs. You WON DUDE!');
      console.log();
      this._board.print(this._board.playerBoard);
      console.log();
    }
    else
    {//true, there are still safe tiles. keep going
      console.log();
      console.log('Current Board:');
      console.log();
      this._board.print(this._board.playerBoard);
      console.log();
    }
  }
}
}


///////////////////////
class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){return this._playerBoard}
  get numberOfBombs(){return this._numberOfBombs}
  get numberOfTiles(){return this._numberOfTiles}
  get bombBoard(){return this._bombBoard}

////////////
  flipTile(rowIndex, columnIndex){
    if (rowIndex > this.playerBoard.length-1 || columnIndex > this.playerBoard[0].length-1 || rowIndex < 0 || columnIndex < 0){
      console.log('');
      console.log('guess is outside of the board 2');
    }
    else if (this.playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('');
      console.log('This tile has already been flipped!');
      return false;
    }
    else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      this._numberOfTiles--;
    }

  }

////////
  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      const numberOfRows = this.bombBoard.length;
      const numberOfColumns = this.bombBoard[0].length;
      let numberOfBombs = 0;

      neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
          if(this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numberOfBombs++;
          }
        }
      })
      return numberOfBombs;
  }

////////////////
  hasSafeTiles(numberOfTiles, numberOfBombs){
    return this.numberOfBombs !== this.numberOfTiles
  }


//////////////
  print(board){
    console.log(board.map(row => row.join(' | ')).join('\n'))
  }



/////////////
  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    for (let addRow = 0; addRow < numberOfRows; addRow++){
      let row = [];
      for (let addColumn = 0 ; addColumn < numberOfColumns; addColumn++){
              row.push(' ');
      }
      board.push(row);
    }
    return board;
  }


  //////////////////////
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let board = [];
    for (let addRow = 0; addRow < numberOfRows; addRow++){
      let row = [];
      for (let addColumn = 0 ; addColumn < numberOfColumns; addColumn++){
              row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs){
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (!board[randomRowIndex][randomColumnIndex]){
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }


}




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
const g = new Game(3,3,2);
g.playMove(2,2);
g.playMove(0,2);
