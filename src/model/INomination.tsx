import INominationLike from "./INominationLike";

export default interface INomination {
    id: number,
    movieTitle: string,
    chosen: boolean,
    submittedBy: string,
    likes: INominationLike[]
}