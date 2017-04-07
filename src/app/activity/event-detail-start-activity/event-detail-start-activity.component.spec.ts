import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailStartActivityComponent } from './event-detail-start-activity.component';

describe('EventDetailStartActivityComponent', () => {
  let component: EventDetailStartActivityComponent;
  let fixture: ComponentFixture<EventDetailStartActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailStartActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailStartActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
