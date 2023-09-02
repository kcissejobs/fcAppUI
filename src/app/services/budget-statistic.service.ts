import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetSummary } from '../models/BudgetSummary.model';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetStatisticService {

  PATH_OF_API = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public findSummaryBudgets(accountId: string): Observable<BudgetSummary[]> {
    return this.http.get<BudgetSummary[]>(this.PATH_OF_API +`/statistics/summaryBudgets/${accountId}`);
  }
  
}
