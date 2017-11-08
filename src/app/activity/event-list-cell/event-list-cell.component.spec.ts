import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListCellComponent } from './event-list-cell.component';

describe('EventListCellComponent', () => {
  let component: EventListCellComponent;
  let fixture: ComponentFixture<EventListCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
