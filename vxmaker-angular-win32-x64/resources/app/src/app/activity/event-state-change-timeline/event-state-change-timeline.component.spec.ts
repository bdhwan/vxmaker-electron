import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStateChangeTimelineComponent } from './event-state-change-timeline.component';

describe('EventStateChangeTimelineComponent', () => {
  let component: EventStateChangeTimelineComponent;
  let fixture: ComponentFixture<EventStateChangeTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStateChangeTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStateChangeTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
