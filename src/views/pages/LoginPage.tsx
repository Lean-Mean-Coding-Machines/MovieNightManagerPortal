import { useContext } from 'react';
import '../../assets/LoginPage.css';
import { UserRegister } from '../../component/UserProfile/UserRegister';
import { UserLogin } from '../../component/UserProfile/UserLogin';
import { UserContext } from '../../context/UserContext';

export function LoginPage() {
  // Shows/Hides Login & Create Profile Components
  const { loginPageActive, setLoginActive } = useContext(UserContext);

  const loginHandler = () => {
    setLoginActive(!loginPageActive);
  };

  return (
    <>
      {loginPageActive ? (
        <UserLogin handleLoginNav={loginHandler} />
      ) : (
        <UserRegister handleLoginNav={loginHandler} />
      )}
    </>
  );
}
