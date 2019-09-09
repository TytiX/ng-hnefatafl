import { Case } from './Case';
import { Pawn } from './Pawn';
import { Vector } from './Vector';
import { INITIAL_POSITION } from './Constants';

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
    this.load(INITIAL_POSITION);

    this.turn = 0;
    this.player = ATTACKERS;
  }

  load(positions: number[][]) {
    let lastId = 0;
    for (const [x, line] of this.board.entries()) {
      for (const [y, caze] of line.entries()) {
        if (positions[x][y] === 1) {
          caze.pawn = new Pawn(lastId, x, y, true);
          this.pawns.push(caze.pawn);
          lastId++;
        } else if (positions[x][y] === 2) {
          caze.pawn = new Pawn(lastId, x, y, false);
          this.pawns.push(caze.pawn);
          lastId++;
        } else if (positions[x][y] === 3) {
          caze.pawn = new Pawn(lastId, x, y, false, true);
          this.pawns.push(caze.pawn);
          lastId++;
        }
      }
    }
  }

  /**
   * Output the possible cases for a move for the current pawn.
   * @param pawnId the pawn ID
   */
  posibleMoves(pawnId): Case[] {
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

  move(pawnId: number, vector: Vector): boolean {
    const pawn = Object.assign({}, this.pawns[pawnId]);

    if (!pawn || !this.verifyTurn(pawn) || !this.moveIsPossible(pawn, vector)) {
      return false;
    }

    this.board[pawn.x][pawn.y].pawn = null;

    pawn.x = pawn.x + vector.x;
    pawn.y = pawn.y + vector.y;

    this.board[pawn.x][pawn.y].pawn = pawn;

    this.applyCaptures(pawn);

    this.checkDefenderVictory(pawn);

    this.changeTurn();
    return true;
  }

  private checkDefenderVictory(pawn: Pawn) {
    if (pawn.isKing && this.board[pawn.x][pawn.y].isCornerTower) {
      this.triggerVictory(DEFENDERS);
      return true;
    } else {
      return false;
    }
  }

  private applyCaptures(pawn: Pawn) {
    this.applyPawnsCaptures(pawn);
    this.applyKingCapture(pawn);
  }

  applyPawnsCaptures(pawn: Pawn) {
    // capture pawns
    // 0 0 1 2 1 0 horizontal...
    // agains the wall
    // 0 0 0 0 1 2
    // agains a fort
    // 0 0 0 1 2 X
  }

  applyKingCapture(pawn: Pawn) {
    let kingCaptured = false;
    // capture king
    // 0 0 1 0 0
    // 0 1 3 1 0
    // 0 0 1 0 0
    // agains a wall
    // 0 0 1
    // 0 1 3
    // 0 0 1
    // agains a fort
    // 0 0 X 0 0
    // 0 1 3 1 0
    // 0 0 1 0 0
    // agains a fort and wall
    // 0 0 X
    // 0 1 3
    // 0 0 1
    // with a group
    // 0 0 1 1 0
    // 0 1 3 2 1
    // 0 0 1 1 0
    if (kingCaptured) {
      this.triggerVictory(ATTACKERS);
    }
  }

  triggerVictory(victory: string) {
    throw new Error('Method not implemented.');
  }

  private moveIsPossible(pawn: Pawn, vector: Vector): boolean {
    if ( this.posibleMoves(pawn.id).indexOf(this.board[pawn.x + vector.x][pawn.y + vector.y]) > -1 ) {
      return true;
    }
    return false;
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
