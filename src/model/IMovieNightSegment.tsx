import INomination from "./INomination";

export default interface IMovieNightSegment {
    nominationStartDate: Date,
    nominationLockDate: Date,
    chosenWatchDate: Date,
    watchType: string,
    segmentEndDate: Date,
    nominations: INomination[]
}