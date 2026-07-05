import { Component, OnInit, signal } from '@angular/core';
import { TableUi } from '../../../ui/table-ui/table-ui';
import { CustomerService } from '../../../../services/customer-service';
import { Customer } from '../../../../models/customer.model';

@Component({
  selector: 'app-customer-table',
  imports: [TableUi],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.scss',
})
export class CustomerTable implements OnInit {
  columns = [
    { field: 'id', header: 'Α/Α' },
    { field: 'firstname', header: 'Όνομα' },
    { field: 'lastname', header: 'Επώνυμο' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Τηλέφωνο' },
    { field: 'address', header: 'Διεύθυνση' },
    { field: 'postalCode', header: 'Τ.Κ.' },
    { field: 'vat', header: 'ΑΦΜ' },
    { field: 'companyName', header: 'Επωνυμία' },
    { field: 'balance', header: 'Υπόλοιπο' },
    { field: 'regionId', header: 'Περιοχή' },
  ];
  data: Customer[] = [];
  loading= signal<boolean>(true);

  constructor(private readonly customerService: CustomerService) {

  }

  ngOnInit(): void {
    this.customerService.getCustomers(1, 10).subscribe((data) => {
      this.data = data.data;
      this.loading.set(false);
    });
  }
}
