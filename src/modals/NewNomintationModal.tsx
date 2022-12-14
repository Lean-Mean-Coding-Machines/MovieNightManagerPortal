import { Button, FormControl, IconButton, Input, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
          <span style={{fontWeight: 'bold', fontSize: 40}}>Nominate a Film</span>
            <div style={{float: 'right'}} onClick={props.toggle}>
              <IconButton>
               <CloseIcon/>
              </IconButton>
            </div>
            {props.children}
          
          <div className="nomination-name">
          <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-film-name'>
                Film Name
              </InputLabel>
              <Input sx={{ width: 300,}} id='nomination-name-input'/>
          </FormControl>
          </div>
          
            <div className="new-nomitnation-btn">
            <Button variant='contained' onClick={props.toggle}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}