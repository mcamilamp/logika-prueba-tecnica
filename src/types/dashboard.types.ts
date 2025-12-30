export interface Action {
    id: number;
    name: string;
    description: string;
    status: string;
    creationDate: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
