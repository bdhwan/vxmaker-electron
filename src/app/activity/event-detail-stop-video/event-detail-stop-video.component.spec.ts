import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailStopVideoComponent } from './event-detail-stop-video.component';

describe('EventDetailStopVideoComponent', () => {
  let component: EventDetailStopVideoComponent;
  let fixture: ComponentFixture<EventDetailStopVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailStopVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailStopVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
