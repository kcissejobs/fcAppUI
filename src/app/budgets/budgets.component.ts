import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/Budget.model';
import { FormBuilder, FormGroup, RequiredValidator } from '@angular/forms';
import { Period } from '../models/Period.model';
import { AuthenticationService } from '../services/authentication.service';
import { PeriodService } from '../services/period.service';
import { AppUser } from '../models/user.model';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets! : Array<Budget> ;
  errorMessage! : string;
  searchForm! : FormGroup;
  addBudgetFormGroup!: FormGroup;
  updateBudgetFormGroup!: FormGroup;
  periods: Period[] = [] ;

  constructor(
    private auth: AuthenticationService, 
    private budgetService : BudgetService,
    private periodService: PeriodService, 
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.initSearchForm();
    this.initAddBudgetForm();
    this.initUpdateForm();

    this.auth.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {
        this.getBudgets(appUser.accountId);
        this.getPeriods(appUser.id);
      },
      error: (err)=> {
        console.log('Erreur : '+ err)
      }
    });
   
  }

  initUpdateForm() {
    this.updateBudgetFormGroup = this.fb.group({
      id: this.fb.control(''),
      amount: this.fb.control(''),
      status: this.fb.control('FREEZE'),
      period: this.fb.group({
        id: this.fb.control('')
      }),
      description: this.fb.control('')
    })
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      keyword: this.fb.control(null)
    })
  }

  initAddBudgetForm() {
    this.addBudgetFormGroup = this.fb.group({
      amount: this.fb.control(0),
      status: this.fb.control('FREEZE'),
      period: this.fb.group({
        id: this.fb.control('')
      }),
      description: this.fb.control('')
    })
  }


  searchBudgets() {
    let keyword = this.searchForm.value.keyword;
    this.budgets = this.budgets.filter(b=> b.description.includes(keyword))
   }

  getBudgets(accountId: string) {
    this.budgetService.getAllBudgets(accountId).subscribe({
      next: (data : Budget[]) => {
        this.budgets = data;
      },
      error: (err)=> {
        this.errorMessage = err;
      }
    })
  }

  getPeriods(userId: string) {
    this.periodService.findUserPeriods(userId).subscribe({
      next: (periods: Period[])=> {
        this.periods = periods;
      },
      error: (err)=> {
        this.errorMessage = err;
      }
    })
  }

  onAddBudget() {
    this.auth.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {
        let budget: Budget = {
          accountId: appUser.accountId,
          ...this.addBudgetFormGroup.value
        }
        this.budgetService.addBudget(budget).subscribe({
          next: (budget: Budget)=> {
            window.location.reload();
          },
          error: (err)=> {
            this.errorMessage = err;
          }
        })

      },
      error: (err)=> {
        this.errorMessage = err;
      }
    })
  }

  onDeleteBudget(budget: Budget) {
    this.budgetService.deleteBudget(budget.id).subscribe({
      next: (budget: Budget)=> {
        window.location.reload();
      },
      error: (err)=> {
        this.errorMessage = err;
      }
    })
  }

  showBudget(budget: Budget) {
    this.updateBudgetFormGroup.patchValue(budget)
  }

  onUpdateBudget() {
    this.auth.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {

        let budget: Budget = {
          accountId: appUser.accountId,
          ...this.updateBudgetFormGroup.value
        }

        this.budgetService.updateBudget(budget).subscribe({
          next: (budget: Budget)=> {
            window.location.reload();
          },
          error: (err)=> {
            this.errorMessage = err;
            debugger
          }
        })
      },

      error: (err)=> {
        this.errorMessage = err;
      }
    })
  }


}
