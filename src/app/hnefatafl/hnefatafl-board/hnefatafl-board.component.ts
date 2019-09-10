import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Case } from './../game/Case';
import { Vector } from '../game/Vector';
import { HnefataflEngine } from '../game/HnefataflEngine';

@Component({
  selector: 'app-hnefatafl-board',
  templateUrl: './hnefatafl-board.component.html',
  styleUrls: ['./hnefatafl-board.component.scss']
})
export class HnefataflBoardComponent implements OnInit {

  @Input()
  board: Case[][];

  @Input()
  engine: HnefataflEngine;

  @Output()
  droppedCase = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  showAllowedMoves(event) {
    console.log(this.engine.posibleMoves(event.source.element.nativeElement.getAttribute('id')));
  }

  event(event) {
    const x = event.container.element.nativeElement.getAttribute('case-x');
    const y = event.container.element.nativeElement.getAttribute('case-y');
    const pawnId = event.item.element.nativeElement.getAttribute('id');
    this.droppedCase.emit( { pawnId, caze: new Vector(x, y) } );
  }

}
