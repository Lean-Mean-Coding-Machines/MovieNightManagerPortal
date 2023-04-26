import INomination from "./INomination";
import INominationLike from "./INominationLike";

export default interface IUsers{
    id: number,
    userRole: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    nominations: INomination[],
    nominationLikes: INominationLike[]
}