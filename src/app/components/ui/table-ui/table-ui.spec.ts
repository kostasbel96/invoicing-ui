import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUi } from './table-ui';

describe('TableUi', () => {
  let component: TableUi;
  let fixture: ComponentFixture<TableUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableUi],
    }).compileComponents();

    fixture = TestBed.createComponent(TableUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
