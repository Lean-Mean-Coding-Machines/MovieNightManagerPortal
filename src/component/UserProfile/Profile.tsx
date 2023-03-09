import { Button } from "@mui/material";
import React, { Fragment} from "react";
import { useState } from "react";

  export default function Profile({toggle}: any) {

    return (
    <>
    <Fragment>
        <div style={{ marginLeft: 50 }}>
          <h3>Customize Profile</h3>
          

          {/*  Need to send through the Modal name here when you click on it so the proper Modal is displayed, since the toggle state isn't unique it'll show both the modals at the same time  */}
          <Button variant='contained' onClick={ () => { toggle('editPic') }} sx={{ width: 155, backgroundColor: 'black', marginTop: 2, borderRadius: 22, ':hover': { backgroundColor: 'black', }, }}>
              Edit Pic
            </Button>

          <div>
            <Button variant='contained' onClick={ () => { toggle('deleteProfile')}} sx={{ width: 155, backgroundColor: 'red', marginTop: 2, borderRadius: 22, ':hover': { backgroundColor: 'red', }, }}>
              Delete Profile
            </Button>
          </div>
        </div>
    </Fragment>
      </>

  );
};
