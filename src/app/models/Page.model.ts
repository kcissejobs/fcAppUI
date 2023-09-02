export interface Page<T> {
    totalElements: number;
    totalPages: number;
    numero: number;
    size: number;
    content: T[];
    last: boolean;
}