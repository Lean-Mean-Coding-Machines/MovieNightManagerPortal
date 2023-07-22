import axios, {AxiosError, AxiosResponse} from "axios";
import {useNavigate} from "react-router";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import jwt_decode, {JwtPayload} from "jwt-decode";
import dayjs from "dayjs";
import http from "../http-common";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IUserAuthResponse from "../model/user/IUserAuthResponse";

const baseURL = 'http://127.0.0.1:8080/v1';

const useAxios = () => {
    const {authToken, logoutUser, setUserAuthData, userId} = useContext(UserContext);

    const axiosInstance = axios.create({baseURL});

    axiosInstance.interceptors.request.use(async req => {

        if (authToken !== "") {
            req.headers.Authorization = `Bearer ${authToken}`;

            const user = jwt_decode<JwtPayload>(authToken);
            const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1; // TODO :: Change these parameters

            if (!isExpired) return req

            const response =
                await axios.post<IMnmApiResponse<IUserAuthResponse>>(
                    `${baseURL}/user/token/refresh/${userId}`,
                    {},
                    {headers: {Authorization: `Bearer ${authToken}`}}
                );
            if (response.data.data) {
                setUserAuthData(response.data.data);
                req.headers.Authorization = `Bearer ${response.data.data.token}`;
            } else {
                console.log("Error refreshing token");
                logoutUser();
            }
        } else {
            req.headers.Authorization = '';
        }

        return req;
    });

    // TODO :: Rethink how the api returns statuses (use response entity?)
    axiosInstance.interceptors.response.use((res: AxiosResponse<IMnmApiResponse<any>>) => {
        switch (res.data.status.code) {
            case 401: // TODO :: toaster error?
                console.log("User not authorized");
                break;
        }

        return res;
    }, (error: AxiosError) => {
        switch (error.response?.status) {
            case 403:
                logoutUser();
                break;
            case 401: // TODO :: toaster error?
                console.log("User not authorized");
                break;
        }
    });

    return axiosInstance
}

export default useAxios;