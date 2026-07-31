import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, CustomerInsert } from '../models/customer.model';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/response.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  endpoint = `${environment.apiUrl}/Customers`;
  constructor(private readonly http: HttpClient) {}

  addCustomer(customer: CustomerInsert): Observable<Customer> {
    return this.http.post<Customer>(`${this.endpoint}/Add`, customer);
  }

  getCustomers(
    page: number,
    pageSize: number,
    search: string,
    sortField: string,
    sortOrder: string,
  ): Observable<PaginatedResponse<Customer>> {
    return this.http.get<PaginatedResponse<Customer>>(
      `${this.endpoint}?page=${page}&pageSize=${pageSize}&search=${search ?? ''}&sortField=${sortField}&sortOrder=${sortOrder}`,
    );
  }

  getCustomer(uuid: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.endpoint}/by-uuid/${uuid}`);
  }

  updateCustomer(uuid: string, customer: CustomerInsert): Observable<Customer> {
    return this.http.patch<Customer>(`${this.endpoint}/Update/${uuid}`, customer);
  }

  deleteCustomer(uuid: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.endpoint}/${uuid}`);
  }
}
