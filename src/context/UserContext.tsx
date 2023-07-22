import {useState, createContext, useEffect, ReactNode} from "react";
import {useNavigate} from 'react-router-dom';
import IUserAuthRequest from "../model/user/IUserAuthRequest";
import UserStorageService from "../service/UserStorageService";
import useAxios from "../hooks/useAxios";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IUserAuthResponse from "../model/user/IUserAuthResponse";

interface UserContextInterface {
    userId: number,
    username: string,
    authToken: string,
    setUserAuthData: (data: IUserAuthResponse) => void,
    loginUser: (userRequest: IUserAuthRequest) => void,
    logoutUser: () => void
}

interface UserProviderProps {
    children: ReactNode
}

const defaultState: UserContextInterface = {
    userId: 0,
    username: "",
    authToken: "",
    setUserAuthData: (data: IUserAuthResponse) => {},
    loginUser: (userRequest: IUserAuthRequest) => {},
    logoutUser: () => {}
}

export const UserProvider = ({children}: UserProviderProps) => {
    const [authToken, setAuthToken] = useState(UserStorageService.getAuthToken);
    const [userId, setUserId] = useState(UserStorageService.getUserId);
    const [username, setUsername] = useState(UserStorageService.getUsername);
    const [loading, setLoading] = useState(true);
    const api = useAxios();

    const navigate = useNavigate();

    const setUserAuthData = (data: IUserAuthResponse) => {
        UserStorageService.setAuthToken(data);
        UserStorageService.setUserData(data);
        setAuthToken(data.token);
        setUserId(data.userId);
        setUsername(data.username);
    }

    const loginUser = (userRequest: IUserAuthRequest) => {
        api.post<IMnmApiResponse<IUserAuthResponse>>("/user/authenticate", userRequest)
            .then(
                (res) => {
                    if (res.data.status.success && res.data.data != null) {
                        setUserAuthData(res.data.data);

                        navigate('/');
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
    }

    let logoutUser = () => {
        setAuthToken("");
        setUserId(0);
        localStorage.removeItem('authToken');
        UserStorageService.clearUserData();
        navigate('/login');
    }


    // let updateToken = async ()=> {

    //     let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({'refresh':authTokens?.refresh})
    //     })

    //     let data = await response.json()

    //     if (response.status === 200){
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     }else{
    //         logoutUser()
    //     }

    //     if(loading){
    //         setLoading(false)
    //     }
    // }


    let contextData: UserContextInterface = {
        userId: userId,
        username: username,
        authToken: authToken,
        setUserAuthData: setUserAuthData,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }


    // useEffect(() => {
    //
    //     if (authTokens) {
    //         setUser(jwt_decode(authTokens.access));
    //     }
    //     setLoading(false);
    //
    //
    // }, [authTokens, loading]);

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
}

export const UserContext = createContext(defaultState);