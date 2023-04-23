import http from "../http-common";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IUserCreateRequest from "../model/user/IUserCreateRequest";
import IUserCreateResponse from "../model/user/IUserCreateResponse";
import IUsers from "../model/IMovieNightSegment";

const createNewUser = (userRequest: IUserCreateRequest) => {
    return http.post<IMnmApiResponse<IUserCreateResponse>>("/user/create", userRequest);
};

const getAllUsers = () => {
    return http.get<IMnmApiResponse<IUsers>>("/user/all");
};

const UserService = {createNewUser,getAllUsers};

export default UserService;