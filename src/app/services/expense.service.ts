import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/Expense.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  PATH_OF_API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createExpense(expense: Expense) : Observable<Expense> {
    return this.http.post<Expense>(`${this.PATH_OF_API}/expense/createExpense`, expense);
  }

  updateExpense(expense: Expense) : Observable<Expense> {
    return this.http.put<Expense>(`${this.PATH_OF_API}/expense/updateExpense`, expense);
  }

  findAllAccountExpenses(id: string) : Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.PATH_OF_API}/expense/findAccountExpenses/${id}`);
  }

  deleteExpense(id: number) : Observable<Expense> {
    return this.http.delete<Expense>(`${this.PATH_OF_API}/expense/deleteExpenseById/${id}`);
  }

}
