import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceItemForm } from './service-item-form';

describe('ServiceItemForm', () => {
  let component: ServiceItemForm;
  let fixture: ComponentFixture<ServiceItemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceItemForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceItemForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
