import { Button, FormControl, InputLabel, Input, Checkbox, FormControlLabel, FormGroup, TextField, Box } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import ResetModal from '../../modals/ResetModal';
import '../../assets/LoginPage.css';
import IUserCreateRequest from '../../model/user/IUserCreateRequest';
import UserService from '../../service/UserService';

interface formValidationReset {
  "firstName": () => void,
  "lastName": () => void,
  "username": () => void,
  "password": () => void,
  "email": () => void
}

export function LoginPage() {
  const navigate = useNavigate();
  const navigateHome = () => { navigate('/') };
  const navigateToProfile = () => { navigate('/profile') };

  // Shows/Hides Login & Create Profile Divs
  const [loginActive, setLoginActive] = useState(true);
  const loginHandler = () => { setLoginActive(!loginActive) };

  const { isOpen, toggle } = useModal();

  const defaultValues: IUserCreateRequest = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [submitErrorTxt, setSubmitErrorTxt] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    formValidationResets[name as keyof formValidationReset]();
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const isFirstNameValid = validateFirstNameField();
    const isLastNameValid = validateLastNameField();
    const isUsernameValid = validateUsernameField();
    const isEmailValid = validateEmailField();
    const isPasswordNameValid = validatePasswordField();


    if (isFirstNameValid && isLastNameValid && isUsernameValid && isEmailValid && isPasswordNameValid) {
      UserService.createNewUser(formValues).then(
        (res) => {
          // TODO :: Set logged in user for the session
          if (res.data.status.success && res.data.data != null) {
            navigate('/');
          } else {
            setSubmitErrorTxt(res.data.status.message);
          }
        },
        (err) => console.log(err))
        .catch((err) => console.log(err.message));
    }
  }

  const formValidationResets: formValidationReset = {
    firstName: () => {
      setFirstNameErrorTxt("");
      setFirstNameValid(true);
    },
    lastName: () => {
      setLastNameErrorTxt("");
      setLastNameValid(true);
    },
    username: () => {
      setUsernameErrorTxt("");
      setUsernameValid(true);
    },
    password: () => {
      setPasswordErrorTxt("");
      setPasswordValid(true);
    },
    email: () => {
      setEmailErrorTxt("");
      setEmailValid(true);
    },
  }

  //Begin Validation -- Is there a way to clean this up / make it better?
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [firstNameErrorTxt, setFirstNameErrorTxt] = useState("");
  const validateFirstNameField = () => {
    if (formValues.firstName === "") {
      setFirstNameErrorTxt("First Name is required");
      setFirstNameValid(false);
      return false;
    } else if (formValues.firstName.length > 50) {
      setFirstNameErrorTxt("First Name cannot be longer than 50 characters");
      setFirstNameValid(false);
      return false;
    } else {
      formValidationResets.firstName();
      return true;
    }
  }

  const [lastNameValid, setLastNameValid] = useState(true);
  const [lastNameErrorTxt, setLastNameErrorTxt] = useState("");
  const validateLastNameField = () => {
    if (formValues.lastName === "") {
      setLastNameErrorTxt("Last Name is required");
      setLastNameValid(false);
      return false;
    } else if (formValues.lastName.length > 50) {
      setLastNameErrorTxt("Last Name cannot be longer than 50 characters");
      setLastNameValid(false);
      return false;
    } else {
      formValidationResets.lastName();
      return true;
    }
  }

  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameErrorTxt, setUsernameErrorTxt] = useState("");
  const validateUsernameField = () => {
    if (formValues.username === "") {
      setUsernameErrorTxt("Username is required");
      setUsernameValid(false);
      return false;
    } else if (formValues.username.length > 50) {
      setUsernameErrorTxt("Username cannot be longer than 50 characters");
      setUsernameValid(false);
      return false;
    } else {
      formValidationResets.username();
      return true;
    }
  }

  // Expression pulled from: https://dirask.com/posts/TypeScript-validate-email-with-regex-Dn40Ej
  const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  const [emailValid, setEmailValid] = useState(true);
  const [emailErrorTxt, setEmailErrorTxt] = useState("");
  const validateEmailField = () => {
    if (formValues.email === "") {
      setEmailErrorTxt("Email is required");
      setEmailValid(false);
      return false;
    } else if (formValues.email.length > 100) {
      setEmailErrorTxt("Email cannot be longer than 100 characters");
      setEmailValid(false);
      return false;
    } else if (!expression.test(formValues.email.toString())) {
      setEmailErrorTxt("Given email is not a valid email address");
      setEmailValid(false);
      return false;
    } else {
      formValidationResets.email();
      return true;
    }
  }

  // TODO: [MNM-53]: Revisit this for proper password validation checks (letters, symbols, numbers + length, etc...) once we really nail down security
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordErrorTxt, setPasswordErrorTxt] = useState("");
  const validatePasswordField = () => {
    if (formValues.password === "") {
      setPasswordErrorTxt("Password is required");
      setPasswordValid(false);
      return false;
    } else {
      formValidationResets.password();
      return true;
    }
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
              name="firstName"
              id="create-user-firstname"
              error={!firstNameValid}
              value={formValues.firstName}
              onChange={handleInputChange}
              onBlur={validateFirstNameField}
              onFocus={() => { setFirstNameValid(true); setFirstNameErrorTxt(""); }}
              helperText={firstNameErrorTxt}
            />

            <TextField
              required
              label="Last Name"
              name="lastName"
              id="create-user-lastname"
              error={!lastNameValid}
              value={formValues.lastName}
              onChange={handleInputChange}
              onBlur={validateLastNameField}
              onFocus={() => { setLastNameValid(true); setLastNameErrorTxt(""); }}
              helperText={lastNameErrorTxt}
            />

            <TextField
              required
              label="Username"
              name="username"
              id="create-user-username"
              error={!usernameValid}
              value={formValues.username}
              onChange={handleInputChange}
              onBlur={validateUsernameField}
              onFocus={() => { setUsernameValid(true); setUsernameErrorTxt(""); }}
              helperText={usernameErrorTxt}
            />

            <TextField
              required
              label="Email"
              name="email"
              id="create-user-email"
              error={!emailValid}
              value={formValues.email}
              onChange={handleInputChange}
              onBlur={validateEmailField}
              onFocus={() => { setEmailValid(true); setEmailErrorTxt(""); }}
              helperText={emailErrorTxt}
            />

            <TextField
              required
              label="Password"
              name="password"
              id="create-user-password"
              type="password"
              autoComplete="current-password"
              error={!passwordValid}
              value={formValues.password}
              onChange={handleInputChange}
              onBlur={validatePasswordField}
              onFocus={() => { setPasswordValid(true); setPasswordErrorTxt(""); }}
              helperText={passwordErrorTxt}
            />

            <Box component="span" sx={{ m: 1, color: 'red' }} hidden={submitErrorTxt === ""}>
              {submitErrorTxt}
            </Box>

            <Button
              sx={{ m: 1, width: '30ch' }}
              type="submit"
              variant="outlined"
              size="large"
              disabled={!firstNameValid || !lastNameValid || !usernameValid || !emailValid || !passwordValid}>
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
