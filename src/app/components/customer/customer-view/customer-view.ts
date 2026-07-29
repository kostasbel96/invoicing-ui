import { Component, OnInit, signal } from '@angular/core';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerUi } from '../../ui/spinner-ui/spinner-ui';
import { Dialog } from 'primeng/dialog';
import { CustomerForm } from '../customer-form/customer-form';
import { EditButton } from '../../ui/action-buttons-ui/edit-button/edit-button';
import { DeleteButton } from '../../ui/action-buttons-ui/delete-button/delete-button';
import { MessageService } from 'primeng/api';
import { ERROR_MESSAGES } from '../../../core/constants/error-messages';
import { CancelButton } from '../../ui/action-buttons-ui/cancel-button/cancel-button';

@Component({
  selector: 'app-customer-view',
  imports: [SpinnerUi, Dialog, CustomerForm, EditButton, DeleteButton, CancelButton],
  templateUrl: './customer-view.html',
  styleUrl: './customer-view.scss',
})
export class CustomerView implements OnInit {
  customer: Customer;
  updateDialogVisible = signal(false);
  deleteDialogVisible = signal(false);
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
    private readonly messageService: MessageService,
    private readonly router: Router,
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
    this.updateDialogVisible.set(true);
  }

  delete(): void {
    this.deleteDialogVisible.set(true);
  }

  fetchCustomer(): void {
    this.customerService.getCustomer(this.uuid).subscribe((customer) => {
      this.customer = customer;
      this.loading.set(false);
    });
  }

  customerUpdated(): void {
    this.fetchCustomer();
    this.updateDialogVisible.set(false);
  }

  confirmDelete(): void {
    this.customerService.deleteCustomer(this.customer.uuid).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Επιτυχία',
          detail: `Ο πελάτης ${this.customer.firstname} ${this.customer.lastname} διαγράφηκε επιτυχώς`,
        });
        this.deleteDialogVisible.set(false);
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.error('Error deleting customer:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Σφάλμα',
          detail: `Ο πελάτης ${this.customer.firstname} ${this.customer.lastname} δεν διαγράφηκε`,
        });
        this.deleteDialogVisible.set(false);
      },
    });
  }
}
