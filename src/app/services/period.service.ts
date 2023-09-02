import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Period } from '../models/Period.model';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  

  PATH_OF_API = environment.apiUrl;

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  public findUserPeriods(userId: string): Observable<Period[]> {
  
    return this.http.get<Period[]>(this.PATH_OF_API +"/period/findAllUserPeriods/"+userId);
  }

  public addPeriod(period: Period): Observable<Period> {
  
    return this.http.post<Period>(this.PATH_OF_API +"/period/createPeriod", period);
  }


  updatePeriod(period: Period): Observable<Period> {
    return this.http.put<Period>(this.PATH_OF_API +"/period/updatePeriod", period);
  }

  deletePeriod(id: string): Observable<Period> {
    return this.http.delete<Period>(this.PATH_OF_API +`/period/deletePeriod/${id}`);
  }
}
