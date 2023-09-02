import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expenseApp';
  budgets = [{"id": 1, "amount" : 500, "period" : "X"}, {"id": 1, "amount" : 800, "period" : "Y"}]
}
