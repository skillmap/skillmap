export default interface PaginatedData<T> {
    pageInfo: {
        currentPageKey: string;
        nextPageKey: string;
        count: number;
    };
    data: T[];
}
