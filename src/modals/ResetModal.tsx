import { Button, FormControl, IconButton, Input, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from "react";
import '../assets/ResetModal.css';


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
           <div>
          <div className="password-reset-desc">Forgot Your Password?</div>
          <div style={{width: 425}}>Provide your account email address to receive an email to reset your password.</div>
            {props.children}
          
          <div className="reset-pw-email">
          <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-email-address'>
                Email 
              </InputLabel>
              <Input sx={{ width: 425,}} id='email-reset-input'/>
          </FormControl>
          </div>
          
            <div className="reset-desc">
              <Button variant='contained' sx={{width: 100,backgroundColor: '#1F1F1F',borderRadius: 22,':hover': {backgroundColor: '#1F1F1F',},}} onClick={props.toggle}>Send</Button>
            </div>
            </div> 
          </div>
        </div>
      )}
    </>
  );
}
