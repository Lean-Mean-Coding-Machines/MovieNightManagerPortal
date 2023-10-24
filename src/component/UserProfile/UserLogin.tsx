import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup, IconButton,
    InputAdornment,
    TextField
} from "@mui/material";
import ResetModal from "../../modals/ResetModal";
import React, {useContext, useState} from "react";
import useModal from "../../hooks/useModal";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IUserAuthRequest from "../../model/user/IUserAuthRequest";
import {UserContext} from "../../context/UserContext";

interface userRegisterProps {
    handleHomeNav: () => void,
    handleLoginNav: () => void,
    handleProfileNav: () => void
}

export function UserLogin(props: userRegisterProps) {

    const {loginUser} = useContext(UserContext);

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
        
        loginUser(formValues);

    }

    return (
        <>
            <ResetModal isOpen={isOpen} toggle={toggle}></ResetModal>
            <form>

            <div className='user-login-container'>
                <h1>Login</h1>

                <div>
                    <TextField sx={{width: 220,}}
                    label="Username"
                    required 
                    name='username' 
                    id='login-username' 
                    onChange={handleInputChange}/>
                </div>

                <div>
                    <TextField sx={{width: 220, marginTop: 1.5}} 
                        name='password' 
                        id='login-password'
                        type={showPassword ? 'text' : 'password'}
                        required
                        label="Password"
                        InputProps={{endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}>
                                    { showPassword ? <VisibilityOff sx={{color: '#1F1F1F'}}/> : <Visibility sx={{color: '#1F1F1F'}}/>}
                                </IconButton>
                            </InputAdornment>
                        )
                        }}
                    onChange={handleInputChange}
                    />
                </div>

                <div style={{marginTop: 10}}>
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox defaultChecked 
                            sx={{
                                textAlign: 'center',
                                color: '#1F1F1F',
                                '&.Mui-checked': {color: '#1F1F1F',},
                            }}/>
                        } 
                        label="Remember Me"/>
                    </FormGroup>
                </div>

                <div style={{fontWeight: 'bold', cursor: 'pointer', marginTop: 10}} onClick={toggle}>
                    {` Forgot Password?`}
                </div>

                <div className='login-account-btn'>
                    <Button 
                        id='login-btn'
                        name='loginBtn'
                        type="submit" 
                        onClick={handleLogin} 
                        variant='contained' 
                        sx={{
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
                    <span style={{fontWeight: 'bold', cursor: 'pointer', marginTop: 5, marginLeft: 5}} onClick={props.handleLoginNav}>
                    Create
                    </span>
                </div>
            </div>
            </form>
        </>
    );
}