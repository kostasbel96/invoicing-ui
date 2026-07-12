import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { TableUi } from '../../../ui/table-ui/table-ui';
import { CustomerService } from '../../../../services/customer-service';
import { Customer } from '../../../../models/customer.model';
import { TableLazyLoadEvent } from 'primeng/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-customer-table',
  imports: [TableUi],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.scss',
})
export class CustomerTable implements OnInit {
  columns = [
    { field: 'id', header: 'Α/Α', width: 5, sortable: true },
    { field: 'firstname', header: 'Όνομα', width: 9, sortable: true },
    { field: 'lastname', header: 'Επώνυμο', width: 10, sortable: true },
    { field: 'email', header: 'Email', width: 10, sortable: false },
    { field: 'phone', header: 'Τηλέφωνο', width: 10, sortable: false },
    { field: 'address', header: 'Διεύθυνση', width: 15, sortable: false },
    { field: 'postalCode', header: 'Τ.Κ.', width: 6, sortable: false },
    { field: 'vat', header: 'ΑΦΜ', width: 4, sortable: false },
    { field: 'companyName', header: 'Επωνυμία', width: 12, sortable: true },
    { field: 'balance', header: 'Υπόλοιπο', width: 10, sortable: true },
    { field: 'regionName', header: 'Περιοχή', width: 10, sortable: true },
  ];
  data: Customer[] = [];
  loading = signal<boolean>(true);
  rows: number = 10;
  totalRecords: number = 0;
  searchSubject = new Subject<string>();
  currentSearch: string = '';
  lastLazyEvent: TableLazyLoadEvent = {
    first: 0,
    rows: this.rows,
  };
  @ViewChild(TableUi) table!: TableUi<Customer>;

  constructor(private readonly customerService: CustomerService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((search) => {
      this.table.resetPage();
      this.currentSearch = search;
      this.loadCustomers({ ...this.lastLazyEvent, first: 0 });
    });
  }

  loadCustomers(event: TableLazyLoadEvent): void {
    this.lastLazyEvent = event;
    const page = (event.first ?? 0) / (this.rows ?? 10);
    const pageSize = this.rows ?? 10;
    const sortField = Array.isArray(event.sortField) ? event.sortField[0] : event.sortField;

    const sortOrder = event.sortOrder === 1 ? 'ASC' : 'DESC';
    this.loading.set(true);

    this.customerService.getCustomers(page, pageSize, this.currentSearch, sortField, sortOrder)
      .subscribe((response) => {
      this.data = response.data;
      this.data = this.data.map((customer) => ({
        ...customer,
        regionName: customer.region.name ?? '-',
      }));
      this.totalRecords = response.totalRecords;
      this.loading.set(false);
    });
  }

  onSearch(search: string): void {
    this.searchSubject.next(search);
  }
}
