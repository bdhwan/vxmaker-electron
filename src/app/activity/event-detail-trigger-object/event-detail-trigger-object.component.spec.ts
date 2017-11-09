import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailTriggerObjectComponent } from './event-detail-trigger-object.component';

describe('EventDetailTriggerObjectComponent', () => {
  let component: EventDetailTriggerObjectComponent;
  let fixture: ComponentFixture<EventDetailTriggerObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailTriggerObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailTriggerObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
