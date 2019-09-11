
export class Pawn {
  id: number;
  x: number;
  y: number;

  isAttacker: boolean;
  isDefender: boolean;
  isKing: boolean;

  constructor(id, x, y, isAttacker, isKing = false) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.isAttacker = isAttacker;
    this.isDefender = !isAttacker;
    this.isKing = isKing;
  }
}
