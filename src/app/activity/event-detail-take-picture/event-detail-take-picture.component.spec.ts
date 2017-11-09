import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailTakePictureComponent } from './event-detail-take-picture.component';

describe('EventDetailTakePictureComponent', () => {
  let component: EventDetailTakePictureComponent;
  let fixture: ComponentFixture<EventDetailTakePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailTakePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailTakePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
