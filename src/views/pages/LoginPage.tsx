import {useState} from 'react';
import '../../assets/LoginPage.css';
import {UserRegister} from "../../component/UserProfile/UserRegister";
import {UserLogin} from "../../component/UserProfile/UserLogin";

export function LoginPage() {

    // Shows/Hides Login & Create Profile Components
    const [loginPageActive, setLoginActive] = useState(true);
    const loginHandler = () => {
        setLoginActive(!loginPageActive)
    };

    return (
        <>
            {
                loginPageActive ?
                    <UserLogin handleLoginNav={loginHandler}  /> :
                    <UserRegister handleLoginNav={loginHandler}/>
            }
        </>
    );
}
