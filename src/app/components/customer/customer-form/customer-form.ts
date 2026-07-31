import { Component, Input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Customer, CustomerInsert } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';
import { Region } from '../../../models/region.model';
import { RegionService } from '../../../services/region-service';
import { TaxOffice } from '../../../models/taxOffice.model';
import { TaxOfficeService } from '../../../services/tax-office-service';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ERROR_MESSAGES } from '../../../core/constants/error-messages';
import { SaveButton } from '../../ui/action-buttons-ui/save-button/save-button';
import { submit } from '@angular/forms/signals';
import { ResetButton } from '../../ui/action-buttons-ui/reset-button/reset-button';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, Select, SaveButton, ResetButton],
  standalone: true,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm implements OnInit {
  @Input() customer?: Customer;
  @Input() mode: string = 'create';
  closed = output<void>();
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
    private readonly taxOfficeService: TaxOfficeService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.regionService.getRegions().subscribe((regions) => {
      this.regions = regions.slice().sort((a, b) => a.name.localeCompare(b.name));
      this.loadingRegions.set(false);
    });
    this.taxOfficeService.getTaxOffices().subscribe((taxOffices) => {
      this.taxOffices = taxOffices.slice().sort((a, b) => a.name.localeCompare(b.name));
      this.loadingTaxOffices.set(false);
    });
    this.customerForm = this.formBuilder.group({
      firstname: [
        this.customer?.firstname,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      lastname: [
        this.customer?.lastname,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      ],
      email: [this.customer?.email, [Validators.email, Validators.required]],
      phone: [this.customer?.phone, [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      address: [this.customer?.address, [Validators.required]],
      postalCode: [this.customer?.postalCode, [Validators.required, Validators.pattern(/^\d{5}$/)]],
      vat: [this.customer?.vat, [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      companyName: this.customer?.companyName,
      regionId: [this.customer?.region.id, [Validators.required]],
      taxOfficeId: [this.customer?.taxOffice.id, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.customerForm.invalid) return;
    this.customerToSubmit = {
      ...this.customerForm.value,
      regionId: Number(this.customerForm.value.regionId),
      taxOfficeId: Number(this.customerForm.value.taxOfficeId),
    };

    switch (this.mode) {
      case 'create':
        this.customerService.addCustomer(this.customerToSubmit).subscribe({
          next: (customer) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Επιτυχία',
              detail: `Ο πελάτης ${customer.firstname} ${customer.lastname} αποθηκεύτηκε επιτυχώς`,
            });
            this.onReset();
          },
          error: (error) => {
            console.error('Error adding customer:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Σφάλμα',
              detail: ERROR_MESSAGES[error.error.code],
            });
          },
        });
        break;

      case 'update':
        this.customerService.updateCustomer(this.customer.uuid, this.customerToSubmit).subscribe({
          next: (customer) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Επιτυχία',
              detail: `Ο πελάτης ${customer.firstname} ${customer.lastname} αποθηκεύτηκε επιτυχώς`,
            });
            this.closed.emit();
          },
          error: (error) => {
            console.error('Error adding customer:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Σφάλμα',
              detail: ERROR_MESSAGES[error.error.code],
            });
          },
        });
        break;
    }
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

  protected readonly submit = submit;
}
