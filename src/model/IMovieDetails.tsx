import IGenres from "./IGenres";

export default interface IMovieDetails {
    genres: IGenres[],
    runtime: number,
    overview: string
}
