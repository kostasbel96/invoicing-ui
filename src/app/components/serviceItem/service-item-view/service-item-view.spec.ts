import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceItemView } from './service-item-view';

describe('ServiceItemView', () => {
  let component: ServiceItemView;
  let fixture: ComponentFixture<ServiceItemView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceItemView],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceItemView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
