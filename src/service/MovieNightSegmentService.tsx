import http from "../http-common";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IMovieNightSegment from "../model/IMovieNightSegment";

const getCurrentSegment = () => {
    return http.get<IMnmApiResponse<IMovieNightSegment>>("/segment/current");
};

const MovieNightSegmentService = {
    getCurrentSegment
};

export default MovieNightSegmentService;