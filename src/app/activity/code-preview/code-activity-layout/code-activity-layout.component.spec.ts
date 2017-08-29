import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeActivityLayoutComponent } from './code-activity-layout.component';

describe('CodeActivityLayoutComponent', () => {
  let component: CodeActivityLayoutComponent;
  let fixture: ComponentFixture<CodeActivityLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeActivityLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeActivityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
