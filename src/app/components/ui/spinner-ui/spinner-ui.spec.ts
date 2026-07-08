import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerUi } from './spinner-ui';

describe('SpinnerUi', () => {
  let component: SpinnerUi;
  let fixture: ComponentFixture<SpinnerUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerUi],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
