import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowProxyComponent } from './window-proxy.component';

describe('WindowProxyComponent', () => {
  let component: WindowProxyComponent;
  let fixture: ComponentFixture<WindowProxyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowProxyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
