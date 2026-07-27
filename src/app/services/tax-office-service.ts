import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaxOffice } from '../models/taxOffice.model';

@Injectable({
  providedIn: 'root',
})
export class TaxOfficeService {
  constructor(private readonly http: HttpClient) {}

  getTaxOffices(): Observable<TaxOffice[]> {
    return this.http.get<TaxOffice[]>('https://localhost:5216/api/TaxOffices');
  }
}
