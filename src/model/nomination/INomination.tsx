import IGenres from "../IGenres";
import INominationLike from "./INominationLike";

export default interface INomination {
    id: number,
    movieId: number,
    movieTitle: string,
    chosen: boolean,
    submittedBy: string,
    posterPath: string,
    movieOverview: string,
    releaseDate: string,
    runtime: number,
    genres: IGenres[],
    nominationLikes: INominationLike[]
}