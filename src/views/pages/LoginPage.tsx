import { Button, FormControl, InputLabel, Input } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  // Shows/Hides Login & Create Profile Divs
  const [loginActive, setLoginActive] = useState(true);
  const loginHandler = () => {
    setLoginActive(!loginActive);
  };

  if (loginActive) {
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
              <Input
                sx={{
                  width: 250,
                }}
                id='create-firstname'
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Last Name
              </InputLabel>
              <Input
                sx={{
                  width: 250,
                }}
                id='create-lastname'
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Username
              </InputLabel>
              <Input
                sx={{
                  width: 250,
                }}
                id='create-username'
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Email
              </InputLabel>
              <Input
                sx={{
                  width: 250,
                }}
                id='create-email'
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Password
              </InputLabel>
              <Input
                sx={{
                  width: 250,
                }}
                id='create-password'
              />
            </FormControl>
          </div>

          <div className='create-account-btn'>
            <Button
              variant='contained'
              sx={{
                width: 275,
                backgroundColor: 'black',
                borderRadius: 22,
                ':hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              Create Account
            </Button>
          </div>
          <div className='account-text'>
            Already have an account?
            <span
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={loginHandler}
            >
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
          <FormControl variant='standard'>
            <div>
              <InputLabel htmlFor='standard-adornment-password'>
                Email
              </InputLabel>
              <Input
                sx={{
                  width: 220,
                }}
                id='login-email'
              />
            </div>
          </FormControl>
          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment'>Password</InputLabel>
              <Input
                sx={{
                  width: 220,
                }}
                id='login-password'
              />
            </FormControl>
          </div>
          <div
            style={{ fontWeight: 'bold', cursor: 'pointer', marginTop: 15 }}
            onClick={loginHandler}
          >
            {` Forgot Password?`}
          </div>
          <div className='create-account-btn'>
            <Button
              variant='contained'
              sx={{
                width: 225,
                backgroundColor: 'black',
                borderRadius: 22,
                ':hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              Login
            </Button>
          </div>

          <div className='account-text'>
            Don't have an account?
            <span
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={loginHandler}
            >
              {` Create`}
            </span>
          </div>
        </div>
      </>
    );
  }
}
