import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Budget } from '../models/Budget.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgets! : Array<Budget> ;
 // PATH_OF_API = "https://app-h6f9.onrender.com/api/v1"
   PATH_OF_API = environment.apiUrl;

  public  getAllBudgets(accountId: string) : Observable<Budget[]> {
    return this.http.get<Budget[]>(this.PATH_OF_API +`/budget/findAllBudgets/${accountId}`);
  }

  public  getSearchBudget(keyword: any) : Observable<Budget[]> {
   let budgetsFound: Budget[] = this.budgets.filter(b=> b.description.includes(keyword))
    return  of(budgetsFound);
  }

  constructor(private http: HttpClient) {
    this.budgets =  []
  }

  public  addBudget(budget: Budget) : Observable<Budget> {
    return this.http.post<Budget>(this.PATH_OF_API +"/budget/createBudget", budget);
  }

  public  deleteBudget(id: number) : Observable<Budget> {
  
    return this.http.delete<Budget>(this.PATH_OF_API + `/budget/deleteBudget/${id}`);
  }

  public updateBudget(budget: Budget) : Observable<Budget> {
    return this.http.put<Budget>(this.PATH_OF_API+ '/budget/updateBudget', budget)
  }

}