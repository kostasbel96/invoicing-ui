import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/response.model';
import { ServiceItem, ServiceItemInsert } from '../models/serviceItem.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceItemService {
  endpoint = `${environment.apiUrl}/ServiceItems`;
  constructor(private readonly http: HttpClient) {}

  addServiceItem(serviceItem: ServiceItemInsert): Observable<ServiceItem> {
    return this.http.post<ServiceItem>(`${this.endpoint}/Add`, serviceItem);
  }

  getServiceItems(
    page: number,
    pageSize: number,
    search: string,
    sortField: string,
    sortOrder: string,
  ): Observable<PaginatedResponse<ServiceItem>> {
    return this.http.get<PaginatedResponse<ServiceItem>>(
      `${this.endpoint}?page=${page}&pageSize=${pageSize}&search=${search ?? ''}&sortField=${sortField}&sortOrder=${sortOrder}`,
    );
  }

  getServiceItem(uuid: string): Observable<ServiceItem> {
    return this.http.get<ServiceItem>(`${this.endpoint}/by-uuid/${uuid}`);
  }

  updateServiceItem(uuid: string, serviceItem: ServiceItemInsert): Observable<ServiceItem> {
    return this.http.patch<ServiceItem>(`${this.endpoint}/Update/${uuid}`, serviceItem);
  }

  deleteServiceItem(uuid: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.endpoint}/${uuid}`);
  }
}
