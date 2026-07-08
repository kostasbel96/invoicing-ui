import { Component, Input, OnInit, signal } from '@angular/core';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerUi } from '../../ui/spinner-ui/spinner-ui';

@Component({
  selector: 'app-customer-view',
  imports: [SpinnerUi],
  templateUrl: './customer-view.html',
  styleUrl: './customer-view.scss',
})
export class CustomerView implements OnInit {
  customer: Customer;
  uuid: string;
  loading = signal(true);
  protected readonly Object = Object;
  customerFields = [
    { label: 'Όνομα', key: 'firstname' },
    { label: 'Επώνυμο', key: 'lastname' },
    { label: 'Επωνυμία', key: 'companyName' },
    { label: 'ΑΦΜ', key: 'vat' },
    { label: 'Email', key: 'email' },
    { label: 'Τηλέφωνο', key: 'phone' },
    { label: 'Διεύθυνση', key: 'address' },
    { label: 'Περιοχή', key: 'region' },
    { label: 'Τ.Κ.', key: 'postalCode' },
    { label: 'Υπόλοιπο', key: 'balance' },
  ];

  constructor(
    private readonly customerService: CustomerService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.uuid = params.get('uuid');
    });
    this.customerService.getCustomer(this.uuid).subscribe((customer) => {
      this.customer = customer;
      this.loading.set(false);
    });
  }

  getFieldValue(key: string) {
    switch (key) {
      case 'region':
        return this.customer.region?.name;

      default:
        return this.customer[key as keyof Customer];
    }
  }
}
