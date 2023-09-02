import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, find } from 'rxjs';
import { Expense } from '../models/Expense.model';
import { AuthenticationService } from '../services/authentication.service';
import { ExpenseService } from '../services/expense.service';
import { AppUser } from '../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpenseType } from '../models/ExpenseType.model';
import { ExpenseTypeService } from '../services/expense-type.service';
import { Budget } from '../models/Budget.model';
import { BudgetService } from '../services/budget.service';
import { JsonPipe } from '@angular/common';
import { Page } from '../models/Page.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
 // PATH_OF_API = "http://localhost:8080/api/v1";
  expensePages!: Page<Expense>[];
  pageSize: number = 5;

  //expenses!: Expense[];
  currentPage!: Page<Expense>;
  expenseTypes!: ExpenseType[] ;
  budgets!: Budget[];
  currentExpense!: Expense;
  addExpenseForm!: FormGroup;
  updateExpenseFormGroup!: FormGroup;
  hiddenAmount: boolean = true;
  hiddenStatus: string[] =['FREEZE', 'CANCEL']

  constructor(
    private authService: AuthenticationService, 
    private expenseService: ExpenseService,
    private expenseTypeService: ExpenseTypeService,
    private budgetService: BudgetService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initAddExpenseForm();
    this.initUpdateExpenseForm()

    this.authService.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {
        this.findAllAccountExpenses(appUser.accountId);
        this.findExpenseTypes(appUser.id);
        this.findAllBudgetTypes(appUser.accountId);
      },
      error: (err)=> {
        console.log('Erreur : '+ err)
      }
    });

  }

  initAddExpenseForm() {
    this.updateExpenseFormGroup= this.fb.group({
      id: this.fb.control(''),
      expenseTypeId: this.fb.control(''),
      budgetId: this.fb.control(''),
      description: this.fb.control(''),
      amount: this.fb.control(''),
      status: this.fb.control('')
    })
  }

  initUpdateExpenseForm() {
    this.addExpenseForm = this.fb.group({
      expenseTypeId: this.fb.control(''),
      budgetId: this.fb.control(''),
      description: this.fb.control(''),
      amount: this.fb.control(''),
      status: this.fb.control('')
    })
  }

  findAllBudgetTypes(accountId: string) {
    this.budgetService.getAllBudgets(accountId).subscribe({
      next: (data : Budget[]) => {
        this.budgets = data;
      },
      error: (err)=> {
        console.log('Erreur : '+err)
      }
    })
  }

  findExpenseTypes(userId: string) {
    this.expenseTypeService.findAllExpenseTypes(userId).subscribe({
      next: (expenseTypes : ExpenseType[])=> {
        this.expenseTypes = expenseTypes;
      },
      error: (err)=> {
        console.log('Erreur : ' + err)
      }
    })
  }

  findAllAccountExpenses(accountId: string) {
    this.expenseService.findAllAccountExpenses(accountId).subscribe({
      next: (expenses : Expense[])=> {
        //this.expenses = expenses;
        this.expensePages = this.constructPages(expenses);
        const page = this.expensePages.find(expense=> expense.numero ==0);
        if(page) this.currentPage = page;
      },
      error: (err)=> {
        console.log('Erreur : '+err)
      }
    })
  }

  private constructPages(expenses: Expense[]): Page<Expense>[] {
    let pages: Page<Expense>[] = []
    const chunkSize = 4;
    let numberPage = 0;
    for (let i = 0; i < expenses.length; i += chunkSize) {
        const chunk = expenses.slice(i, i + chunkSize);
        const page : Page<Expense> = {
          content: chunk,
          last: (i + chunkSize) >= expenses.length,
          numero: numberPage,
          totalElements: expenses.length,
          size: chunk.length,
          totalPages: Math.round(expenses.length/chunkSize)
        };

        pages.push(page);
        //pages.unshift(page);
        numberPage++;
    }

    return pages;
  }

  onSearch() {
    //TODO implementer la recherche
    let searchInfos: Expense = this.addExpenseForm.value;
    alert(`A Implementer`)
  }


  onCreate() {
    let expense: Expense = this.addExpenseForm.value;
    let expenseType = this.expenseTypes.find(expenseType=> expenseType.id == expense.expenseTypeId)
    if( expenseType?.description) {
      expense.description = expenseType.description;
    }

    this.expenseService.createExpense(expense).subscribe({
      next: (expense: Expense)=> {
        window.location.reload();
      },
      error: (err)=> console.log('Erreur :: '+ err)
    })
  }

  onUpdateExpense() {
    let expense = this.updateExpenseFormGroup.value;
    expense.id = this.currentExpense.id;
    expense.dateCreation = this.currentExpense.dateCreation;

    if(expense.expenseTypeId !== this.currentExpense.expenseTypeId) {
      expense.description = this.expenseTypes.find(ept=> ept.id == expense.expenseTypeId)?.description;
    }

    this.expenseService.updateExpense(expense).subscribe({
      next: (expense: Expense)=> {
        window.location.reload();
      },
      error: (err)=> console.log('Erreur :: '+ err)
    })
  }

  onDelete() {
    this.expenseService.deleteExpense(this.currentExpense.id).subscribe({
      next: (data)=> {
        window.location.reload();
      },
      error: (err)=> console.log('Erreur :: '+ err)
    })
  }

  showExpense(expense: Expense) {
    this.currentExpense = expense;
    this.hiddenAmount = !this.hiddenStatus.includes(expense.status)
    this.updateExpenseFormGroup.patchValue(expense)
  }

  showPage(numeroPage: number) {
    const page = this.expensePages.find(page=> page.numero == numeroPage);
    if(page) this.currentPage = page;
  }

}