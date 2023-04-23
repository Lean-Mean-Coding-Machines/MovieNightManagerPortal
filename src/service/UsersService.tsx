import http from "../http-common";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IUsers from "../model/IMovieNightSegment";

const getUsers = () => {
    return http.get<IMnmApiResponse<IUsers>>("/segment/current");
};

const UsersService = {getUsers};

export default UsersService;