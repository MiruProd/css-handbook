import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PseudoClasses } from './pseudo-classes';

describe('PseudoClasses', () => {
  let component: PseudoClasses;
  let fixture: ComponentFixture<PseudoClasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PseudoClasses],
    }).compileComponents();

    fixture = TestBed.createComponent(PseudoClasses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
