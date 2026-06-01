import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmRemSandbox } from './em-rem-sandbox';

describe('EmRemSandbox', () => {
  let component: EmRemSandbox;
  let fixture: ComponentFixture<EmRemSandbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmRemSandbox],
    }).compileComponents();

    fixture = TestBed.createComponent(EmRemSandbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
