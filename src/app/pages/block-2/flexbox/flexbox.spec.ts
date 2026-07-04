import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Flexbox } from './flexbox';

describe('Flexbox', () => {
  let component: Flexbox;
  let fixture: ComponentFixture<Flexbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flexbox],
    }).compileComponents();

    fixture = TestBed.createComponent(Flexbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
