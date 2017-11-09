import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailStopLottieComponent } from './event-detail-stop-lottie.component';

describe('EventDetailStopLottieComponent', () => {
  let component: EventDetailStopLottieComponent;
  let fixture: ComponentFixture<EventDetailStopLottieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailStopLottieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailStopLottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
