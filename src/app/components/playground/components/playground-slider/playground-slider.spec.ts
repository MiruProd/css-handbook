import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundSlider } from './playground-slider';

describe('PlaygroundSlider', () => {
  let component: PlaygroundSlider;
  let fixture: ComponentFixture<PlaygroundSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
