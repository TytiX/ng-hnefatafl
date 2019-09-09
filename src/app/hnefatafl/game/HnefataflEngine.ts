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

const ATTACKERS = 'Attackers';
const DEFENDERS = 'Defenders';

export class HnefataflEngine {

  board: Case[][];
  pawns: Pawn[];
  turn: number;
  player: any;

  constructor(board) {
    this.board = board;
    this.pawns = new Array();
  }

  reinit() {
    let lastId = 0;
    for (const [x, line] of this.board.entries()) {
      for (const [y, caze] of line.entries()) {
        if (INITIAL_POSITION[x][y] === 1) {
          caze.pawn = new Pawn(lastId, x, y, true);
          this.pawns.push(caze.pawn);
          lastId++;
        } else if (INITIAL_POSITION[x][y] === 2) {
          caze.pawn = new Pawn(lastId, x, y, false);
          this.pawns.push(caze.pawn);
          lastId++;
        } else if (INITIAL_POSITION[x][y] === 3) {
          caze.pawn = new Pawn(lastId, x, y, false, true);
          this.pawns.push(caze.pawn);
          lastId++;
        }
      }
    }

    this.turn = 0;
    this.player = ATTACKERS;

    // console.log(this.board);
    // console.log(this.move(0, {x: 0, y: -1}));
    // console.log(this.board);
  }

  /**
   * Output the possible cases for a move for the current pawn.
   * @param pawnId the pawn ID
   */
  posibleMoves(pawnId) {
    const pawn = this.pawns[pawnId];
    const cases: Case[] = new Array();
    // find accesible cases on x+
    for (let x1 = pawn.x + 1; x1 < this.board.length; x1++) {
      if ( this.board[x1][pawn.y].pawn || (this.board[x1][pawn.y].isTower && pawn.isAttacker) ) {
        break;
      } else {
        cases.push(this.board[x1][pawn.y]);
      }
    }
    // find accesible cases on x-
    for (let x2 = pawn.x - 1; x2 >= 0; x2--) {
      if ( this.board[x2][pawn.y].pawn || (this.board[x2][pawn.y].isTower && pawn.isAttacker) ) {
        break;
      } else {
        cases.push(this.board[x2][pawn.y]);
      }
    }
    // find accesible cases on y+
    for (let y1 = pawn.y + 1; y1 < this.board.length; y1++) {
      if ( this.board[pawn.x][y1].pawn || (this.board[pawn.x][y1].isTower && pawn.isAttacker) ) {
        break;
      } else {
        cases.push(this.board[pawn.x][y1]);
      }
    }
    // find accesible cases on y-
    for (let y2 = pawn.y - 1; y2 >= 0; y2--) {
      if ( this.board[pawn.x][y2].pawn || (this.board[pawn.x][y2].isTower && pawn.isAttacker) ) {
        break;
      } else {
        cases.push(this.board[pawn.x][y2]);
      }
    }
    return cases;
  }

  move(pawnId, vector) {
    const pawn = Object.assign({}, this.pawns[pawnId]);

    console.log(pawn);
    console.log(this.verifyTurn(pawn));
    console.log(this.moveIsPossible(pawn, vector));

    if (!pawn || !this.verifyTurn(pawn) || !this.moveIsPossible(pawn, vector)) {
      return false;
    }

    this.board[pawn.x][pawn.y].pawn = null;

    pawn.x = pawn.x + vector.x;
    pawn.y = pawn.y + vector.y;

    this.board[pawn.x][pawn.y].pawn = pawn;

    this.applyCaptures(pawn);

    this.changeTurn();
    return true;
  }

  applyCaptures(pawn: Pawn) {
    throw new Error("Method not implemented.");
  }

  moveIsPossible(pawn: Pawn, vector: any): boolean {
    return true;
  }

  private verifyTurn(pawn: Pawn): boolean {
    if (this.player === ATTACKERS && pawn.isAttacker) {
      return true;
    } else if (this.player === DEFENDERS && pawn.isDefender) {
      return true;
    } else {
      return false;
    }
  }

  private changeTurn() {
    if (this.player === ATTACKERS) {
      this.player = DEFENDERS;
    } else {
      this.player = ATTACKERS;
    }
    this.turn++;
  }

}
