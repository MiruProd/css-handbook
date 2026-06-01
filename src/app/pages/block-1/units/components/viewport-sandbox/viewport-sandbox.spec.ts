import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewportSandbox } from './viewport-sandbox';

describe('ViewportSandbox', () => {
  let component: ViewportSandbox;
  let fixture: ComponentFixture<ViewportSandbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewportSandbox],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewportSandbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
