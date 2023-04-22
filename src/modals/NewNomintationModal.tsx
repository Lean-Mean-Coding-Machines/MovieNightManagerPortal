import { Button, FormControl, IconButton, Input, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FormEvent, useState } from "react";
import '../assets/NominationModal.css';
import DateSelector from "../component/DatePicker";
import dayjs from "dayjs";
import TimeSelector from "../component/TimePicker";
import WatchTypeDDLSelector from "../component/WatchTypeDropdown";

interface ModalType {
  isOpen: boolean;
  toggle: () => void;
}

export default function NewNomintationModal(props: ModalType) {
  
  const todaysDate = dayjs();

  const intitialNominationState = ({
     segmentId: '',
     movieTitle: '', 
     watchDate: todaysDate,
     watchTime: '',
     watchType: 'Any',
     userId: '',
   });

  const [nominationFormState, setNominationState] = useState(intitialNominationState);

  function resetNominationState() {
    setNominationState(intitialNominationState);
   }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Need to add in API call right here
    console.log(nominationFormState, 'nominationForm');
    props.toggle();
    resetNominationState();
  }

  function updateNominationField (event: any) {
    event.preventDefault();
    const { name, value } = event.target;
    setNominationState({
      ...nominationFormState,
      [name]: value,
    });
  }

  const updateWatchDate = (selectedWatchDate: dayjs.Dayjs) => { setNominationState( {
    ...nominationFormState, 
    watchDate: selectedWatchDate
  }); 
}

  const updateWatchType = (selectedWatchType: string) => { setNominationState( {
    ...nominationFormState, 
    watchType: selectedWatchType
  }); 
}

  const updateWatchTime = (selectedWatchTime: string) => { setNominationState( {
    ...nominationFormState, 
    watchTime: selectedWatchTime
  }); 
}

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
          
      <form method="post" onSubmit={handleSubmit}>
        <div className="nomination-inputs-container">
          {/* Film Name Input */}
        <div>
          <FormControl variant='standard'>
              <InputLabel htmlFor='standard-adornment-film-name'>
                Film Name
              </InputLabel>
              <Input name="movieTitle" sx={{ width: 300,}} id='nomination-name-input' value={nominationFormState.movieTitle} onChange={updateNominationField}/>
          </FormControl>
          </div>

          <div>
          {/* Watch Date Picker */}
            <DateSelector updateWatchDate={updateWatchDate} />
          {/* Watch Time Picker */}
            <TimeSelector updateWatchTime={updateWatchTime} />
          </div>
          
          {/* Watch Type Picker */}
          <div style={{marginTop: 15}}>
          <WatchTypeDDLSelector updateWatchType={updateWatchType} />

          </div>
        </div>
          {/* Submit Btn */}
            <div className="new-nomination-btn">
            <Button type="submit" variant='contained' sx={{width: 125,backgroundColor: '#1F1F1F',borderRadius: 22,':hover': {backgroundColor: '#1F1F1F',},}}>Submit</Button>
            </div>
      </form>
        </div>
      </div>
      )}
    </>
  );
}
