import { Pawn } from './Pawn';

export class Case {
  x: number;
  y: number;

  isTower: boolean;
  isCornerTower: boolean;

  pawn: Pawn;

  constructor(x, y, isTower = false, isCornerTower = false) {
    this.x = x;
    this.y = y;
    this.isTower = isTower;
    this.isCornerTower = isCornerTower;
  }
}
