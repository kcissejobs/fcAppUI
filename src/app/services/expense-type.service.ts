import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExpenseType } from '../models/ExpenseType.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {
  PATH_OF_API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public findAllExpenseTypes(id: string) : Observable<ExpenseType[]>{

    return this.http.get<ExpenseType[]>(this.PATH_OF_API + `/expenseType/findAllExpenseTypes/${id}`);
  }

  public addExpenseType(expenseType: ExpenseType) : Observable<ExpenseType>{
    
    return this.http.post<ExpenseType>(this.PATH_OF_API + `/expenseType/createExpenseType`, expenseType);
  }

  public updateExpenseType(expenseType: ExpenseType) : Observable<ExpenseType>{
    
    return this.http.put<ExpenseType>(this.PATH_OF_API + `/expenseType/updateExpenseType`, expenseType);
  }

  public deleteExpenseType(id: number) : Observable<any>{

   return  this.http.delete(this.PATH_OF_API + `/expenseType/deleteExpenseType/${id}`);
  }
}
