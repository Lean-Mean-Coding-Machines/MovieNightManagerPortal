import { Button } from "@mui/material";
import React, { Fragment } from "react";

  export default function Profile({toggle}: any) {

    return (
    <>
    <Fragment>
        <div style={{ marginLeft: 50 }}>
          <h3>Customize Profile</h3>
          <div>
            <Button variant='contained'  onClick={toggle} sx={{ width: 155, backgroundColor: 'red', marginTop: 2, borderRadius: 22, ':hover': { backgroundColor: 'red', }, }}>
              Delete Profile
            </Button>
          </div>
        </div>
    </Fragment>
      </>
  );
};
