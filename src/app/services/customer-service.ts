import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, CustomerInsert } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private readonly http: HttpClient) {}

  addCustomer(customer: CustomerInsert): Observable<Customer> {
    return this.http.post<Customer>('https://localhost:5216/api/Customers/Add', customer);
  }
}
