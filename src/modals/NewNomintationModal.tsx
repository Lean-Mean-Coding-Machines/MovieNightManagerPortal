import { Button, FormControl, IconButton, Input, InputLabel, NativeSelect, Stack, TextField } from "@mui/material";
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
          <span style={{fontWeight: 'bold', fontSize: 40, fontFamily: 'SoraBold'}}>Nominate a Film</span>
            <div style={{float: 'right'}} onClick={props.toggle}>
              <IconButton>
               <CloseIcon/>
              </IconButton>
            </div>
            {props.children}
          
          <div className="nomination-inputs-container">
          
          {/* Film Input */}
          <div>
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

          {/* Watch Date Picker */}
          <div style={{marginTop: 20}}>
          <Stack component="form" noValidate>
          <TextField id="datetime-picker" label="Preferred Date" type="datetime-local" defaultValue="2022-01-01T10:30" sx={{ width: 250 }} InputLabelProps={{ shrink: true,}}/>
          </Stack>
          </div>
          
          {/* Watch Type Picker */}
          <div style={{marginTop: 15}}>
          <FormControl >
            <InputLabel variant="standard" htmlFor="watch-type"> Watch Type </InputLabel>
            <NativeSelect defaultValue={'Pool'} inputProps={{name: 'watch-type', id: 'watch-type',}}>
              <option value={'Outside'}>Outside</option>
              <option value={'Inside'}>Inside</option>
              <option value={'Fire'}>Firepit</option>
              <option value={'Pool'}>Pool</option>
            </NativeSelect>
          </FormControl>
          </div>
          </div>


            <div className="new-nomination-btn">
            <Button variant='contained' sx={{width: 100,backgroundColor: '#1F1F1F',borderRadius: 22,':hover': {backgroundColor: '#1F1F1F',},}} onClick={props.toggle}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
