import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStateChangeGraphComponent } from './event-state-change-graph.component';

describe('EventStateChangeGraphComponent', () => {
  let component: EventStateChangeGraphComponent;
  let fixture: ComponentFixture<EventStateChangeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStateChangeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStateChangeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
