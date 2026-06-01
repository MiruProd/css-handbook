import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selectors } from './selectors';

describe('Selectors', () => {
  let component: Selectors;
  let fixture: ComponentFixture<Selectors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Selectors],
    }).compileComponents();

    fixture = TestBed.createComponent(Selectors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
