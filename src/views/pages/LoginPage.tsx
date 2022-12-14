import { Button, TextField } from '@mui/material';
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
            <TextField
              sx={{
                width: 250,
              }}
              id='create-firstname'
              label='First Name'
              variant='standard'
            />
          </div>
          <div>
            <TextField
              sx={{
                width: 250,
              }}
              id='create-lastname'
              label='Last Name'
              variant='standard'
            />
          </div>
          <div>
            <TextField
              sx={{
                width: 250,
              }}
              id='create-username'
              label='Username'
              variant='standard'
            />
          </div>
          <div>
            <TextField
              sx={{
                width: 250,
              }}
              id='create-email'
              label='Email'
              variant='standard'
            />
          </div>
          <div>
            <TextField
              sx={{
                width: 250,
              }}
              id='create-password'
              label='Password'
              variant='standard'
            />
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
          <div>
            <TextField
              sx={{
                width: 220,
              }}
              id='login-email'
              label='Email'
              variant='standard'
            />
          </div>
          <div>
            <TextField
              sx={{
                width: 220,
              }}
              id='login-password'
              label='Password'
              variant='standard'
            />
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
