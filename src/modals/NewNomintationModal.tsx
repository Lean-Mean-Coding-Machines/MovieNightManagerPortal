import { Button, FormControl, IconButton, Input, InputLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FormEvent, useState } from "react";
import '../assets/NominationModal.css';
import DateSelector from "../component/input/DatePicker";
import dayjs from "dayjs";
import TimeSelector from "../component/input/TimePicker";
import WatchTypeDDLSelector from "../component/input/WatchTypeDropdown";
import { toast } from 'react-toastify'
import IMovieNightSegment from "../model/IMovieNightSegment";

interface NewNomintationProps {
  isOpen: boolean;
  toggle: () => void;
  segment: IMovieNightSegment;
}

interface nominationForm {
  segmentId: number,
  movieTitle?: string,
  watchDate?: string,
  watchTime?: string,
  watchType?: string,
  userId: '',
}

export default function NewNomintationModal(props: NewNomintationProps) {

  const intitialNominationState: nominationForm = ({
    segmentId: props.segment.id,
    movieTitle: undefined,
    watchDate: undefined,
    watchTime: undefined,
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
    // #Todo, need to add in error/ success handling for put api call when it's ready
    toast.success(`Created nomination for ${nominationFormState.movieTitle} on ${nominationFormState.watchDate} @ ${nominationFormState.watchTime}`);
  }

  function updateNominationField(event: any) {
    event.preventDefault();
    const { name, value } = event.target;
    setNominationState({
      ...nominationFormState,
      [name]: value,
    });
  }

  const startDay = dayjs(props.segment.nominationLockDate);
  const endDay = dayjs(props.segment.segmentEndDate);
  const updateWatchDate = (selectedWatchDate: dayjs.Dayjs) => {
    setNominationState({
      ...nominationFormState,
      watchDate: selectedWatchDate.toISOString()
    });
  }

  const updateWatchType = (selectedWatchType: string) => {
    setNominationState({
      ...nominationFormState,
      watchType: selectedWatchType
    });
  }

  const updateWatchTime = (selectedWatchTime: string) => {
    setNominationState({
      ...nominationFormState,
      watchTime: selectedWatchTime
    });
  }

  return (
    <>
      {props.isOpen && (
        <div className="nomination-modal-overlay">
          <div className="nomination-modal-box">
            <span style={{ fontWeight: 'bold', fontSize: 40, fontFamily: 'SoraBold' }}>Nominate a Film</span>
            <div style={{ float: 'right' }} onClick={props.toggle}>
              <IconButton>
                <CloseIcon />
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
                    <Input required name="movieTitle" sx={{ width: 300, }} id='nomination-name-input' value={nominationFormState.movieTitle} onChange={updateNominationField} />
                  </FormControl>
                </div>

                <div>
                  {/* Watch Date Picker */}
                  <DateSelector handleChangeDate={updateWatchDate} startDay={startDay} endDay={endDay} />
                  {/* Watch Time Picker */}
                  <TimeSelector handleChangeTime={updateWatchTime} />
                </div>

                {/* Watch Type Picker */}
                <div style={{ marginTop: 15 }}>
                  <WatchTypeDDLSelector updateWatchType={updateWatchType} />
                </div>
              </div>

              {/* Submit Btn */}
              <div className="new-nomination-btn">
                <Button type="submit" variant='contained' sx={{ width: 125, backgroundColor: '#1F1F1F', borderRadius: 22, ':hover': { backgroundColor: '#1F1F1F', }, }}>Submit</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
