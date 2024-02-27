
export default interface INominationRequest {
    watchPartyId: number,
    movieId: number,
    movieTitle: string,
    posterPath: string,
    releaseDate: string,
    runtime: number,
    genres: string[],
    userId: number,
    overview: string
}
