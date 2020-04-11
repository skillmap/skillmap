
interface PaginatedData<T , I> {
    pageInfo: {
        currentPageKey: I;
        nextPageKey: I;
        count: number;
    };
    data: T[];
}

export default PaginatedData;
