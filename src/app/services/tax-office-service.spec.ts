import { TestBed } from '@angular/core/testing';

import { TaxOfficeService } from './tax-office-service';

describe('TaxOfficeService', () => {
  let service: TaxOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
