export default interface ITmdbResult<T> {
    page: number,
    total_pages: Date,
    total_results: Date,
    results: T,
}