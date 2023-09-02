import { Component, OnInit } from '@angular/core';
import { BudgetSummary } from '../models/BudgetSummary.model';
import { BudgetStatisticService } from '../services/budget-statistic.service';
import { AuthenticationService } from '../services/authentication.service';
import { AppUser } from '../models/user.model';
import { error } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  budgetStatics: BudgetSummary[] = [];

  constructor(private budgetStatisticService: BudgetStatisticService, 
    private authService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {
        this.budgetStatisticService.findSummaryBudgets(appUser.accountId).subscribe({
          next: data=> this.budgetStatics = data,
          error: err=> console.log('Error :'+ err)
        })
      },

      error: (err)=> {
        console.log('Erreur :' + err)
      }
    })
   
  }

}
