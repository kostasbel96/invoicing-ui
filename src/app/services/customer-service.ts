import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, CustomerInsert } from '../models/customer.model';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private readonly http: HttpClient) {}

  addCustomer(customer: CustomerInsert): Observable<Customer> {
    return this.http.post<Customer>('https://localhost:5216/api/Customers/Add', customer);
  }

  getCustomers(page: number, pageSize: number, search: string, sortField: string, sortOrder: string) : Observable<PaginatedResponse<Customer>> {
    return this.http
      .get<PaginatedResponse<Customer>>(
        `https://localhost:5216/api/Customers?page=${page}&pageSize=${pageSize}&search=${search ?? ""}&sortField=${sortField}&sortOrder=${sortOrder}`,);
  }

  getCustomer(uuid: string): Observable<Customer> {
    return this.http.get<Customer>(`https://localhost:5216/api/Customers/by-uuid/${uuid}`);
  }
}
