import { Button, FormControl, InputLabel, Input, Checkbox, FormControlLabel, FormGroup, TextField, Box} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const { isOpen, toggle } = useModal();


  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  }

  if (!loginActive) {
    return (
      <>
        <nav>
          <Button onClick={navigateHome}>MnM Logo</Button>
        </nav>

        <div className='user-login-container'>
          <h1>Create an account</h1>

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="on"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              label="First Name"
              id="create-user-firstname"
            />

            <TextField
              required
              label="Last Name"
              id="create-user-lastname"
            />

            <TextField
              required
              label="Username"
              id="create-user-username"
            />

            <TextField
              required
              label="Email"
              id="email"
            />

            <TextField
              required
              label="Password"
              id="create-user-password"
              type="password"
              autoComplete="current-password"
            />

            <Button
              sx={{ m: 1, width: '30ch' }}
              type="submit"
              variant="outlined"
              size="large">
              Create
            </Button>
          </Box>

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

        <div className='user-login-container'>
          <h1>Login</h1>

          <div>
            <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>
                Email
              </InputLabel>
              <Input sx={{ width: 220, }} id='login-email' />
            </FormControl>
          </div>

          {/* <div>
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
          </div> */}

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
