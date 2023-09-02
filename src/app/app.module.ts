import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeriodsComponent } from './periods/periods.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CustomerTemplateComponent } from './customer-template/customer-template.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PeriodsComponent,
    BudgetsComponent,
    LoginComponent,
    CustomerTemplateComponent,
    ForbiddenComponent,
    HomeComponent,
    DashboardComponent,
    ExpensesComponent,
    ExpenseTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
