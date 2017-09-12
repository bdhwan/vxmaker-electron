import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieAnimationViewComponent } from './lottie-animation-view.component';

describe('LottieAnimationViewComponent', () => {
  let component: LottieAnimationViewComponent;
  let fixture: ComponentFixture<LottieAnimationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LottieAnimationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottieAnimationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
