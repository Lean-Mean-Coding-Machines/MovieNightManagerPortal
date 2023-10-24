import {createContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../assets/LoginPage.css';
import {UserRegister} from "../../component/UserProfile/UserRegister";
import {UserLogin} from "../../component/UserProfile/UserLogin";

export function LoginPage() {

    const navigate = useNavigate();
    
    const navigateHome = () => {
        navigate('/')
    };

    const navigateToProfile = () => {
        navigate('/profile')
    };

    // Shows/Hides Login & Create Profile Divs
    const [loginActive, setLoginActive] = useState(true);
    const loginHandler = () => {
        setLoginActive(!loginActive)
    };

    return (
        <>
            {
                loginActive ?
                    <UserLogin handleLoginNav={loginHandler} handleHomeNav={navigateHome} handleProfileNav={navigateToProfile} /> :
                    <UserRegister handleLoginNav={loginHandler} handleHomeNav={navigateHome}/>
            }
        </>
    );
}

// export const LoginPage = createContext(loginActive);
