import { Component, OnInit, signal } from '@angular/core';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerUi } from '../../ui/spinner-ui/spinner-ui';
import { Dialog } from 'primeng/dialog';
import { CustomerForm } from '../customer-form/customer-form';

@Component({
  selector: 'app-customer-view',
  imports: [SpinnerUi, Dialog, CustomerForm],
  templateUrl: './customer-view.html',
  styleUrl: './customer-view.scss',
})
export class CustomerView implements OnInit {
  customer: Customer;
  dialogVisible = signal(false);
  uuid: string;
  loading = signal(true);
  protected readonly Object = Object;
  customerFields = [
    { label: 'ΟΝΟΜΑ', key: 'firstname' },
    { label: 'ΕΠΩΝΥΜΟ', key: 'lastname' },
    { label: 'ΕΠΩΝΥΜΙΑ', key: 'companyName' },
    { label: 'ΑΦΜ', key: 'vat' },
    { label: 'Email', key: 'email' },
    { label: 'ΤΗΛΕΦΩΝΟ', key: 'phone' },
    { label: 'ΔΙΕΥΘΥΝΣΗ', key: 'address' },
    { label: 'ΠΕΡΙΟΧΗ', key: 'region' },
    { label: 'Τ.Κ.', key: 'postalCode' },
    { label: 'ΥΠΟΛΟΙΠΟ', key: 'balance' },
    { label: 'ΔΟΥ', key: 'taxOffice' },
  ];

  constructor(
    private readonly customerService: CustomerService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.uuid = params.get('uuid');
    });
    this.fetchCustomer();
  }

  getFieldValue(key: string) {
    switch (key) {
      case 'region':
        return this.customer.region?.name;
      case 'taxOffice':
        return this.customer.taxOffice?.name;
      default:
        return this.customer[key as keyof Customer];
    }
  }

  edit(): void {
    this.dialogVisible.set(true);
  }

  fetchCustomer(): void {
    this.customerService.getCustomer(this.uuid).subscribe((customer) => {
      this.customer = customer;
      this.loading.set(false);
    });
  }

  customerUpdated(): void {
    this.fetchCustomer();
    this.dialogVisible.set(false);
  }
}
