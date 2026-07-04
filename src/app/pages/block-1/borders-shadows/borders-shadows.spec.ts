import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BordersShadows } from './borders-shadows';

describe('BordersShadows', () => {
  let component: BordersShadows;
  let fixture: ComponentFixture<BordersShadows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BordersShadows],
    }).compileComponents();

    fixture = TestBed.createComponent(BordersShadows);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
