import http from "../http-common";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IUserCreateRequest from "../model/user/IUserCreateRequest";
import IUserCreateResponse from "../model/user/IUserCreateResponse";

const createNewUser = (userRequest: IUserCreateRequest) => {
    return http.post<IMnmApiResponse<IUserCreateResponse>>("/user/create", userRequest);
};

const UserService = {createNewUser};

export default UserService;