export interface Budget {
    id: number,
    description: string;
    amount: number,
    status: string,
    accountId: string,
    period: {
        id: number,
        startDate: string,
        endDate: string
    }
}