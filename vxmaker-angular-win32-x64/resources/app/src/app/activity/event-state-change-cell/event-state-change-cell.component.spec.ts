import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStateChangeCellComponent } from './event-state-change-cell.component';

describe('EventStateChangeCellComponent', () => {
  let component: EventStateChangeCellComponent;
  let fixture: ComponentFixture<EventStateChangeCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStateChangeCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStateChangeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
