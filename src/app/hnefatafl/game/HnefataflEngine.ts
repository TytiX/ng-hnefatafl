import { Case } from './Case';
import { Pawn } from './Pawn';

// 1 : attacker pawn
// 2 : defencer pawn
// 3 : king
const INITIAL_POSITION = [
[0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
[1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1],
[1, 1, 0, 2, 2, 3, 2, 2, 0, 1, 1],
[1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0]];

export class HnefataflEngine {

  board: Case[][];

  constructor(board) {
    this.board = board;
  }

  reinit() {
    let lastId = 1;
    for (const [x, line] of this.board.entries()) {
      for (const [y, caze] of line.entries()) {
        if (INITIAL_POSITION[x][y] === 1) {
          caze.pawn = new Pawn(lastId, true);
          lastId++;
        } else if (INITIAL_POSITION[x][y] === 2) {
          caze.pawn = new Pawn(lastId, false);
          lastId++;
        } else if (INITIAL_POSITION[x][y] === 3) {
          caze.pawn = new Pawn(lastId, false, true);
          lastId++;
        }
      }
    }
    console.log(this.board);
  }

  posibleMoves(pawnId) {
    const cases: Case[] = new Array();
    return cases;
  }

  move(pawnId, vector) {

    return true;

    return false;
  }

}
