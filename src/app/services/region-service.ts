import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/region.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  endpoint = `${environment.apiUrl}/Regions`;
  constructor(private readonly http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.endpoint);
  }
}
