import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/response.model';
import { Product, ProductInsert } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  endpoint = `${environment.apiUrl}/Items`;
  constructor(private readonly http: HttpClient) {}

  addProduct(product: ProductInsert): Observable<Product> {
    return this.http.post<Product>(`${this.endpoint}/Add`, product);
  }

  getProducts(
    page: number,
    pageSize: number,
    search: string,
    sortField: string,
    sortOrder: string,
  ): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(
      `${this.endpoint}?page=${page}&pageSize=${pageSize}&search=${search ?? ''}&sortField=${sortField}&sortOrder=${sortOrder}`,
    );
  }

  getProduct(uuid: string): Observable<Product> {
    return this.http.get<Product>(`${this.endpoint}/by-uuid/${uuid}`);
  }

  updateProduct(uuid: string, product: ProductInsert): Observable<Product> {
    return this.http.patch<Product>(`${this.endpoint}/Update/${uuid}`, product);
  }

  deleteProduct(uuid: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.endpoint}/${uuid}`);
  }
}
