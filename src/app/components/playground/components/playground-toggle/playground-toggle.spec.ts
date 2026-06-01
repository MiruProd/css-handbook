import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundToggle } from './playground-toggle';

describe('PlaygroundToggle', () => {
  let component: PlaygroundToggle;
  let fixture: ComponentFixture<PlaygroundToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
