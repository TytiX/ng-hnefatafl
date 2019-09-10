import { Case } from './Case';
import { HnefataflEngine } from './HnefataflEngine';
import { INITIAL_POSITION } from './Constants';
import { Vector } from './Vector';

export class HnefataflGame {

  size: number;
  board: Case[][] = new Array();

  engine: HnefataflEngine;

  constructor(size) {
    this.size = size;

    this.cleanBoard();

    this.engine = new HnefataflEngine(this.board);
    this.engine.reinit();
  }

  move(pawnId: number, caze: Vector) {
    const moveVector = this.engine.toMoveVector(pawnId, caze);
    this.engine.move(pawnId, moveVector);
  }

  private cleanBoard() {
    this.board.length = 0;

    for (let i = 0; i < this.size; i++) {

      this.board.push(new Array());

      for (let j = 0; j < this.size; j++) {
        if ( (i === 0 && j === 0)
        || (i === this.size - 1 && j === 0)
        || (i === 0 && j === this.size - 1)
        || (i === this.size - 1 && j === this.size - 1) ) {
          this.board[i].push(new Case(i, j, true, true));
        } else if ( (i === (this.size - 1) / 2 && j === (this.size - 1) / 2) ) {
          this.board[i].push(new Case(i, j, true));
        } else {
          this.board[i].push(new Case(i, j));
        }
      }
    }

  }

  newGame() {
    // restart pawns to start positions
    this.cleanBoard();
    this.engine.load(INITIAL_POSITION);
  }

  saveGame() {
    // export pawns postions and current turn
  }

  loadGame(positions: number[][]) {
    // import pawns positions and current turn
    this.cleanBoard();
    this.engine.load(positions);
  }

}
