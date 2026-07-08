import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRowButton } from './view-row-button';

describe('ViewRowButton', () => {
  let component: ViewRowButton;
  let fixture: ComponentFixture<ViewRowButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRowButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRowButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
