import { Component, signal } from '@angular/core';
import { TableUi } from '../../../ui/table-ui/table-ui';
import { CustomerService } from '../../../../services/customer-service';
import { Customer } from '../../../../models/customer.model';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-customer-table',
  imports: [TableUi],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.scss',
})
export class CustomerTable {
  columns = [
    { field: 'id', header: 'Α/Α', width: 5 },
    { field: 'firstname', header: 'Όνομα', width: 9 },
    { field: 'lastname', header: 'Επώνυμο', width: 10 },
    { field: 'email', header: 'Email', width: 13 },
    { field: 'phone', header: 'Τηλέφωνο', width: 10 },
    { field: 'address', header: 'Διεύθυνση', width: 15 },
    { field: 'postalCode', header: 'Τ.Κ.', width: 6 },
    { field: 'vat', header: 'ΑΦΜ', width: 7 },
    { field: 'companyName', header: 'Επωνυμία', width: 12 },
    { field: 'balance', header: 'Υπόλοιπο', width: 6 },
    { field: 'regionName', header: 'Περιοχή', width: 7 },
  ];
  data: Customer[] = [];
  loading = signal<boolean>(true);
  rows: number = 10;
  totalRecords: number = 0;

  constructor(private readonly customerService: CustomerService) {}

  loadCustomers(event: TableLazyLoadEvent) {
    const page = (event.first ?? 0) / (event.rows ?? 10);
    const pageSize = event.rows ?? 10;
    this.loading.set(true);

    this.customerService.getCustomers(page, pageSize).subscribe((response) => {
      this.data = response.data;
      this.data = this.data.map((customer) => ({ ...customer, regionName: customer.region.name }));
      this.totalRecords = response.totalRecords;
      this.loading.set(false);
    });
  }
}
