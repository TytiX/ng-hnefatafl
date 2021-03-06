import { Case } from './Case';
import { Pawn } from './Pawn';
import { Vector } from './Vector';
import { INITIAL_POSITION, DEFENDER_PAWN_ID_START, ATTACKER_PAWN_ID_START } from './Constants';

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

  load(positions: number[][], turn = 0, isAttackerTurn = true) {
    let lastDefenderId = DEFENDER_PAWN_ID_START;
    let lastAttackerId = ATTACKER_PAWN_ID_START;
    this.pawns.length = 0;
    for (const [x, line] of this.board.entries()) {
      for (const [y, caze] of line.entries()) {
        if (positions[x][y] === 1) { // ATTACKER
          caze.pawn = new Pawn(lastAttackerId, x, y, true);
          this.pawns.push(caze.pawn);
          lastAttackerId++;
        } else if (positions[x][y] === 2) { // DEFENDER
          caze.pawn = new Pawn(lastDefenderId, x, y, false);
          this.pawns.push(caze.pawn);
          lastDefenderId++;
        } else if (positions[x][y] === 3) { // KING
          caze.pawn = new Pawn(lastDefenderId, x, y, false, true);
          this.pawns.push(caze.pawn);
          lastDefenderId++;
        }
      }
    }
    this.turn = turn;
    this.player = isAttackerTurn ? ATTACKERS : DEFENDERS;
    console.log(this.pawns);
  }

  pawnById(pawnId: number): Pawn {
    let find = null;
    for ( const pawn of this.pawns ) {
      if (pawn.id === Number(pawnId)) {
        find = pawn;
        return find;
      }
    }
    return find;
  }

  setPawnById(pawnId: number, attrPawn: Pawn) {
    for ( const [index, pawn] of this.pawns.entries() ) {
      if (pawn.id === Number(pawnId)) {
        this.pawns[index] = attrPawn;
        return;
      }
    }
  }

  /**
   * Output the possible cases for a move for the current pawn.
   * @param pawnId the pawn ID
   */
  posibleMoves(pawnId): Case[] {
    const pawn = this.pawnById(pawnId);
    const cases: Case[] = new Array();

    console.log('movable pawn', pawn);

    if ( (this.player === ATTACKERS && pawn.isDefender)
      || (this.player === DEFENDERS && pawn.isAttacker) ) {
      return cases;
    }
    // find accesible cases on x+
    for (let x1 = pawn.x + 1; x1 < this.board.length; x1++) {
      if ( this.board[x1][pawn.y].pawn ) {
        break;
      } else if ( this.board[x1][pawn.y].isTower && !pawn.isKing ) {
        // skip
      } else {
        cases.push(this.board[x1][pawn.y]);
      }
    }
    // find accesible cases on x-
    for (let x2 = pawn.x - 1; x2 >= 0; x2--) {
      if ( this.board[x2][pawn.y].pawn ) {
        break;
      } else if ( this.board[x2][pawn.y].isTower && !pawn.isKing ) {
        // skip
      } else {
        cases.push(this.board[x2][pawn.y]);
      }
    }
    // find accesible cases on y+
    for (let y1 = pawn.y + 1; y1 < this.board.length; y1++) {
      if ( this.board[pawn.x][y1].pawn ) {
        break;
      } else if ( this.board[pawn.x][y1].isTower && !pawn.isKing ) {
        // skip
      } else {
        cases.push(this.board[pawn.x][y1]);
      }
    }
    // find accesible cases on y-
    for (let y2 = pawn.y - 1; y2 >= 0; y2--) {
      if ( this.board[pawn.x][y2].pawn ) {
        break;
      } else if ( this.board[pawn.x][y2].isTower && !pawn.isKing ) {
        // skip
      } else {
        cases.push(this.board[pawn.x][y2]);
      }
    }
    return cases;
  }

  toMoveVector(pawnId: number, caze: Vector): Vector {
    const pawn = this.pawnById(pawnId);
    return new Vector(caze.x - pawn.x, caze.y - pawn.y);
  }

  move(pawnId: number, vector: Vector): boolean {
    const pawn = Object.assign({}, this.pawnById(pawnId));

    if (!pawn || !this.verifyTurn(pawn) || !this.moveIsPossible(pawn, vector)) {
      console.log('not allowed');
      return false;
    }

    this.board[pawn.x][pawn.y].pawn = undefined;

    pawn.x = pawn.x + vector.x;
    pawn.y = pawn.y + vector.y;

    this.board[pawn.x][pawn.y].pawn = pawn;
    this.setPawnById(pawnId, pawn);

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

  applyPawnsCaptures(pawn: Pawn): boolean {
    // capture pawns
    let captured = false;
    // x+
    if ( this.isOponentPawn(pawn, pawn.x + 1, pawn.y)
        && this.isOponentCaptured(pawn, pawn.x + 2, pawn.y) ) {
        const capturePawn = this.board[pawn.x + 1][pawn.y].pawn;
        this.setPawnById(capturePawn.id, null);
        this.board[pawn.x + 1][pawn.y].pawn = null;
        captured = true;
    }
    // x-
    if ( this.isOponentPawn(pawn, pawn.x - 1, pawn.y)
        && this.isOponentCaptured(pawn, pawn.x - 2, pawn.y) ) {
        const capturePawn = this.board[pawn.x - 1][pawn.y].pawn;
        this.setPawnById(capturePawn.id, pawn);
        this.board[pawn.x - 1][pawn.y].pawn = null;
        captured = true;
    }
    // y+
    if ( this.isOponentPawn(pawn, pawn.x, pawn.y + 1)
        && this.isOponentCaptured(pawn, pawn.x, pawn.y + 2) ) {
        const capturePawn = this.board[pawn.x][pawn.y + 1].pawn;
        this.setPawnById(capturePawn.id, pawn);
        this.board[pawn.x][pawn.y + 1].pawn = null;
        captured = true;
    }
    // y-
    if ( this.isOponentPawn(pawn, pawn.x, pawn.y - 1)
        && this.isOponentCaptured(pawn, pawn.x, pawn.y - 2) ) {
        const capturePawn = this.board[pawn.x][pawn.y - 1].pawn;
        this.setPawnById(capturePawn.id, pawn);
        this.board[pawn.x][pawn.y - 1].pawn = null;
        captured = true;
    }
    return captured;
  }

  private isOponentPawn(pawn: Pawn, x: number, y: number, king = false): boolean {
    return this.board[x]
    && this.board[x][y]
    && this.board[x][y].pawn
    && this.board[x][y].pawn.isAttacker !== pawn.isAttacker
    && this.board[x][y].pawn.isKing === king;
  }

  private isOponentCaptured(pawn: Pawn, x: number, y: number): boolean {
    // if x+2 is
    // a pawn
    // a tower
    // pawn on x+1 is taken
    return this.board[x]
      && this.board[x][y]
      && ( this.board[x][y].isTower // tower
      || (this.board[x][y].pawn && this.board[x][y].pawn.isAttacker === pawn.isAttacker) ); // is same pawn
  }

  applyKingCapture(pawn: Pawn) {
    if (this.simpleKingCapture(pawn) || this.complicatedKingCapture(pawn)) {
      this.triggerVictory(ATTACKERS);
    }
  }

  private simpleKingCapture(pawn: Pawn): boolean {
    let captured = false;
    if ( this.isOponentPawn(pawn, pawn.x + 1, pawn.y, true)
        && this.isOponentKingCaptured(pawn.x + 1, pawn.y) ) {
      captured = true;
    }
    // x-
    if ( this.isOponentPawn(pawn, pawn.x - 1, pawn.y, true)
        && this.isOponentKingCaptured(pawn.x - 1, pawn.y) ) {
      captured = true;
    }
    // y+
    if ( this.isOponentPawn(pawn, pawn.x, pawn.y + 1, true)
        && this.isOponentKingCaptured(pawn.x, pawn.y + 1) ) {
      captured = true;
    }
    // y-
    if ( this.isOponentPawn(pawn, pawn.x, pawn.y - 1, true)
        && this.isOponentKingCaptured(pawn.x, pawn.y - 1) ) {
      captured = true;
    }
    return captured;
  }
  private isOponentKingCaptured(x: number, y: number): boolean {
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
    if ( this.board[x][y].pawn.isKing
      && this.boardCaseIsWallTowerOrAttaker(x + 1, y)
      && this.boardCaseIsWallTowerOrAttaker(x - 1, y)
      && this.boardCaseIsWallTowerOrAttaker(x, y + 1)
      && this.boardCaseIsWallTowerOrAttaker(x, y - 1) ) {
        return true;
    }
    return false;
  }

  private complicatedKingCapture(pawn: Pawn): boolean {
    // this is complicated
    // with a group
    // 0 0 1 1 0
    // 0 1 3 2 1
    // 0 0 1 1 0
    return false;
  }

  private boardCaseIsWallTowerOrAttaker(x: number, y: number) {
    return this.board[x] === undefined // wall x
    || this.board[x][y] === undefined // wall y
    || this.board[x][y].isTower // tower
    || (this.board[x][y].pawn && this.board[x][y].pawn.isAttacker);
  }

  triggerVictory(victory: string) {
    throw new Error('Victory for : ' + victory);
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
