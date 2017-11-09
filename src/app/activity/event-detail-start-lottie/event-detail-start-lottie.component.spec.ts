import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailStartLottieComponent } from './event-detail-start-lottie.component';

describe('EventDetailStartLottieComponent', () => {
  let component: EventDetailStartLottieComponent;
  let fixture: ComponentFixture<EventDetailStartLottieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailStartLottieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailStartLottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
