import IUserAuthResponse from "../model/user/IUserAuthResponse";
import ICommunitySummary from "../model/ICommunitySummary";

const getUsername = function (): string {
    return localStorage.getItem("username") === null ? "" : localStorage.getItem("username")!.toString();
};

const setUsername = function (name: string) {
    localStorage.setItem("username", name);
};

const getUserId = function (): number {
    return localStorage.getItem("userId") === null ? 0 : +localStorage.getItem("userId")!;
};

const setUserId = function (id: number) {
    localStorage.setItem("userId", id.toString());
};

const getSelectedCommunity = function (): ICommunitySummary {
    return localStorage.getItem("community") === null ? {} as ICommunitySummary : JSON.parse(localStorage.getItem("community")!);
};

const setSelectedCommunity = function (community: ICommunitySummary) {
    localStorage.setItem("community", JSON.stringify(community));
};

const getEnrolledCommunities = function (): ICommunitySummary[] {
    return localStorage.getItem("communities") === null ? [] : JSON.parse(localStorage.getItem("communities")!);
};

const setEnrolledCommunities = function (communities: ICommunitySummary[]) {
    localStorage.setItem("communities", JSON.stringify(communities));
};

const setUserData = function (res: IUserAuthResponse) {
    setUsername(res.username);
    setUserId(res.userId);
    setEnrolledCommunities(res.communities);
    setSelectedCommunity(res.communities.length ? res.communities[0] : {id: 0, name: ''});
};

const clearUserData = () => {
    setUsername("");
    setUserId(0);
    setEnrolledCommunities([]);
    setSelectedCommunity({id: 0, name: ''});
}

const setAuthToken = function (res: IUserAuthResponse) {
    localStorage.setItem("authToken", res.token);
};

const getAuthToken = function () {
    return localStorage.getItem("authToken") === null ? "" : localStorage.getItem("authToken")!.toString();
};


const UserStorageService = {
    setUserData,
    getUsername,
    setUsername,
    getUserId,
    setUserId,
    getSelectedCommunity,
    setSelectedCommunity,
    getEnrolledCommunities,
    setEnrolledCommunities,
    clearUserData,
    setAuthToken,
    getAuthToken
};

export default UserStorageService;