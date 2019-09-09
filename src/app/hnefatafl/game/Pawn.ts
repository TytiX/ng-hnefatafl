
export class Pawn {
  id: string;

  isAttacker: boolean;
  isDefender: boolean;
  isKing: boolean;

  constructor(isAttacker, isKing = false) {
    this.isAttacker = isAttacker;
    this.isDefender = !isAttacker;
    this.isKing = isKing;
  }
}
