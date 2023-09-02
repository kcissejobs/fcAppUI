import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from './budgets/budgets.component';
import { PeriodsComponent } from './periods/periods.component';
import { LoginComponent } from './login/login.component';
import { CustomerTemplateComponent } from './customer-template/customer-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';

const routes: Routes = [
  {path : "login", component: LoginComponent},
  {path: "", redirectTo:"/customer/home" , pathMatch: 'full'},
  {
    path : "customer", component: CustomerTemplateComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      {path : "", component: HomeComponent},
      {path : "home", component: HomeComponent},
      {path: "dashboard", component: DashboardComponent},
      {path : "budgets", component: BudgetsComponent},
      {path : "expenses", component: ExpensesComponent},
      {path: "periodes", component: PeriodsComponent},
      {path: "expenseTypes", component: ExpenseTypeComponent}
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
