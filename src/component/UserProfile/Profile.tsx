import { Button } from "@mui/material";
import React, { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Profile: FC<{}> = () => {

    const navigate = useNavigate();

    const navigateToLogin = () => {navigate('/login')};

    return (
    <Fragment>
      <div style={{marginLeft: 50}}>
      <h3>Customize Profile</h3>
      <div>
          <Button onClick={navigateToLogin} variant='contained' sx={{width: 155,backgroundColor: 'red', marginTop: 2, borderRadius: 22,':hover': {backgroundColor: '#1F1F1F',},}}>
          Logout
        </Button>
          </div>
      </div>

    </Fragment>
  );
};
export default Profile;