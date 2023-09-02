export interface Period {
    id: string;
    startDate: string;
    endDate: string;
    userId: string;
    status: Status
} 

enum Status {
    PENDING,
    OPEN,
    CLOSE
}