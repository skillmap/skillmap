export default interface PaginatedData<T , I> {
    pageInfo: {
        currentPageKey: I;
        nextPageKey: I;
        count: number;
    };
    data: T[];
}
