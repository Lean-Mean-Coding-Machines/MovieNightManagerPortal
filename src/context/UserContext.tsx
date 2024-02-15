import {useState, createContext, useEffect, ReactNode} from "react";
import {useNavigate} from 'react-router-dom';
import IUserAuthRequest from "../model/user/IUserAuthRequest";
import UserStorageService from "../service/UserStorageService";
import useAxios from "../hooks/useAxios";
import IMnmApiResponse from "../model/IMnmApiResponse";
import IUserAuthResponse from "../model/user/IUserAuthResponse";
import { toast } from "react-toastify";
import ICommunitySummary from "../model/ICommunitySummary";

interface UserContextInterface {
    userId: number,
    username: string,
    communities: ICommunitySummary[],
    selectedCommunity: ICommunitySummary,
    authToken: string,
    setCommunityData: (communities: ICommunitySummary[]) => void,
    setCommunities: (communities: ICommunitySummary[]) => void,
    setSelectedCommunity: (community: ICommunitySummary) => void,
    setUserAuthData: (data: IUserAuthResponse) => void,
    loginUser: (userRequest: IUserAuthRequest) => void,
    logoutUser: () => void
}

interface UserProviderProps {
    children: ReactNode
}

const defaultState: UserContextInterface = {
    userId: 0,
    username: '',
    communities: [],
    selectedCommunity: {id: 0, name: ''} as ICommunitySummary,
    authToken: '',
    setCommunityData: (communities: ICommunitySummary[]) => {},
    setCommunities: (communities: ICommunitySummary[]) => {},
    setSelectedCommunity: (community: ICommunitySummary) => {},
    setUserAuthData: (data: IUserAuthResponse) => {},
    loginUser: (userRequest: IUserAuthRequest) => {},
    logoutUser: () => {}
}

export const UserProvider = ({children}: UserProviderProps) => {
    
    const [authToken, setAuthToken] = useState(UserStorageService.getAuthToken);
    const [userId, setUserId] = useState(UserStorageService.getUserId);
    const [username, setUsername] = useState(UserStorageService.getUsername);
    const [communities, setCommunities] = useState(UserStorageService.getEnrolledCommunities);
    const [selectedCommunity, setSelectedCommunity] = useState(UserStorageService.getSelectedCommunity)
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

    const setCommunityData = (communities: ICommunitySummary[]) => {
        UserStorageService.setCommunityData(communities);
    }

    const loginUser = (userRequest: IUserAuthRequest) => {
        api.post<IMnmApiResponse<IUserAuthResponse>>("/user/authenticate", userRequest)
            .then(
                (res) => {
                    if (res.data.status.success && res.data.data != null) {
                        setUserAuthData(res.data.data);
                        navigate('/');
                    } else {
                        console.log('Could not authenticate user');
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
                    //TODO: Error Handling needs to be improved for failed authentication, handle this on the backend?
                    toast.error(`Invalid User Name/Password combination`);
                    console.log(err.message);
                    return null;
                }
            );
    }

    let logoutUser = () => {
        setAuthToken('');
        setUserId(0);
        setUsername('');
        localStorage.removeItem('authToken');
        UserStorageService.clearUserData();
        navigate('/');
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
        communities: communities,
        setCommunityData: setCommunityData,
        setCommunities: setCommunities,
        selectedCommunity: selectedCommunity,
        setSelectedCommunity: setSelectedCommunity,
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