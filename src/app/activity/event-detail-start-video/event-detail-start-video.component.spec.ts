import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailStartVideoComponent } from './event-detail-start-video.component';

describe('EventDetailStartVideoComponent', () => {
  let component: EventDetailStartVideoComponent;
  let fixture: ComponentFixture<EventDetailStartVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailStartVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailStartVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
