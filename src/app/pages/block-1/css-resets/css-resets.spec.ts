import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssResets } from './css-resets';

describe('CssResets', () => {
  let component: CssResets;
  let fixture: ComponentFixture<CssResets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssResets],
    }).compileComponents();

    fixture = TestBed.createComponent(CssResets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
