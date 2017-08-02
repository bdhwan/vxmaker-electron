import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailStageChangeComponent } from './event-detail-stage-change.component';

describe('EventDetailStageChangeComponent', () => {
  let component: EventDetailStageChangeComponent;
  let fixture: ComponentFixture<EventDetailStageChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailStageChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailStageChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
