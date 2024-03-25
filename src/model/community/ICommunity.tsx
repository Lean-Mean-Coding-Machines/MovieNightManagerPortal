import ICommunityUser from "./ICommunityUser";

export default interface ICommunity {
  id: number;
  name: string;
  timezone: string;
  userData: ICommunityUser[];
  createdOn: string;
  createdByUsername: string;
  createdById: number
}
