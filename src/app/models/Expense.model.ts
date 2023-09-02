import { Budget } from "./Budget.model";
import { ExpenseType } from "./ExpenseType.model";

export interface Expense {
    id: number,
    description: string;
    amount: number,
    status: string,
    expenseTypeId: number,
    budgetId: number
    dateCreation: Date
}