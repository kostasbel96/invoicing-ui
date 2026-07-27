import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerInsert } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';
import { Region } from '../../../models/region.model';
import { RegionService } from '../../../services/region-service';
import { TaxOffice } from '../../../models/taxOffice.model';
import { TaxOfficeService } from '../../../services/tax-office-service';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm implements OnInit {
  regions: Region[] = [];
  taxOffices: TaxOffice[] = [];
  loadingRegions = signal(true);
  loadingTaxOffices = signal(false);
  customerForm: FormGroup;
  customerToSubmit: CustomerInsert = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    vat: '',
    regionId: 1,
    address: '',
    postalCode: '',
    companyName: '',
    taxOfficeId: 1,
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly regionService: RegionService,
    private readonly taxOfficeService: TaxOfficeService
  ) {
    this.customerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      address: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      vat: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      companyName: '',
      regionId: [1, [Validators.required]],
      taxOfficeId: [1, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.regionService.getRegions().subscribe((regions) => {
      this.regions = regions.slice().sort((a, b) => a.name.localeCompare(b.name));
      this.loadingRegions.set(false);
    });
    this.taxOfficeService.getTaxOffices().subscribe((taxOffices) => {
      this.taxOffices = taxOffices.slice().sort((a, b) => a.name.localeCompare(b.name));
      this.loadingTaxOffices.set(false);
    })
  }

  onSubmit() {
    if (this.customerForm.invalid) return;
    this.customerToSubmit = {
      ...this.customerForm.value,
      regionId: Number(this.customerForm.value.regionId),
      taxOfficeId: Number(this.customerForm.value.taxOfficeId),
    };
    this.customerService.addCustomer(this.customerToSubmit).subscribe({
      next: (response) => {
        console.log('Customer added successfully:', response);
        this.onReset();
      },
      error: (error) => {
        console.error('Error adding customer:', error);
      },
    });
  }

  onReset() {
    this.customerForm.reset({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      vat: '',
      companyName: '',
      regionId: 1,
      taxOfficeId: 1,
    });
  }
}
