
export class Pawn {
  id: string;

  isAttacker: boolean;
  isDefender: boolean;
  isKing: boolean;

  constructor(id, isAttacker, isKing = false) {
    this.id = id;
    this.isAttacker = isAttacker;
    this.isDefender = !isAttacker;
    this.isKing = isKing;
  }
}
