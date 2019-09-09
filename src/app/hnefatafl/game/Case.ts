import { Pawn } from './Pawn';

export class Case {
  x: number;
  y: number;

  isTower: boolean;

  pawn: Pawn;

  constructor(x, y, isTower = false) {
    this.x = x;
    this.y = y;
    this.isTower = isTower;
  }
}
