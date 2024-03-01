import INomination from '../nomination/INomination';
import INominationLike from '../nomination/INominationLike';

export default interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  nominations: INomination[];
  nominationLikes: INominationLike[];
}
