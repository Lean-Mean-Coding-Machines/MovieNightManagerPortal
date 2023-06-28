import IUserCreateResponse from "../model/user/IUserCreateResponse";
import IUserAuthResponse from "../model/user/IUserAuthResponse";

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

const setUserData = function (res: IUserAuthResponse) {
    setUsername(res.username);
    setUserId(res.userId);
};

const clearUserData = () => {
    setUsername("");
    setUserId(0);
}

const UserStorageService = {
    setUserData,
    getUsername,
    setUsername,
    getUserId,
    setUserId,
    clearUserData
};

export default UserStorageService;