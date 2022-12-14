import { Button, FormControl, IconButton, Input, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function ResetModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="reset-pw-modal-overlay">
          <div className="reset-pw-modal-box">
            <div style={{float: 'right'}} onClick={props.toggle}>
              <IconButton>
               <CloseIcon/>
              </IconButton>
            </div>
          <div style={{fontWeight: 'bold', fontSize: 40}}>Forgot Your Password?</div>
          <div style={{width: 425}}>Provide your account email address to receive an email to reset your password.</div>
            {props.children}
          
          <div className="reset-pw-email">
          <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-email-address'>
                Email 
              </InputLabel>
              <Input sx={{ width: 300,}} id='email-reset-input'/>
          </FormControl>
          </div>
          
            <div className="reset-pw-btn">
            <Button variant='contained' sx={{width: 100,backgroundColor: 'black',borderRadius: 22,':hover': {backgroundColor: 'black',},}} onClick={props.toggle}>Send</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
