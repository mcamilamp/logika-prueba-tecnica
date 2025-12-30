export interface Action {
    id: string;
    name: string;
    description: string;
    icon?: string;
    status: string;
    creationDate: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}
