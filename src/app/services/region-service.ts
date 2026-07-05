import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root',
})
export class RegionService {

  constructor(private readonly http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>('https://localhost:5216/api/Regions');
  }
}
