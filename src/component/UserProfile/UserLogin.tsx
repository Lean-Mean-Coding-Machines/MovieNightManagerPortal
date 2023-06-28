import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, IconButton,
    Input,
    InputAdornment,
    InputLabel
} from "@mui/material";
import ResetModal from "../../modals/ResetModal";
import React, {useState} from "react";
import useModal from "../../hooks/useModal";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IUserAuthRequest from "../../model/user/IUserAuthRequest";
import UserService from "../../service/UserService";
import UserStorageService from "../../service/UserStorageService";

interface userRegisterProps {
    handleHomeNav: () => void,
    handleLoginNav: () => void,
    handleProfileNav: () => void
}

export function UserLogin(props: userRegisterProps) {

    const {isOpen, toggle} = useModal();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const defaultValues: IUserAuthRequest = {
        username: "",
        password: "",
    };

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleLogin = (event: React.SyntheticEvent) => {
        event.preventDefault();

        UserService.authUser(formValues)
            .then(
                (res) => {
                    if (res) {
                        UserStorageService.setUserData(res);
                        props.handleHomeNav();
                    }
                }
            );
    }

    return (
        <>
            <nav>
                <Button onClick={props.handleHomeNav}>MnM Logo</Button>
            </nav>
            <ResetModal isOpen={isOpen} toggle={toggle}></ResetModal>

            <div className='user-login-container'>
                <h1>Login</h1>

                <div>
                    <FormControl variant='standard'>
                        <InputLabel htmlFor='standard-adornment-username'>
                            Username
                        </InputLabel>
                        <Input sx={{width: 220,}} name='username' id='login-username' onChange={handleInputChange}/>
                    </FormControl>
                </div>

                <div>
                    <FormControl variant='standard'>
                        <InputLabel htmlFor='standard-adornment'>Password</InputLabel>
                        <Input sx={{width: 220,}} name='password' id='login-password'
                               type={showPassword ? 'text' : 'password'}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}>
                                           {
                                               showPassword ?
                                                   <VisibilityOff sx={{color: '#1F1F1F'}}/> :
                                                   <Visibility sx={{color: '#1F1F1F'}}/>
                                           }
                                       </IconButton>
                                   </InputAdornment>
                               }
                               onChange={handleInputChange}
                        />
                    </FormControl>
                </div>

                <div style={{marginTop: 10}}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{
                            color: '#1F1F1F',
                            '&.Mui-checked': {color: '#1F1F1F',},
                        }}/>} label="Remember Me"/>
                    </FormGroup>
                </div>

                <div style={{fontWeight: 'bold', cursor: 'pointer', marginTop: 10}} onClick={toggle}>
                    {` Forgot Password?`}
                </div>

                <div className='login-account-btn'>
                    <Button onClick={handleLogin} variant='contained' sx={{
                        width: 225,
                        backgroundColor: '#1F1F1F',
                        borderRadius: 22,
                        ':hover': {backgroundColor: '#1F1F1F',},
                    }}>
                        Login
                    </Button>
                </div>

                <div className='account-text'>
                    Don't have an account?
                    <span style={{fontWeight: 'bold', cursor: 'pointer', marginTop: 5}} onClick={props.handleLoginNav}>
                        Create
                    </span>
                </div>
            </div>
        </>
    );
}