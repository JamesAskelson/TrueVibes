export interface Pagination {
    currentPage: number;
    itermsPerPage: number;
    totalItems: number;
    totalPages: number;
}


export class PaginationResult<T> {
    items?: T;
    pagination?: Pagination;
}
