import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsItemUi } from './details-item-ui';

describe('DetailsItemUi', () => {
  let component: DetailsItemUi;
  let fixture: ComponentFixture<DetailsItemUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsItemUi],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsItemUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
