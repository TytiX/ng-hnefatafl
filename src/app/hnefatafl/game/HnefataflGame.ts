import { CastExpr } from '@angular/compiler';

export class Case {
  x;
  y;
  isTower;

  pawn;

  constructor(x, y, isTower = false) {
    this.x = x;
    this.y = y;
    this.isTower = isTower;
  }
}

export class Pawn {
  isAttacker;
  isDefender;
  isKing;

  constructor(isAttacker, isKing = false) {
    this.isAttacker = isAttacker;
    this.isDefender = !isAttacker;
    this.isKing = isKing;
  }
}

export class HnefataflGame {

  size: number;
  cases: Case[][] = new Array();

  constructor(size) {
    this.size = size;

    for (let i = 0; i < size; i++) {

      this.cases.push(new Array());

      for (let j = 0; j < size; j++) {
        if ( (i === 0 && j === 0)
        || (i === size - 1 && j === 0)
        || (i === 0 && j === size - 1)
        || (i === size - 1 && j === size - 1)
        || (i === (size - 1) / 2 && j === (size - 1) / 2) ) {
          this.cases[i].push(new Case(i, j, true));
        } else {
          this.cases[i].push(new Case(i, j));
        }
      }
    }
    console.log(this.cases);
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