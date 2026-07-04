import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PseudoElements } from './pseudo-elements';

describe('PseudoElements', () => {
  let component: PseudoElements;
  let fixture: ComponentFixture<PseudoElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PseudoElements],
    }).compileComponents();

    fixture = TestBed.createComponent(PseudoElements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
