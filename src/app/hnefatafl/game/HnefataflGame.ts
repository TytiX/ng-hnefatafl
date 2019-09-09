import { CastExpr } from '@angular/compiler';
import { Case } from './Case';

export class HnefataflGame {

  size: number;
  board: Case[][] = new Array();

  constructor(size) {
    this.size = size;

    for (let i = 0; i < size; i++) {

      this.board.push(new Array());

      for (let j = 0; j < size; j++) {
        if ( (i === 0 && j === 0)
        || (i === size - 1 && j === 0)
        || (i === 0 && j === size - 1)
        || (i === size - 1 && j === size - 1)
        || (i === (size - 1) / 2 && j === (size - 1) / 2) ) {
          this.board[i].push(new Case(i, j, true));
        } else {
          this.board[i].push(new Case(i, j));
        }
      }
    }
  }

  newGame() {
    // restart pawns to start positions
  }

  saveGame() {
    // export pawns postions and current turn
  }

  loadGame() {
    // import pawns positions and current turn
  }

}
