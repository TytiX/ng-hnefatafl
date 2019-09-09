import { Component, OnInit } from '@angular/core';

import { HnefataflGame } from './game/HnefataflGame';

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

  dropped(event) {
    console.log(event);
  }
  entered(event) {
    console.log(event);
  }

  event(event) {
    console.log(event);
  }
}
