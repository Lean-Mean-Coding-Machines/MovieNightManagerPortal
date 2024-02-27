import IGenres from "./IGenres";
import IMovieCredits from "./IMovieCredits";

export default interface IMovieDetails {
    genres: IGenres[],
    runtime: number,
    overview: string,
    credits: IMovieCredits,
}
