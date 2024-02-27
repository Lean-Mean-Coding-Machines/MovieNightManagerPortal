import INomination from "./nomination/INomination";

export default interface IWatchParty {
    id: number,
    nominationStartDate: Date,
    nominationLockDate: Date,
    chosenWatchDate: Date,
    nominations: INomination[]
}