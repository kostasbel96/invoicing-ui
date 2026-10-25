import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceItemTable } from './service-item-table';

describe('ServiceItemTable', () => {
  let component: ServiceItemTable;
  let fixture: ComponentFixture<ServiceItemTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceItemTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceItemTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
