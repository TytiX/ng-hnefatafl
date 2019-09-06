import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HnefataflComponent } from './hnefatafl.component';

describe('HnefataflComponent', () => {
  let component: HnefataflComponent;
  let fixture: ComponentFixture<HnefataflComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HnefataflComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HnefataflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
