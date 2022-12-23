import { Button, FormControl, IconButton, Input, InputLabel, NativeSelect, TextField } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from "react";
import '../assets/NominationModal.css';
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function NewNomintationModal(props: ModalType) {
  
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };


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
          <div>
          <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-film-name'>
                Film Name
              </InputLabel>
              <Input sx={{ width: 300,}} id='nomination-name-input'/>
          </FormControl>
          </div>

          <div>
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
          
          <div style={{marginTop: 15}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker label="Preferred Watch Date" inputFormat="MM/DD/YYYY" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />}/>
          </LocalizationProvider>
          </div>
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
