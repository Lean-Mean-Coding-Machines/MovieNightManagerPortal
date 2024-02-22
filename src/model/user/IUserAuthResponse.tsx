import ICommunitySummary from "../ICommunitySummary";

export default interface IUserAuthResponse {
    token: string,
    userId: number,
    username: string,
    communities: ICommunitySummary[]
}