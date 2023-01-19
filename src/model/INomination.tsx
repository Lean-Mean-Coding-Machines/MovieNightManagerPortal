import INominationLike from "./INominationLike";

export default interface INomination {
    id: number,
    movieTitle: string,
    chosen: boolean,
    watchType: string,
    submittedBy: string,
    likes: INominationLike[]
}