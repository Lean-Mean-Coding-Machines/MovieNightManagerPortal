export default interface ITmdbResult<T> {
    page: number,
    total_pages: number,
    total_results: number,
    results: T,
}