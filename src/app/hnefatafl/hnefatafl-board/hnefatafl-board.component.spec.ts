import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HnefataflBoardComponent } from './hnefatafl-board.component';

describe('HnefataflBoardComponent', () => {
  let component: HnefataflBoardComponent;
  let fixture: ComponentFixture<HnefataflBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HnefataflBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HnefataflBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
