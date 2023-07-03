import http from "../http-common";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IUserCreateRequest from "../model/user/IUserCreateRequest";
import IUserCreateResponse from "../model/user/IUserCreateResponse";
import IUser from "../model/user/IUser";
import IUserAuthRequest from "../model/user/IUserAuthRequest";
import IUserAuthResponse from "../model/user/IUserAuthResponse";

const authUser = (userRequest: IUserAuthRequest) => {
    http.defaults.headers.common['Authorization'] = 'test';
    return http.post<IMnmApiResponse<IUserAuthResponse>>("/user/authenticate", userRequest)
        .then(
            (res) => {
                if (res.data.status.success && res.data.data != null) {
                    http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token;
                } else {
                    console.log("Could not authenticate user");
                }

                return res.data.data;
            },
            (err) => {
                console.log(err);
                return null;
            }
        )
        .catch(
            (err) => {
                console.log(err.message);
                return null;
            }
        );
};

const expireUserAuth = () => {
    // TODO :: Expire token server side instead of blanking it out client side
    http.defaults.headers.common['Authorization'] = '';
}

const createNewUser = (userRequest: IUserCreateRequest) => {
    return http.post<IMnmApiResponse<IUserCreateResponse>>("/user/create", userRequest);
};

const getAllUsers = () => {
    return http.get<IMnmApiResponse<IUser>>("/user/all");
};

const getUserDetails = (userId: number) => {
    return http.get<IMnmApiResponse<IUser>>("/user/details/" + userId);
};

const UserService = {
    authUser,
    createNewUser,
    getAllUsers,
    expireUserAuth,
    getUserDetails
};

export default UserService;