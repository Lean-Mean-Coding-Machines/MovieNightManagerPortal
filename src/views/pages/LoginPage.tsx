import {useState} from 'react';
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

    // Shows/Hides Login & Create Profile Components
    const [loginPageActive, setLoginActive] = useState(true);
    const loginHandler = () => {
        setLoginActive(!loginPageActive)
    };

    return (
        <>
            {
                loginPageActive ?
                    <UserLogin handleLoginNav={loginHandler} handleHomeNav={navigateHome} handleProfileNav={navigateToProfile} /> :
                    <UserRegister handleLoginNav={loginHandler} handleHomeNav={navigateHome}/>
            }
        </>
    );
}
