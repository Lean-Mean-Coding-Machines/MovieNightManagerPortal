import {Box, Button, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import IUserCreateRequest from "../../model/user/IUserCreateRequest";
import IUserAuthRequest from "../../model/user/IUserAuthRequest";
import {UserContext} from "../../context/UserContext";
import useAxios from "../../hooks/useAxios";
import IMnmApiResponse from "../../model/IMnmApiResponse";
import IUserCreateResponse from "../../model/user/IUserCreateResponse";

interface formValidationReset {
    "firstName": () => void,
    "lastName": () => void,
    "username": () => void,
    "password": () => void,
    "email": () => void
}

interface userRegisterProps {
    handleHomeNav: () => void,
    handleLoginNav: () => void
}

export function UserRegister(props: userRegisterProps) {

    const api = useAxios();

    const defaultValues: IUserCreateRequest = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
    };

    const {loginUser} = useContext(UserContext);

    const [formValues, setFormValues] = useState(defaultValues);
    const [submitErrorTxt, setSubmitErrorTxt] = useState("");

    const navHeight = document.getElementById('header') != null ? document.getElementById('header')!.offsetHeight : 64;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
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
            api.post<IMnmApiResponse<IUserCreateResponse>>("/user/create", formValues).then(
                (res) => {
                    if (res.data.status.success && res.data.data != null) {
                        const authRequest: IUserAuthRequest = {
                            username: formValues.username,
                            password: formValues.password
                        };
                        loginUser(authRequest)
                        props.handleHomeNav();
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

    return (
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifySelf: 'center',
                    rowGap: 2,
                    width: {xs: '95%', lg: '25%'},
                    ml: 'auto',
                    mr: 'auto'
                }}
                noValidate
                autoComplete="on"
                onSubmit={handleSubmit}
            >
                <Box component='span' sx={{alignSelf: 'center'}}>
                    <h1>Create an account</h1>
                </Box>

                <TextField
                    required
                    sx={{width: '100%'}}
                    label="First Name"
                    name="firstName"
                    id="create-user-firstname"
                    error={!firstNameValid}
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    onBlur={validateFirstNameField}
                    onFocus={() => {
                        setFirstNameValid(true);
                        setFirstNameErrorTxt("");
                    }}
                    helperText={firstNameErrorTxt}
                />

                <TextField
                    required
                    sx={{width: '100%'}}
                    label="Last Name"
                    name="lastName"
                    id="create-user-lastname"
                    error={!lastNameValid}
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    onBlur={validateLastNameField}
                    onFocus={() => {
                        setLastNameValid(true);
                        setLastNameErrorTxt("");
                    }}
                    helperText={lastNameErrorTxt}
                />

                <TextField
                    required
                    sx={{width: '100%'}}
                    label="Username"
                    name="username"
                    id="create-user-username"
                    error={!usernameValid}
                    value={formValues.username}
                    onChange={handleInputChange}
                    onBlur={validateUsernameField}
                    onFocus={() => {
                        setUsernameValid(true);
                        setUsernameErrorTxt("");
                    }}
                    helperText={usernameErrorTxt}
                />

                <TextField
                    required
                    sx={{width: '100%'}}
                    label="Email"
                    name="email"
                    id="create-user-email"
                    error={!emailValid}
                    value={formValues.email}
                    onChange={handleInputChange}
                    onBlur={validateEmailField}
                    onFocus={() => {
                        setEmailValid(true);
                        setEmailErrorTxt("");
                    }}
                    helperText={emailErrorTxt}
                />

                <TextField
                    required
                    sx={{width: '100%'}}
                    label="Password"
                    name="password"
                    id="create-user-password"
                    type="password"
                    autoComplete="current-password"
                    error={!passwordValid}
                    value={formValues.password}
                    onChange={handleInputChange}
                    onBlur={validatePasswordField}
                    onFocus={() => {
                        setPasswordValid(true);
                        setPasswordErrorTxt("");
                    }}
                    helperText={passwordErrorTxt}
                />

                <Box component="span" sx={{m: 1, color: 'red'}} hidden={submitErrorTxt === ""}>
                    {submitErrorTxt}
                </Box>

                <Button
                    id='create-btn'
                    name='createBtn'
                    sx={{
                        width: '100%',
                        borderColor: '#54276F',
                        color: '#54276F',
                        ':hover': {
                            color: '#D1439E',
                            borderColor: '#D1439E'
                        }
                    }}
                    type="submit"
                    variant="outlined"
                    size="large"
                    disabled={!firstNameValid || !lastNameValid || !usernameValid || !emailValid || !passwordValid}>
                    Create
                </Button>

                <Box>
                    Already have an account?
                    <Box component='span' className='purple-btn'
                         sx={{fontWeight: 'bold', cursor: 'pointer', alignSelf: 'center'}}
                         onClick={props.handleLoginNav}>
                        {` Log In`}
                    </Box>
                </Box>
            </Box>
    )
}