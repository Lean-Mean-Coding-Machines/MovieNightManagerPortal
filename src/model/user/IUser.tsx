import INomination from "../INomination";
import INominationLike from "../INominationLike";

export default interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    nominations: INomination[],
    nominationLikes: INominationLike[]
}