import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerInsert } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm {
  regions = [
    { id: 1, name: 'Athens' },
    { id: 2, name: 'Thessaloniki' },
    { id: 3, name: 'Patra' },
  ];
  customerForm: FormGroup;
  customerToSubmit: CustomerInsert = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    vat: '',
    regionId: 0,
    address: '',
    postalCode: '',
    companyName: '',
  };

  constructor(private readonly formBuilder: FormBuilder, private readonly customerService: CustomerService) {
    this.customerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      address: '',
      postalCode: '',
      vat: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      companyName: '',
      regionId: [1, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.customerForm.invalid) return;
    this.customerToSubmit = this.customerForm.value;
    this.customerService.addCustomer(this.customerToSubmit).subscribe({
      next: (response) => {
        console.log('Customer added successfully:', response);
        this.onReset();
      },
      error: (error) => {
        console.error('Error adding customer:', error);
      }
    });
  }

  onReset() {
    this.customerForm.reset();
  }
}
