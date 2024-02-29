import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import IUserCreateRequest from '../../model/user/IUserCreateRequest';
import IUserAuthRequest from '../../model/user/IUserAuthRequest';
import { UserContext } from '../../context/UserContext';
import useAxios from '../../hooks/useAxios';
import IMnmApiResponse from '../../model/IMnmApiResponse';
import IUserCreateResponse from '../../model/user/IUserCreateResponse';
import { toast } from 'react-toastify';

interface formValidationReset {
  firstName: () => void;
  lastName: () => void;
  username: () => void;
  password: () => void;
  email: () => void;
}

interface userRegisterProps {
  handleLoginNav: () => void;
}

export function UserRegister(props: userRegisterProps) {
  const api = useAxios();

  const defaultValues: IUserCreateRequest = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
  };

  const { loginUser } = useContext(UserContext);

  const [formValues, setFormValues] = useState(defaultValues);
  const [submitErrorTxt, setSubmitErrorTxt] = useState('');

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

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isUsernameValid &&
      isEmailValid &&
      isPasswordNameValid
    ) {
      api
        .post<IMnmApiResponse<IUserCreateResponse>>('/user/create', formValues)
        .then((res) => {
          if (res.data.status.success) {
            const authRequest: IUserAuthRequest = {
              username: formValues.username,
              password: formValues.password,
            };
            loginUser(authRequest);
          }
        })
        .catch((error) => {
          setSubmitErrorTxt(error.response.data.status.message);
          console.error(error.response.data.status.message);
          toast.error(submitErrorTxt);
        });
    }
  };

  const formValidationResets: formValidationReset = {
    firstName: () => {
      setFirstNameErrorTxt('');
      setFirstNameValid(true);
    },
    lastName: () => {
      setLastNameErrorTxt('');
      setLastNameValid(true);
    },
    username: () => {
      setUsernameErrorTxt('');
      setUsernameValid(true);
    },
    password: () => {
      setPasswordErrorTxt('');
      setPasswordValid(true);
    },
    email: () => {
      setEmailErrorTxt('');
      setEmailValid(true);
    },
  };

  // Begin Validation
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [firstNameErrorTxt, setFirstNameErrorTxt] = useState('');
  const validateFirstNameField = () => {
    const firstName = formValues.firstName;

    const requirements = [
      { condition: firstName === '', message: 'First Name is required' },
      {
        condition: firstName.length > 50,
        message: 'First Name cannot be longer than 50 characters',
      },
    ];

    for (const requirement of requirements) {
      if (requirement.condition) {
        setFirstNameErrorTxt(requirement.message);
        setFirstNameValid(false);
        return false;
      }
    }
    formValidationResets.firstName();
    return true;
  };

  const [lastNameValid, setLastNameValid] = useState(true);
  const [lastNameErrorTxt, setLastNameErrorTxt] = useState('');
  const validateLastNameField = () => {
    const lastName = formValues.lastName;
    const requirements = [
      { condition: lastName === '', message: 'Last Name is required' },
      {
        condition: lastName.length > 50,
        message: 'Last Name cannot be longer than 50 characters',
      },
    ];

    for (const requirement of requirements) {
      if (requirement.condition) {
        setLastNameErrorTxt(requirement.message);
        setLastNameValid(false);
        return false;
      }
    }
    formValidationResets.lastName();
    return true;
  };

  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameErrorTxt, setUsernameErrorTxt] = useState('');
  const validateUsernameField = () => {
    const username = formValues.username;

    const requirements = [
      { condition: username === '', message: 'Username is required' },
      {
        condition: username.length > 50,
        message: 'Username cannot be longer than 50 characters',
      },
      {
        condition: username.includes(' '),
        message: 'Username cannot contain spaces',
      },
    ];
    for (const requirement of requirements) {
      if (requirement.condition) {
        setUsernameErrorTxt(requirement.message);
        setUsernameValid(false);
        return false;
      }
    }

    formValidationResets.username();
    return true;
  };

  // Expression pulled from: https://dirask.com/posts/TypeScript-validate-email-with-regex-Dn40Ej
  const expression: RegExp =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  const [emailValid, setEmailValid] = useState(true);
  const [emailErrorTxt, setEmailErrorTxt] = useState('');
  const validateEmailField = () => {
    const email = formValues.email;
    const requirements = [
      { condition: email === '', message: 'Email is required' },
      {
        condition: email.length > 100,
        message: 'Email cannot be longer than 100 characters',
      },
      {
        condition: !expression.test(email.toString()),
        message: 'Given email is not a valid email address',
      },
    ];
    for (const requirement of requirements) {
      if (requirement.condition) {
        setEmailErrorTxt(requirement.message);
        setEmailValid(false);
        return false;
      }
    }
    formValidationResets.email();
    return true;
  };

  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordErrorTxt, setPasswordErrorTxt] = useState('');
  const validatePasswordField = () => {
    const password = formValues.password;

    const requirements = [
      {
        condition: password === '',
        message: 'Password is required',
      },
      {
        condition: !/[A-Z]/.test(password),
        message: 'Password must contain at least one uppercase letter',
      },
      {
        condition: !/[a-z]/.test(password),
        message: 'Password must contain at least one lowercase letter',
      },
      {
        condition: !/\d/.test(password),
        message: 'Password must contain at least one digit',
      },
      {
        condition: !/[!@#$%^&*(),.?":{}|<>]/.test(password),
        message: 'Password must contain at least one special character',
      },
      {
        condition: password.length < 8,
        message: 'Password must be at least 8 characters',
      },
      {
        condition: password === formValues.username,
        message: 'Password cannot be the same as Username',
      },
    ];
    for (const requirement of requirements) {
      if (requirement.condition) {
        setPasswordErrorTxt(requirement.message);
        setPasswordValid(false);
        return false;
      }
    }
    formValidationResets.password();
    return true;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh',
      }}
    >
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          flexDirection: 'column',
          justifySelf: 'center',
          background: '#f6f6f6',
          rowGap: 2,
          width: { xs: '95%', lg: '25%' },
          ml: 'auto',
          mr: 'auto',
          padding: '1em',
          borderRadius: '10px',
        }}
        noValidate
        autoComplete='on'
        onSubmit={handleSubmit}
      >
        <Box component='span' sx={{ alignSelf: 'center' }}>
          <h1>Create an account</h1>
        </Box>

        <TextField
          required
          sx={{ width: '100%' }}
          label='First Name'
          name='firstName'
          id='create-user-firstname'
          error={!firstNameValid}
          value={formValues.firstName}
          inputProps={{ maxLength: 50 }}
          onChange={handleInputChange}
          onBlur={validateFirstNameField}
          onFocus={() => {
            setFirstNameValid(true);
            setFirstNameErrorTxt('');
          }}
          helperText={firstNameErrorTxt}
        />

        <TextField
          required
          sx={{ width: '100%' }}
          label='Last Name'
          name='lastName'
          id='create-user-lastname'
          error={!lastNameValid}
          value={formValues.lastName}
          inputProps={{ maxLength: 50 }}
          onChange={handleInputChange}
          onBlur={validateLastNameField}
          onFocus={() => {
            setLastNameValid(true);
            setLastNameErrorTxt('');
          }}
          helperText={lastNameErrorTxt}
        />

        <TextField
          required
          sx={{ width: '100%' }}
          label='Username'
          name='username'
          id='create-user-username'
          inputProps={{ maxLength: 50 }}
          error={!usernameValid}
          value={formValues.username}
          onChange={handleInputChange}
          onBlur={validateUsernameField}
          onFocus={() => {
            setUsernameValid(true);
            setUsernameErrorTxt('');
          }}
          helperText={usernameErrorTxt}
        />

        <TextField
          required
          sx={{ width: '100%' }}
          label='Email'
          name='email'
          id='create-user-email'
          error={!emailValid}
          value={formValues.email}
          onChange={handleInputChange}
          onBlur={validateEmailField}
          onFocus={() => {
            setEmailValid(true);
            setEmailErrorTxt('');
          }}
          helperText={emailErrorTxt}
        />

        <TextField
          required
          sx={{ width: '100%' }}
          label='Password'
          name='password'
          id='create-user-password'
          type='password'
          autoComplete='current-password'
          error={!passwordValid}
          value={formValues.password}
          onChange={handleInputChange}
          onBlur={validatePasswordField}
          onFocus={() => {
            setPasswordValid(true);
            setPasswordErrorTxt('');
          }}
          helperText={passwordErrorTxt}
        />

        <Box
          component='span'
          sx={{ m: 1, color: 'red' }}
          hidden={submitErrorTxt === ''}
        >
          {submitErrorTxt}
        </Box>

        <Button
          id='create-btn'
          name='createBtn'
          sx={{ width: '100%' }}
          type='submit'
          variant='contained'
          size='large'
          disabled={
            !firstNameValid ||
            !lastNameValid ||
            !usernameValid ||
            !emailValid ||
            !passwordValid
          }
        >
          Create
        </Button>

        <Box sx={{ paddingBottom: '15px' }}>
          Already have an account?
          <Box
            component='span'
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              alignSelf: 'center',
              ':hover': { color: '#c12b5d' },
            }}
            onClick={props.handleLoginNav}
          >
            {` Sign In`}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
