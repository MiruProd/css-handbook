import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserMockup } from './browser-mockup';

describe('BrowserMockup', () => {
  let component: BrowserMockup;
  let fixture: ComponentFixture<BrowserMockup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserMockup],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowserMockup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
