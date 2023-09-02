import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AppUser } from '../models/user.model';
import Chart from 'chart.js/auto';
import { PeriodVM, Statistics } from '../models/Statics.model';
import { StatisticsService } from '../services/statistics.service';
import { DatePipe, JsonPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appUser: AppUser | undefined;
  //statistics: Statistics | undefined;

  chartBarExpenseByType: any;
  chartBarCurrentPeriod: any;

  chartExpenseBudgetHistory: any;
  chartEvolExpense: any;
  chartEvolDiffExpenseBudget: any;


  constructor(
    private authService: AuthenticationService, 
    private statService: StatisticsService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
     this.authService.getAuthenticatedUser().subscribe({
      next: (data)=> {
        this.appUser = data
      },
      error: (err)=> {
        console.log('Error :' + err)
      }
    });
    
    this.getStatistics();
  }

  getStatistics() {
    this.authService.getAuthenticatedUser().subscribe({
      next: (appUser: AppUser)=> {
        this.statService.getStatics(appUser.accountId).subscribe({
          next: (statistics: Statistics)=> {
            const expenseAmountKeys = Object.keys(statistics.expenseAmountByType);
            const expenseAmountValues = Object.values(statistics.expenseAmountByType);
            //Open period chart
            this.createBarChartCurrentPeriod([statistics.budgetAmount, statistics.expenseAmount]);
            this.createBarChartExpenseByType(expenseAmountKeys, expenseAmountValues)

            this.createLineChartExpenseBudgetHistory(statistics.periodVMList)
            this.createChartEvolExpense(statistics.periodVMList);
            this.createChartEvolDiffExpenseBudget(statistics.periodVMList)

          },
          error: err => {
            alert(err.message)
            console.log('Erreur ::' + err)
          }
        })
      },
      error: err => {
        console.log('Erreur ::' + err)
      }
    })
  }

  createLineChartExpenseBudgetHistory(periodVMList: PeriodVM[]) {
    let periods: any[]= [];
    let expenses: number[]= [];
    let budgets: number[] = [];
    periodVMList.forEach(periodVM=> {
      periods.push(this.datePipe.transform(periodVM.endDate, 'MM/yy'));
      expenses.push(periodVM.expenseAmount)
      budgets.push(periodVM.budgetAmount)
    })

    this.chartExpenseBudgetHistory = new Chart("chartExpenseBudgetHistory", {
      type: 'line', //this denotes tha type of chart

      data: {
        labels: periods,
        datasets: [
          {
            label: "Dépense",
            data: expenses,
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Budget",
            data: budgets,
            borderWidth: 2,
            fill: true, 
          }
        ]
      },
     // options: { aspectRatio:2.5}
    });
  }

  createBarChartCurrentPeriod(data: any[]) {
    this.chartBarCurrentPeriod = new Chart("chartBarCurrentPeriod", {
      type: 'bar', //this denotes tha type of chart
      data: {
        labels: ['Budget', 'Dépense'],
        datasets: [{
          label: 'Budget - Dépense',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)'
          ],
          borderWidth: 1
        }]
      },
      //options: { aspectRatio:2.5}
    });
  }

  createChartEvolDiffExpenseBudget(periodVMList: PeriodVM[]) {
    let periods: any[]= [];
    let diffBudgetExpenses: any[]= [];
    periodVMList.forEach(periodVM=> {
      periods.push(this.datePipe.transform(periodVM.endDate, 'MM/yy'));
      diffBudgetExpenses.push({
        'x': periodVM.budgetAmount - periodVM.expenseAmount,
        'y': 0
      })

    })

    this.chartEvolDiffExpenseBudget = new Chart("chartEvolDiffExpenseBudget", {
      type: 'scatter', //this denotes tha type of chart

      data: {
        labels: periods,
        datasets: [{
          label: 'Ecart entre budget et dépenses',
          data: diffBudgetExpenses,
          backgroundColor: 'rgb(255, 99, 132)'
        }]
        
      },
      //options: { aspectRatio:2.5}
    });
  }

  createBarChartExpenseByType(labels: string[], data: (number | undefined)[]) {
    this.chartBarExpenseByType = new Chart("chartBarExpenseByType", {
      type: 'bar', //this denotes tha type of chart
      data: {
        labels,
        datasets: [{
          label: 'Montant dépense par type',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      }
    });
  }

  createChartEvolExpense(periodVMList: PeriodVM[]) {
    let periods: any[]= [];
    let expenses: number[]= [];
    periodVMList.forEach(periodVM=> {
      periods.push(this.datePipe.transform(periodVM.endDate, 'MM/yy'));
      expenses.push(periodVM.expenseAmount)
    })


    this.chartEvolExpense = new Chart("chartEvolExpense", {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: periods,
        datasets: [{
          label: 'Evolution de la dépense',
          data: expenses,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
}
