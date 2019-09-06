import { CastExpr } from '@angular/compiler';

export class Case {
  x;
  y;
  isTower;

  pawn;

  constructor(x, y) {

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
  columns: number[] = new Array();
  cases: Case[] = new Array();

  constructor(size) {
    this.size = size;
    for (let i = 0; i < size; i++) {
      this.columns.push(i + 1);
      for (let j = 0; j < size; j++) {
        this.cases.push(new Case(i, j));
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