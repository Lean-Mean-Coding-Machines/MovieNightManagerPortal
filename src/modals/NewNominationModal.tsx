import {Box, Button, FormControl, IconButton, Input, InputLabel} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, {FormEvent, useContext, useEffect, useState} from "react";
import '../assets/NominationModal.css';
import DateSelector from "../component/input/DatePicker";
import dayjs from "dayjs";
import TimeSelector from "../component/input/TimePicker";
import WatchTypeDDLSelector from "../component/input/WatchTypeDropdown";
import {toast} from 'react-toastify'
import IMovieNightSegment from "../model/IMovieNightSegment";
import useAxios from "../hooks/useAxios";
import {UserContext} from "../context/UserContext";
import IMnmApiResponse from "../model/IMnmApiResponse";

interface NewNominationProps {
    isOpen: boolean,
    toggle: () => void,
    segment: IMovieNightSegment,
    segmentRefresh: () => void
}

interface nominationForm {
    segmentId: number,
    movieTitle?: string,
    watchDate?: string,
    watchTime?: string,
    watchType?: string,
    userId: number,
}

const defaultNominationForm: nominationForm = ({
    segmentId: 0,
    movieTitle: undefined,
    watchDate: undefined,
    watchTime: undefined,
    watchType: 'ANY',
    userId: 0,
});

export default function NewNominationModal(props: NewNominationProps) {

    const api = useAxios();
    const {userId} = useContext(UserContext);

    const [nominationForm, setNominationState] = useState(defaultNominationForm);

    useEffect(() => {
        setNominationState((p) => ({...p, segmentId: props.segment.id, userId: userId}));
    }, [props.segment.id, userId]);

    function resetNominationState() {
        setNominationState(defaultNominationForm);
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        api.post<IMnmApiResponse<any>>("/nomination/create", nominationForm)
            .then(
                (res) => {
                    if (res.data.status.success && res.data.data != null) {
                        props.toggle();
                        resetNominationState();
                        toast.success(`Created nomination for ${nominationForm.movieTitle} on ${nominationForm.watchDate} @ ${nominationForm.watchTime}`);
                        props.segmentRefresh();
                    } else {
                        toast.error('Could not create nomination');
                    }
                },
                (err) => {
                    console.log(err);
                }
            )
            .catch(
                (err) => {
                    console.log(err.message);
                }
            );
    }

    function updateNominationField(event: any) {
        event.preventDefault();
        const {name, value} = event.target;
        setNominationState({
            ...nominationForm,
            [name]: value,
        });
    }

    const startDay = dayjs(props.segment.nominationLockDate);
    const endDay = dayjs(props.segment.segmentEndDate);
    const updateWatchDate = (selectedWatchDate: dayjs.Dayjs) => {
        setNominationState({
            ...nominationForm,
            watchDate: selectedWatchDate.format("YYYY-MM-DDT00:00:00.000")
        });
    }

    const updateWatchType = (selectedWatchType: string) => {
        setNominationState({
            ...nominationForm,
            watchType: selectedWatchType
        });
    }

    const updateWatchTime = (selectedWatchTime: string) => {
        setNominationState({
            ...nominationForm,
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

                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                '& .MuiTextField-root': {m: 1, width: '40ch'},
                            }}
                            noValidate
                            autoComplete="on"
                            onSubmit={handleSubmit}
                        >
                            <div className="nomination-inputs-container">
                                {/* Film Name Input */}
                                <div>
                                    <FormControl variant='standard'>
                                        <InputLabel htmlFor='standard-adornment-film-name'>
                                            Film Name
                                        </InputLabel>
                                        <Input required name="movieTitle" sx={{width: 300,}} id='nomination-name-input'
                                               value={nominationForm.movieTitle} onChange={updateNominationField}/>
                                    </FormControl>
                                </div>

                                <div>
                                    {/* Watch Date Picker */}
                                    <DateSelector handleChangeDate={updateWatchDate} startDay={startDay}
                                                  endDay={endDay}/>
                                    {/* Watch Time Picker */}
                                    <TimeSelector handleChangeTime={updateWatchTime}/>
                                </div>

                                {/* Watch Type Picker */}
                                <div style={{marginTop: 15}}>
                                    <WatchTypeDDLSelector updateWatchType={updateWatchType}/>
                                </div>
                            </div>

                            {/* Submit Btn */}
                            <div className="new-nomination-btn">
                                <Button
                                    type="submit"
                                    variant='contained'
                                    sx={{
                                        width: 125,
                                        backgroundColor: '#1F1F1F',
                                        borderRadius: 22,
                                        ':hover': {backgroundColor: '#1F1F1F'},
                                    }}>
                                    Submit
                                </Button>
                            </div>
                        </Box>
                    </div>
                </div>
            )}
        </>
    );
}
