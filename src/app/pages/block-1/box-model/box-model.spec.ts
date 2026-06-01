import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxModel } from './box-model';

describe('BoxModel', () => {
  let component: BoxModel;
  let fixture: ComponentFixture<BoxModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxModel],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
