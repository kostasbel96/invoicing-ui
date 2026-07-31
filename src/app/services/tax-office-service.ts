import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaxOffice } from '../models/taxOffice.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaxOfficeService {

  endpoint = `${environment.apiUrl}/TaxOffices`;
  constructor(private readonly http: HttpClient) {}

  getTaxOffices(): Observable<TaxOffice[]> {
    return this.http.get<TaxOffice[]>(this.endpoint);
  }
}
