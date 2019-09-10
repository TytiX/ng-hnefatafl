import { Component, OnInit } from '@angular/core';

import { HnefataflGame } from './game/HnefataflGame';

import { PAWN_CAPTURE_1,
  PAWN_CAPTURE_2,
  PAWN_CAPTURE_3,
  KING_CAPTURE_1,
  KING_CAPTURE_5,
  KING_CAPTURE_4,
  KING_CAPTURE_3,
  KING_CAPTURE_2 } from './game/sample/sample';

@Component({
  selector: 'app-hnefatafl',
  templateUrl: './hnefatafl.component.html',
  styleUrls: ['./hnefatafl.component.scss']
})
export class HnefataflComponent implements OnInit {

  game: HnefataflGame;

  constructor() {
    this.game = new HnefataflGame(11);
  }

  ngOnInit() {
  }

  droppedGame(event) {
    console.log(event);
    this.game.move(event.pawnId, event.caze);
  }

  loadGame(game: number) {
    switch (game) {
      case 0:
        this.game.newGame();
        break;
      case 1:
        this.game.loadGame(PAWN_CAPTURE_1);
        break;
      case 2:
        this.game.loadGame(PAWN_CAPTURE_2);
        break;
      case 3:
        this.game.loadGame(PAWN_CAPTURE_3);
        break;
      case 4:
        this.game.loadGame(KING_CAPTURE_1);
        break;
      case 5:
        this.game.loadGame(KING_CAPTURE_2);
        break;
      case 6:
        this.game.loadGame(KING_CAPTURE_3);
        break;
      case 7:
        this.game.loadGame(KING_CAPTURE_4);
        break;
      case 8:
        this.game.loadGame(KING_CAPTURE_5);
        break;
    }
  }
}
