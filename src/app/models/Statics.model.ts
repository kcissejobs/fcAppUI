export interface Statistics {
    budgetAmount: number,
    expenseAmount: number,
    expenseAmountByType: Map<string, number>,
    periodVMList: PeriodVM[]
}

export interface PeriodVM {
    id: number,
    startDate: Date,
    endDate: Date,
    budgetAmount: number,
    expenseAmount: number
}