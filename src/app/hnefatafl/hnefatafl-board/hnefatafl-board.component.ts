import { Component, OnInit, Input } from '@angular/core';

import { Case } from './../game/Case';

@Component({
  selector: 'app-hnefatafl-board',
  templateUrl: './hnefatafl-board.component.html',
  styleUrls: ['./hnefatafl-board.component.scss']
})
export class HnefataflBoardComponent implements OnInit {

  @Input()
  board: Case[][];

  constructor() { }

  ngOnInit() {
  }

}
