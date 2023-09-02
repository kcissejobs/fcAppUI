import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistics } from '../models/Statics.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  PATH_OF_API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStatics(id: string): Observable<Statistics> {
    return this.http.get<Statistics>(this.PATH_OF_API + `/statistics/accountStatistics/${id}`);
  }
}
