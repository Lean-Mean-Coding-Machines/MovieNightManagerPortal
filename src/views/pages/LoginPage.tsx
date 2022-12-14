import { Button, FormControl, InputLabel, Input, IconButton, InputAdornment } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function LoginPage() {
  const navigate = useNavigate();
  const navigateHome = () => {navigate('/')};

  // Shows/Hides Login & Create Profile Divs
  const [loginActive, setLoginActive] = useState(true);
  const loginHandler = () => {setLoginActive(!loginActive)};

//Shows/Hides Password Input for Login Page
 const [showPassword, setShowPassword] = React.useState(false);
 const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault();
  };


  if (!loginActive) {
    return (
      <>
        <nav>
          <Button onClick={navigateHome}>MnM Logo</Button>
        </nav>

        <div className='user-login'>
          <h1>Create an account</h1>
          
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                First Name
              </InputLabel>
              <Input sx={{ width: 250,}} id='create-firstname'/>
            </FormControl>
          </div>
          
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Last Name
              </InputLabel>
              <Input sx={{ width: 250,}} id='create-lastname'/>
            </FormControl>
          </div>
          
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Username
              </InputLabel>
              <Input sx={{ width: 250,}} id='create-username'/>
            </FormControl>
          </div>
          
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Email
              </InputLabel>
              <Input sx={{ width: 250,}}id='create-email'/>
            </FormControl>
          </div>
          
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Password
              </InputLabel>
              <Input sx={{width: 250,}} id='create-password'/>
            </FormControl>
          </div>

          <div className='create-account-btn'>
            <Button variant='contained' sx={{ width: 275, backgroundColor: 'black', borderRadius: 22,':hover': {backgroundColor: 'black',},}}>
              Create Account
            </Button>
          </div>
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
        <div className='user-login'>
          <h1>Log in</h1>
          
          <div>
          <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Email
              </InputLabel>
              <Input sx={{ width: 220,}} id='login-email'/>
          </FormControl>
          </div>
          
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment'>Password</InputLabel>
              <Input sx={{ width: 220,}} id='login-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              />

            </FormControl>
          </div>

          <div style={{ fontWeight: 'bold', cursor: 'pointer', marginTop: 15 }}>
            {` Forgot Password?`}
          </div>

          <div className='create-account-btn'>
            <Button variant='contained' sx={{width: 225,backgroundColor: 'black',borderRadius: 22,':hover': {backgroundColor: 'black',},}}>
              Login
            </Button>
          </div>

          <div className='account-text'>
            Don't have an account?
            <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={loginHandler}>
              {` Create`}
            </span>
          </div>
        </div>
      </>
    );
  }
}
