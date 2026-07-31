import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VatRate } from '../models/vatRate.model';

@Injectable({
  providedIn: 'root',
})
export class VatRateService {

  endpoint = `${environment.apiUrl}/VatRates`;
  constructor(private readonly http: HttpClient) {}

  getVatRates(): Observable<VatRate[]> {
    return this.http.get<VatRate[]>(this.endpoint);
  }
}
