import { Button, FormControl, InputLabel, Input, IconButton, InputAdornment, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useModal from '../../hooks/useModal';
import ResetModal from '../../modals/ResetModal';
import '../../assets/LoginPage.css';
import IUserCreateRequest from '../../model/user/IUserCreateRequest';


export function LoginPage() {
  const navigate = useNavigate();
  const navigateHome = () => { navigate('/') };
  const navigateToProfile = () => { navigate('/profile') };


  // Shows/Hides Login & Create Profile Divs
  const [loginActive, setLoginActive] = useState(true);
  const loginHandler = () => { setLoginActive(!loginActive) };

  //Shows/Hides Password Input for Login Page
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { isOpen, toggle } = useModal();

  const [userRequest, setUserRequest] = useState<IUserCreateRequest>({} as IUserCreateRequest);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  }

  if (!loginActive) {
    return (
      <>
        <nav>
          <Button onClick={navigateHome}>MnM Logo</Button>
        </nav>

        <div className='user-login'>
          <h1>Create an account</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <FormControl variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  First Name2
                </InputLabel>
                <Input sx={{ width: 250 }} type='firstname' id='create-firstname' />
              </FormControl>
            </div>

            <div>
              <FormControl variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Last Name
                </InputLabel>
                <Input sx={{ width: 250 }} type='lastname' id='create-lastname' />
              </FormControl>
            </div>

            <div>
              <FormControl variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Username
                </InputLabel>
                <Input sx={{ width: 250 }} type='username' id='create-username' />
              </FormControl>
            </div>

            <div>
              <FormControl variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Email
                </InputLabel>
                <Input sx={{ width: 250 }} type='email' id='create-email' />
              </FormControl>
            </div>

            <div>
              <FormControl variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Password
                </InputLabel>
                <Input sx={{ width: 250 }} type='password' id='create-password' />
              </FormControl>
            </div>

            <div className='create-account-btn'>
              <Button type="submit" variant='contained' sx={{ width: 275, backgroundColor: '#1F1F1F', borderRadius: 22, ':hover': { backgroundColor: '#1F1F1F', }, }}>
                Create Account
              </Button>
            </div>
          </form>

          <div className='account-text'>
            Already have an account?
            <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={loginHandler}>
              {` Log In`}
            </span>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <nav>
          <Button onClick={navigateHome}>MnM Logo</Button>
        </nav>
        <ResetModal isOpen={isOpen} toggle={toggle}></ResetModal>

        <div className='user-login'>
          <h1>Login</h1>

          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Email
              </InputLabel>
              <Input sx={{ width: 220, }} id='login-email' />
            </FormControl>
          </div>

          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment'>Password</InputLabel>
              <Input sx={{ width: 220, }} id='login-password' type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff sx={{ color: '#1F1F1F' }} /> : <Visibility sx={{ color: '#1F1F1F' }} />}
                    </IconButton>
                  </InputAdornment>
                }
              />

            </FormControl>
          </div>

          <div style={{ marginTop: 10 }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked sx={{ color: '#1F1F1F', '&.Mui-checked': { color: '#1F1F1F', }, }} />} label="Remember Me" />
            </FormGroup>
          </div>

          <div style={{ fontWeight: 'bold', cursor: 'pointer', marginTop: 10 }} onClick={toggle}>
            {` Forgot Password?`}
          </div>

          <div className='create-account-btn'>
            <Button onClick={navigateToProfile} variant='contained' sx={{ width: 225, backgroundColor: '#1F1F1F', borderRadius: 22, ':hover': { backgroundColor: '#1F1F1F', }, }}>
              Login
            </Button>
          </div>

          <div className='account-text'>
            Don't have an account?
            <span style={{ fontWeight: 'bold', cursor: 'pointer', marginTop: 5 }} onClick={loginHandler}>
              {` Create`}
            </span>
          </div>
        </div>
      </>
    );
  }
}
