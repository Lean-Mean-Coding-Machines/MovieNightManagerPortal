import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, {  FC, Fragment } from "react";



const Password: FC<{}> = () => {
    //Shows/Hides Password Input for Login Page
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
     };

    return (
    <Fragment>
    <div style={{marginLeft: 50}}>
      <h3>Change your password</h3>

      <div style={{fontWeight: 'bold'}}> Current Password </div>
      <div> 
            <FormControl variant='standard'>
              <OutlinedInput sx={{ width: 400,}} placeholder="Enter current password"  id='current-password' type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff sx={{color: 'black'}} /> : <Visibility sx={{color: 'black'}} />}
                  </IconButton>
                </InputAdornment>
              } />
            </FormControl>
          </div>

          <div style={{fontWeight: 'bold', marginTop: 20}}> New Password </div>
          <div>
            <FormControl variant='standard'>
              <OutlinedInput sx={{ width: 400,}} id='new-password' placeholder="Enter new password" type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff sx={{color: 'black'}} /> : <Visibility sx={{color: 'black'}} />}
                  </IconButton>
                </InputAdornment>
              } />
            </FormControl>
          </div>
          <div>
          <Button  variant='contained' sx={{width: 185,backgroundColor: 'black', marginTop: 2, borderRadius: 22,':hover': {backgroundColor: 'black',},}}>
          Update Password
        </Button>
          </div>


        </div>

    </Fragment>
  );
};
export default Password;