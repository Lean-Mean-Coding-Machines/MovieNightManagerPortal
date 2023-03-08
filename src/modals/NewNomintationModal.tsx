import { Button, FormControl, IconButton, Input, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from "react";
import '../assets/NominationModal.css';
import DateSelector from "../component/DatePicker";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function NewNomintationModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="nomination-modal-overlay">
          <div className="nomination-modal-box">
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
          <div>
            <DateSelector />
          </div>
            <div className="new-nomitnation-btn">
            <Button variant='contained' sx={{width: 100,backgroundColor: '#1F1F1F',borderRadius: 22,':hover': {backgroundColor: '#1F1F1F',},}} onClick={props.toggle}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
