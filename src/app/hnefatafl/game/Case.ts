import { Pawn } from './Pawn';

export class Case {
  id: string;
  x: number;
  y: number;

  isTower: boolean;
  isCornerTower: boolean;

  pawn: Pawn;

  constructor(x, y, isTower = false, isCornerTower = false) {
    this.id = x + '-' + y;
    this.x = x;
    this.y = y;
    this.isTower = isTower;
    this.isCornerTower = isCornerTower;
  }
}
