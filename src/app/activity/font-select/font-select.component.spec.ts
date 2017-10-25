import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontSelectComponent } from './font-select.component';

describe('FontSelectComponent', () => {
  let component: FontSelectComponent;
  let fixture: ComponentFixture<FontSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
