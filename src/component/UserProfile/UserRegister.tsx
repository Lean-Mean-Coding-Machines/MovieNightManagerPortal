import {Box, Button, TextField} from "@mui/material";
import React, {useState} from "react";
import IUserCreateRequest from "../../model/user/IUserCreateRequest";
import UserService from "../../service/UserService";
import UserStorageService from "../../service/UserStorageService";
import IUserAuthRequest from "../../model/user/IUserAuthRequest";

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
                    if (res.data.status.success && res.data.data != null) {
                        const authRequest: IUserAuthRequest = {
                            username: formValues.username,
                            password: formValues.password
                        };
                        UserService.authUser(authRequest).then(
                            (authResp) => {
                                if (authResp) {
                                    UserStorageService.setUserData(authResp);
                                    props.handleHomeNav();
                                }
                            }
                        );
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
        <>
            <nav>
                <Button onClick={props.handleHomeNav}>MnM Logo</Button>
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
                    <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={props.handleLoginNav}>
              {` Log In`}
            </span>
                </div>
            </div>
        </>
    )
}