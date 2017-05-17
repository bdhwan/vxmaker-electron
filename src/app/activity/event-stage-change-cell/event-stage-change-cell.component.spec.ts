import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStageChangeCellComponent } from './event-stage-change-cell.component';

describe('EventStageChangeCellComponent', () => {
  let component: EventStageChangeCellComponent;
  let fixture: ComponentFixture<EventStageChangeCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStageChangeCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStageChangeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
