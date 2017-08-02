import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewObjectComponent } from './preview-object.component';

describe('PreviewObjectComponent', () => {
  let component: PreviewObjectComponent;
  let fixture: ComponentFixture<PreviewObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
